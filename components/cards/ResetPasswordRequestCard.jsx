"use client"

import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MailCheck, MailQuestion, MailX } from "lucide-react"
import { useResetPasswordRequest } from "@/hooks/useResetPasswordRequest"

export function ResetPasswordRequestCard() {
    const { email, setEmail, loading, status, handleSubmit } = useResetPasswordRequest()

    return (
        <Card className="z-1 w-full gap-6 py-6 sm:max-w-md">
            <CardHeader className="gap-6 px-6">
                <div className="flex justify-between">
                    <Logo />
                    <div
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full ring-2
                            ${(status === "idle") ? "bg-muted text-muted-foreground ring-muted-foreground/30" : ""}
                            ${(status === "loading") ? "bg-[#f6b900]/10 text-[#f6b900] ring-[#f6b900]/30" : ""}
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
                        Сброс пароля
                    </CardTitle>
                    <CardDescription className="text-base">
                        Введите email, привязанный к вашему аккаунту, и мы отправим вам ссылку для восстановления доступа.
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="px-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading || status === "success"}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading || !email || status === "success"}
                    >
                        {loading ? "Отправка..." : status === "success" ? "Отправлено" : "Отправить ссылку"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}