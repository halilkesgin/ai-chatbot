"use client"

import { Note as NoteModel } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import AddEditNoteDialog from "./add-edit-note-dialog";

interface NoteProps {
    note: NoteModel
}

export default function Note({ note }: NoteProps) {

    const [showEditDialog, setShowEditDialog] = useState(false)

    const isUpdated = note.updatedAt > note.createdAt

    const createdUpdatedAtTimestamp = (
        isUpdated ? note.updatedAt : note.createdAt
    ).toDateString()

    return (
        <>
            <Card 
                className="cursor-pointer hover:shadow-md"
                onClick={() => setShowEditDialog(true)}
            >
                <CardHeader>
                    <CardTitle>
                        {note.title}
                    </CardTitle>
                    <CardDescription>
                        {createdUpdatedAtTimestamp}
                        {isUpdated && " (updated)"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        {note.content}
                    </p>
                </CardContent>
            </Card>
            <AddEditNoteDialog
                open={showEditDialog}
                setOpen={setShowEditDialog}
                noteToEdit={note}
            />
        </>
    )
}