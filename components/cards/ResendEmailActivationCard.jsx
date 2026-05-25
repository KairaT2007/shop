"use client"

import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MailCheck, MailQuestion, MailX } from "lucide-react"
import { useResendEmailActivation } from "@/hooks/useResendEmailActivation"

export function ResendEmailActivationCard() {
    const { email, loading, status, handleResend } = useResendEmailActivation()

    return (
        <Card className="z-1 w-full gap-6 py-6 sm:max-w-md">
            <CardHeader className="gap-6 px-6">
                <div className="flex justify-between">
                    <Logo />
                    <div
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full ring-2
                            ${(status === "idle" || status === "loading") ? "bg-[#f6b900]/10 text-[#f6b900] ring-[#f6b900]/30" : ""}
                            ${status === "success" ? "bg-[#00c66d]/10 text-[#00c66d] ring-[#00c66d]/30" : ""}
                            ${status === "error" ? "bg-red-500/10 text-red-500 ring-red-500/30" : ""}
                        `}
                    >
                        {(status === "idle" || status === "loading") && (
                            <MailQuestion size={18} className={status === "loading" ? "animate-pulse" : ""} />
                        )}
                        {status === "success" && <MailCheck size={18} />}
                        {status === "error" && <MailX size={18} />}
                    </div>
                </div>

                <div className="text-center">
                    <CardTitle className="mb-2 text-2xl font-semibold">
                        Verify your email
                    </CardTitle>
                    <CardDescription className="text-base">
                        An activation link has been sent to your email address:{" "}
                        <span className="text-foreground font-medium">{email || "..."}</span>.
                        Please check your inbox and click on the link to complete the activation process.
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="px-6">
                <div className="space-y-4">
                    <Button
                        className="w-full"
                        onClick={handleResend}
                        disabled={loading || !email}
                    >
                        {loading ? "Sending..." : "Resend mail"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}