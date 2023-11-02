import { db } from "@/lib/db"
import { createNoteSchema } from "@/lib/note"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req: Request
) {
    try {
        const body = await req.json()

        const parseResult = createNoteSchema.safeParse(body)

        if (!parseResult.success) {
            console.error(parseResult.error)
            return new NextResponse("Invalid input", { status: 400 })
        }

        const { title, content } = parseResult.data

        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const note = await db.note.create({
            data: {
                title,
                content,
                userId
            }
        })

        return NextResponse.json(note)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}