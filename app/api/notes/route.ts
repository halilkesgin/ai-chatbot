import { db } from "@/lib/db"
import { createNoteSchema, deleteNoteSchema, updateNoteSchema } from "@/lib/note"
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

export async function PUT(
    req: Request
) {
    try {
        const body = await req.json()

        const parseResult = updateNoteSchema.safeParse(body)

        if (!parseResult.success) {
            console.error(parseResult.error)
            return new NextResponse("Invalid input", { status: 400 })
        }

        const { id, title, content } = parseResult.data

        const note = await db.note.findUnique({
            where: {
                id
            }
        })

        if (!note) {
            return new NextResponse("Note not found", { status: 404 })
        }

        const { userId } = auth()

        if (!userId || userId !== note.userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const updatedNote = await db.note.update({
            where: {
                id
            },
            data: {
                title,
                content
            }
        })

        return NextResponse.json(updatedNote)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}

export async function DELETE(
    req: Request
) {
    try {
        const body = await req.json()

        const parseResult = deleteNoteSchema.safeParse(body)

        if (!parseResult.success) {
            console.error(parseResult.error)
            return new NextResponse("Invalid input", { status: 400 })
        }

        const { id } = parseResult.data

        const note = await db.note.findUnique({
            where: {
                id
            }
        })

        if (!note) {
            return new NextResponse("Note not found", { status: 404 })
        }

        const { userId } = auth()

        if (!userId || userId !== note.userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const deletedNote = await db.note.delete({
            where: {
                id
            }
        })

        return NextResponse.json(deletedNote)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}