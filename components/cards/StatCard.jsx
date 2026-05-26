import { Card } from "@/components/ui/card"

export default function StatCard({ icon, label, value, subtext, iconBgClass }) {
    return (
        <Card className="group relative overflow-hidden border-border/50 p-5 transition-colors hover:border-foreground/20 bg-background/50 backdrop-blur-md">
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {label}
                    </span>
                    <span className="text-2xl font-bold tracking-tight text-foreground">
                        {value}
                    </span>
                    {subtext && (
                        <span className="text-xs text-muted-foreground">{subtext}</span>
                    )}
                </div>
                <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${iconBgClass}`}
                >
                    {icon}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
        </Card>
    )
}