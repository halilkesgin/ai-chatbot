import Link from "next/link";

import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {

    const { userId } = auth()

    if (userId) redirect("/notes")

    return (
        <main className="flex flex-col h-screen items-center justify-center">
            <div className="flex flex-col justify-center items-center gap-4">
                <div className="font-extrabold tracking-tight text-4xl">ai-chatbot</div>
                <div className="max-w-prose">an intelligent chatbot will answer all your qeustions.</div>
                <Button className="px-12 mt-2" asChild>
                    <Link href="/notes">
                        Open
                    </Link>
                </Button>
            </div>
        </main>
    )
}
