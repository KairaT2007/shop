'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { LanguagesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const languages = {
    en: 'English',
    pl: 'Polish',
    ua: 'Ukrainian'
}

const LanguageDropdown = ({ defaultOpen, align }) => {
    const locale = useLocale()

    const router = useRouter()
    const pathname = usePathname()

    const handleLanguageChange = (newLocale) => {
        const segments = pathname.split('/')

        if (segments.length > 1) {
            segments[1] = newLocale
        }

        router.replace(segments.join('/'))
    }

    return (
        <DropdownMenu defaultOpen={defaultOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' className='size-9.5 border-1'>
                    <LanguagesIcon />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className='w-50'
                align={align || 'end'}
            >
                <DropdownMenuRadioGroup
                    value={locale}
                    onValueChange={handleLanguageChange}
                >
                    {Object.entries(languages).map(([key, label]) => (
                        <DropdownMenuRadioItem
                            key={key}
                            value={key}
                            className='data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground pl-2 text-base [&>span]:hidden'
                        >
                            {label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LanguageDropdown