"use client"

import { useEffect, useState } from "react"
import { LanguagesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import LanguageDropdown from '@/components/DropdownLanguage'
import ProfileDropdown from '@/components/DropdownProfile'

const Header = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    return (
        <div className='flex min-h-dvh w-full'>
            <header className='bg-card sticky top-0 z-50 border-b'>
                <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6'>
                    <div className='flex items-center gap-1.5'>
                        <LanguageDropdown
                            trigger={
                                <Button variant='ghost' size='icon'>
                                    <LanguagesIcon />
                                </Button>
                            }
                        />
                        <ProfileDropdown
                            trigger={
                                <Button variant='ghost' size='icon' className='size-9.5'>
                                    <Avatar className='size-9.5 rounded-md'>
                                        <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            }
                        />
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
