"use client"

import { ActivationAccountCard } from "@/components/cards/ActivationAccountCard"

export default function page() {
    return (
        <div className="relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8">
            <ActivationAccountCard />
        </div>
    )
}