import Note from "@/components/note"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"

const NotesPage = async () => {

    const { userId } = auth()

    if (!userId) throw Error("userId undefined")

    const allNotes = await db.note.findMany({
        where: {
            userId
        }
    })

    return (
        <div className="grid sm:grid-cols-3 gap-3">
            {allNotes.map((note) => (
                <Note key={note.id} note={note} />
            ))}
            {allNotes.length === 0 && (
                <div className="col-span-full text-center">
                    You do not have any notes yet. Let's create one.
                </div>
            )}
        </div>
    )
}

export default NotesPage