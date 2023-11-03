import { db } from "@/lib/db"
import openai, { getEmbedding } from "@/lib/openai"
import { notesIndex } from "@/lib/pinecone"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { ChatCompletionMessage } from "openai/resources/index.mjs"
import { OpenAIStream, StreamingTextResponse } from "ai"

export async function POST(
    req: Request
) {
    try {
        const body = await req.json()
        const messages: ChatCompletionMessage[] = body.messages

        const messagesTruncated = messages.slice(-6)

        const embedding = await getEmbedding(
            messagesTruncated.map((message) => message.content).join("\n")
        )

        const { userId } = auth()

        const vectorQueryResponse = await notesIndex.query({
            vector: embedding,
            topK: 1,
            filter: { userId }
        })

        const relevantNotes = await db.note.findMany({
            where: {
                id: {
                    in: vectorQueryResponse.matches.map((match) => match.id)
                }
            }
        })

        console.log("Relevant notes found: ", relevantNotes)

        const systemMessage: ChatCompletionMessage = {
            role: "system",
            content: 
                "You are an intelligent note taking app. You answer the user's question based on their existing notes." + 
                "The relevant notes for this query are:\n" +
                relevantNotes.map((note) => `Title: ${note.title}\n\nContent:\n${note.content}`).join("\n\n")
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            stream: true,
            messages: [systemMessage, ...messagesTruncated]
        })

        const stream = OpenAIStream(response)

        return new StreamingTextResponse(stream)

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}