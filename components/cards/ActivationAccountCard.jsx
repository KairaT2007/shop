import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MailCheck, MailQuestion, MailX } from "lucide-react"
import { Link } from "@/i18n/routing"
import { useActivationAccount } from "@/hooks/useActivationAccount"

export function ActivationAccountCard() {

    const { status } = useActivationAccount()

    return (
        <Card className="z-1 w-full gap-6 py-6 sm:max-w-md">
            <CardHeader className="gap-6 px-6">
                <div className="flex justify-between">
                    <Logo />

                    <div
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full ring-2 
                            ${status === "loading" ? "text-[#f6b900] ring-[#f6b900]/30" : ""}
                            ${status === "success" ? "text-[#00c66d] ring-[#00c66d]/30" : ""}
                            ${status === "error" ? "bg-red-500/10 text-red-500 ring-red-500/30" : ""}
                        `}
                    >
                        {status === "loading" && <MailQuestion size={18} className="animate-pulse" />}
                        {status === "success" && <MailCheck size={18} />}
                        {status === "error" && <MailX size={18} />}
                    </div>
                </div>

                <div className="text-center">
                    <CardTitle className="mb-2 text-2xl font-semibold">
                        {status === "loading" && "Activating account..."}
                        {status === "success" && "Account activated successfully!"}
                        {status === "error" && "Activation failed"}
                    </CardTitle>
                </div>
            </CardHeader>

            <CardContent className="px-6">
                <div className="space-y-4">
                    <Link href={'/sign_in'}>
                        <Button className="w-full">
                            Log in
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}