import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

const Navbar = () => {
    return (
        <div className="p-4 border-b">
            <div className="flex flex-wrap gap-3 items-center justify-between">
                <Link href="/notes" className="flex items-center gap-1">
                    <span className="font-bold">
                        ai-chatbot
                    </span>
                </Link>
                <div className="flex gap-x-2">
                    <Button variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Note
                    </Button>
                    <UserButton 
                        afterSignOutUrl="/"
                        appearance={{
                            elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Navbar