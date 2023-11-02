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
        <div>
            {JSON.stringify(allNotes)}
        </div>
    )
}

export default NotesPage