'use client';

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { NavMenu } from "@/components/NavMenu";
import { NavigationSheet } from "@/components/buttons/NavSheet";
import ProfileDropdown from "../buttons/DropdownProfile";
import { ToggleTheme } from "../buttons/ToggleTheme";
import LanguageDropdown from "../buttons/DropdownLanguage";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LanguagesIcon } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    }, [])

    return (
        <nav className="fixed z-50 inset-x-4 top-6 mx-auto h-16 bg-background/50 backdrop-blur-md max-w-(--breakpoint-xl) rounded-full border">
            <div className="mx-auto flex h-full items-center justify-between px-4">
                <Logo />

                {/* Desktop Menu */}
                <NavMenu className="hidden md:block" />

                <div className="flex items-center gap-2">

                    <ToggleTheme />
                    <LanguageDropdown
                        trigger={
                            <Button variant='outline' size='icon' className='size-9.5 border-1'>
                                <LanguagesIcon />
                            </Button>
                        }
                    />
                    {/* <Button size='lg' className="rounded-full">Get Started</Button> */}
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

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <NavigationSheet />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
