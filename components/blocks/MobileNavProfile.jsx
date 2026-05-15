import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Euro, LogIn, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { useGetMyProfile } from '@/hooks/useGetMyProfile';
import { Card } from '@/components/ui/card';

export const MobileNavProfile = () => {

    const { user, isLoading, handleLogout, locale } = useGetMyProfile();

    if (!isLoading && !user) {
        return (
            <Link href={`/${locale}/sign_in`} className="w-full">
                <Button size="lg" className="group w-full justify-center">
                    <LogIn className="size-4" />
                    Log In
                </Button>
            </Link>
        );
    }

    const userInitials = user?.username?.substring(0, 1).toUpperCase() || "??";

    return (
        <Card className={"px-3"}>
            <div className="flex items-center gap-2">
                <Avatar className='size-10'>
                    <AvatarImage src='' alt={user?.username} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                        {isLoading ? "..." : userInitials}
                    </AvatarFallback>
                </Avatar>
                <div className='flex flex-1 flex-col items-start'>
                    <span className='text-foreground text-lg font-semibold'>
                        {user?.username}
                    </span>
                    <span className='text-muted-foreground text-sm truncate max-w-[180px]'>
                        {user?.email}
                    </span>
                </div>
            </div>
            <div className="flex items-center">
                <Euro />
                <span className="font-semibold text-2xl ">{user?.balance}</span>
            </div>
            <div className="flex flex-col gap-3">
                <Link href={`/${locale}/profile/${user?.uuid}`} className="w-full">
                    <Button size="lg" variant="outline" className="group w-full justify-center">
                        <UserIcon className="size-4" />
                        My account
                    </Button>
                </Link>
                <Button
                    size="lg" variant="destructive" className="group w-full justify-center"
                    onClick={handleLogout}
                >
                    <LogOutIcon className="size-4" />
                    Log out
                </Button>
            </div>
        </Card>
    );
};