'use client';

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import { Logo } from "@/components/Logo";
import { NavMenu } from "@/components/blocks/NavMenu";
import { NavigationSheet } from "@/components/buttons/NavSheet";
import ProfileDropdown from "../buttons/DropdownProfile";
import { ToggleTheme } from "../buttons/ToggleTheme";
import LanguageDropdown from "../buttons/DropdownLanguage";

const Navbar = () => {
    const pathname = usePathname();
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
        <nav key={pathname} className="fixed z-50 inset-x-4 top-6 mx-auto h-16 bg-background/50 backdrop-blur-md max-w-(--breakpoint-xl) rounded-full border">
            <div className="mx-auto flex h-full items-center justify-between px-4">
                <Logo />
                <NavMenu className="hidden md:block" />
                <div className="flex items-center gap-2">
                    <ToggleTheme />
                    <LanguageDropdown />
                    <ProfileDropdown />
                    <NavigationSheet />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
