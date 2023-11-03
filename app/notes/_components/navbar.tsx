"use client"

import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import AddEditNoteDialog from "@/components/add-edit-note-dialog"
import { ModeToggle } from "@/components/mode-toggle"
import AIChatButton from "@/components/ai-chat-button"

const Navbar = () => {

    const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false)
 
    return (
        <>
            <div className="p-4 border-b">
                <div className="flex flex-wrap gap-3 items-center justify-between">
                    <Link href="/notes" className="flex items-center gap-1">
                        <span className="font-bold">
                            ai-chatbot
                        </span>
                    </Link>
                    <div className="flex gap-x-2">
                        <Button variant="outline" onClick={() => setShowAddEditNoteDialog(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Note
                        </Button>
                        <AIChatButton />
                        <ModeToggle />
                        <UserButton 
                            afterSignOutUrl="/"
                            appearance={{
                                elements: { avatarBox: { width: "2.5rem", height: "2.5rem", borderRadius: "10px" } }
                            }}
                        />
                    </div>
                </div>
            </div>
            <AddEditNoteDialog open={showAddEditNoteDialog} setOpen={setShowAddEditNoteDialog} />
        </>
    )
}

export default Navbar