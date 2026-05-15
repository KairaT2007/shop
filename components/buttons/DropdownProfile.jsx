"use client"

import Link from 'next/link'
import {
    UserIcon,
    SettingsIcon,
    CreditCardIcon,
    LogOutIcon,
    LogIn,
    Euro
} from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useGetMyProfile } from '@/hooks/useGetMyProfile'

const ProfileDropdown = () => {
    const { user, isLoading, handleLogout, locale } = useGetMyProfile();


    if (!isLoading && !user) {
        return (
            <Button size='lg' className="hidden md:inline-flex rounded-full" asChild>
                <Link href={`/${locale}/sign_in`}>
                    Log in
                    <LogIn className='size-5' />
                </Link>
            </Button>
        );
    }

    const userInitials = user?.username?.substring(0, 1).toUpperCase() || "??";

    return (
        <div className='hidden md:block'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon' className='size-9.5'>
                        <Avatar className='size-9.5 rounded-md'>
                            <AvatarImage src='' alt={user?.username} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                {isLoading ? "..." : userInitials}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-80' align="end">
                    <DropdownMenuLabel className='flex items-center gap-4 px-4 py-2.5 font-normal'>
                        <div className='relative'>
                            <Avatar className='size-10'>
                                <AvatarImage src='' alt={user?.username} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    {isLoading ? "..." : userInitials}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className='flex flex-1 flex-col items-start'>

                            <span className='text-foreground text-lg font-semibold'>
                                {user?.username}
                            </span>
                            <span className='text-muted-foreground text-sm truncate max-w-[180px]'>
                                {user?.email}
                            </span>

                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild className='px-4 py-2.5 text-base cursor-pointer'>
                            <Link href={`/${locale}/profile/${user?.uuid}`}>
                                <UserIcon className='size-5 mr-2' />
                                <span>My account</span>
                            </Link>
                        </DropdownMenuItem>
                        <div className='px-4 py-2.5 flex items-center text-xl'>
                            <Euro size={"20"}/>
                            <span className="font-semibold ">{user?.balance}</span>
                        </div>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        variant='destructive'
                        className='px-4 py-2.5 text-base text-red-600 cursor-pointer'
                        onClick={handleLogout}
                    >
                        Log out
                        <LogOutIcon className='size-5 mr-2' />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ProfileDropdown