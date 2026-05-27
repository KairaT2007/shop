import { cn } from "@/lib/utils";

export function Marquee({
    className,
    reverse = false,
    pauseOnHover = false,
    children,
    vertical = false,
    repeat = 4,
    ...props
}) {
    return (
        <div
            {...props}
            className={cn(
                "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] gap-(--gap)",
                {
                    "flex-row": !vertical,
                    "flex-col": vertical,
                },
                className
            )}
        >
            {Array(repeat)
                .fill(0)
                .map((_, i) => (
                    <div
                        className={cn("flex shrink-0 justify-around gap-(--gap)", {
                            "animate-marquee flex-row": !vertical,
                            "animate-marquee-vertical flex-col": vertical,
                            "group-hover:paused": pauseOnHover,
                            "direction-[reverse]": reverse,
                        })}
                        key={i}
                    >
                        {children}
                    </div>
                ))}
        </div>
    );
}