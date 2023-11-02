import { ReactNode } from "react"
import Navbar from "./_components/navbar"

const NotesLayout = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <div>
            <Navbar />
            <main className="m-auto max-w-7xl p-4">
                {children}
            </main>
        </div>
    )
}

export default NotesLayout