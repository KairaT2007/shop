'use client';

import { useEffect, useState } from 'react'
import { LanguagesIcon, MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MenuDropdown from '@/components/MenuDropdown'
import MenuNavigation from '@/components/MenuNavigation'
import { cn } from '@/lib/utils'
import LanguageDropdown from '@/components/DropdownLanguage';
import ProfileDropdown from '@/components/DropdownProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { ToggleTheme } from '@/components/ToggleTheme';

const Header = ({
  navigationData,
  className
}) => {
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
    <header
      className={cn('fixed top-0 z-50 h-17.5 w-full border-b transition-all duration-300', {
        'bg-background shadow-md': isScrolled
      }, className)}>
      <div
        className='mx-auto py-4 flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <span className='text-primary text-[28px] font-semibold'>Logo</span>
        {/* Navigation */}
        <MenuNavigation
          navigationData={navigationData}
          className='max-lg:hidden [&_[data-slot=navigation-menu-list]]:gap-1' />

        {/* Actions */}
        <div className='flex gap-4'>
          <div className='flex items-center gap-1.5'>
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
            <ToggleTheme />
            <LanguageDropdown
              trigger={
                <Button variant='ghost' size='icon' className='size-9.5 border-1 border-gray-300'>
                  <LanguagesIcon />
                </Button>
              }
            />
            <Link href={'/sign_in'}>
              <Button size="lg" className={'border-2 border-black'}>Sign In</Button>
            </Link>
          </div>
          {/* Navigation for small screens */}
          <div className='flex gap-3'>

            <MenuDropdown
              align='end'
              navigationData={navigationData}
              trigger={
                <Button variant='outline' size='icon' className='rounded-full lg:hidden'>
                  <MenuIcon />
                  <span className='sr-only'>Menu</span>
                </Button>
              } />
          </div>
        </div>
      </div>
    </header >
  );
}

export default Header
