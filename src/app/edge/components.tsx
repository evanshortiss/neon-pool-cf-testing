"use client"

import { useMyPresence } from "@/liveblocks.config"

export const Component = () => {
    const [presence] = useMyPresence()
    return (
        <div>
            <h1>Liveblocks</h1>
            <pre>

            {JSON.stringify(presence,null,2)}
            </pre>
        </div>
    )
}