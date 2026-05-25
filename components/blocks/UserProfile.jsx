'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Handshake, Star, TrendingUp, CalendarDays } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useGetMyProfile } from "@/hooks/useGetMyProfile"
import StatCard from "../cards/StatCard"

const userData = {
    avatarUrl: "/signin.jpg",
    username: "alexmorgan",
    displayName: "Alex Morgan",
    description:
        "Full-stack developer specializing in scalable web applications and marketplace platforms. Passionate about clean code and seamless user experiences.",
    registrationDate: "March 2023",
    verified: false,
    successDeals: 247,
    rating: 4.8,
    totalReviews: 189,
    balance: 12450.75,
    dealsTrend: "+18 this month",
}

export default function UserProfile() {

    const { user, isLoading } = useGetMyProfile();
    const userInitials = user?.username?.substring(0, 1).toUpperCase() || "??";

    return (
        <>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card className="border-border/50 lg:col-span-2">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                            <Avatar className="size-28 border-4 border-foreground/10 ring-2 ring-foreground/5">
                                <AvatarImage src={user?.avatar || undefined} alt={`${user?.username} avatar`} />
                                <AvatarFallback className="bg-primary text-2xl font-bold text-primary-foreground">
                                    {isLoading ? "..." : userInitials}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex flex-1 flex-col items-center gap-3 text-center md:items-start md:text-left">
                                <div className="flex flex-col items-center gap-2 md:flex-row">
                                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                        {isLoading ? "Username" : user?.username}
                                    </h1>
                                    <Badge
                                        variant="secondary"
                                        className="border-border bg-secondary text-secondary-foreground"
                                    >
                                        {isLoading ? "example@email.com" : user?.email}
                                    </Badge>
                                </div>

                                <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                                    {isLoading ? "Description" : user?.description}
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas at explicabo fuga reiciendis molestias ducimus distinctio culpa, temporibus sunt praesentium reprehenderit cumque magni soluta sit labore. Sit, ad aliquid. Id.
                                </p>

                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <CalendarDays className="size-4 text-muted-foreground" aria-hidden="true" />
                                    <span>
                                        Joined {user?.dateOfregistration
                                            ? new Date(user.dateOfregistration).toLocaleDateString('ru-RU')
                                            : '-'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-0.5" aria-label={`Rating: ${userData.rating} out of 5 stars`}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`size-5 ${star <= Math.floor(userData.rating)
                                                ? "fill-[#f6b900] text-[#f6b900]"
                                                : star <= userData.rating
                                                    ? "fill-[#f6b900]/50 text-[#f6b900]"
                                                    : "fill-muted text-muted-foreground/30"
                                                }`}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <span className="text-lg font-bold text-foreground">{userData.rating.toFixed(1)}</span>
                                <span className="text-sm text-muted-foreground">
                                    ({userData.totalReviews.toLocaleString()} reviews)
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <section className="mt-6" aria-label="Profile statistics">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <StatCard
                        icon={<Handshake className="size-5 text-[#0f92f7]" aria-hidden="true" />}
                        iconBgClass="bg-[#0f92f7]/10"
                        label="Successful Deals"
                        value={userData.successDeals}
                        subtext={userData.dealsTrend}
                    />
                    <StatCard
                        icon={<Star className="size-5 text-[#f6b900]" aria-hidden="true" />}
                        iconBgClass="bg-[#f6b900]/10"
                        label="Rating"
                        value={userData.rating.toFixed(1)}
                        subtext={`${userData.totalReviews} reviews`}
                    />
                    <StatCard
                        icon={<TrendingUp className="size-5 text-[#00c66d]" aria-hidden="true" />}
                        iconBgClass="bg-[#00c66d]/10"
                        label="Success Rate"
                        value={`${Math.round((userData.successDeals / (userData.successDeals + 12)) * 100)}%`}
                        subtext="Completion rate"
                    />
                </div>
            </section>
        </>
    )
}
