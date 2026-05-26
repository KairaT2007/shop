import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { useGetMyProfile } from "@/hooks/useGetMyProfile";

export function BalanceCard({ currency = "EUR" }) {

    const { user, isLoading } = useGetMyProfile();

    const formatBalance = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 2,
        }).format(amount)
    }

    return (
        <Card className="h-full border-border/50 bg-background/50 backdrop-blur-md">
            <CardContent className="flex h-full flex-col gap-4 p-8">
                <div className="flex flex-col gap-1 text-center">
                    <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                        Available Balance
                    </span>
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                        {formatBalance(isLoading ? "0.00" : user?.balance)}
                    </span>
                </div>
                <div className="flex flex-col gap-3">
                    <Button variant="default" size="lg" className="w-full gap-2">
                        <ArrowUpRight className="size-5" aria-hidden="true" />
                        Withdraw
                    </Button>
                    <Button variant="outline" size="lg" className="w-full gap-2">
                        <ArrowDownLeft className="size-5" aria-hidden="true" />
                        Top Up
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}