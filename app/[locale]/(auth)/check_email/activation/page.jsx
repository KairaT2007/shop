"use client"

import { ResendEmailActivationCard } from "@/components/cards/ResendEmailActivationCard" // Проверьте путь

export default function page() {
    return (
        <div className="relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8">
            <ResendEmailActivationCard />
        </div>
    )
}