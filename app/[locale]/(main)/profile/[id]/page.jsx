"use client"

import ProfileTestimonials from '@/components/blocks/ProfileTestimonials'
import UserProfile from '@/components/blocks/UserProfile'

import { useGetMyProfile } from '@/hooks/useGetMyProfile'

const Page = () => {
    const { user, isLoading } = useGetMyProfile();

    if (isLoading) {
        return (
            <div className='min-h-screen pt-30 flex items-center justify-center'>
                Загрузка...
            </div>
        );
    }

    if (!user) {
        return (
            <div className='min-h-screen pt-30 flex items-center justify-center'>
                Загрузка...
            </div>
        );
    }

    return (
        <div className='gap-4 w-full pt-30 mx-auto min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8'>
            <UserProfile />
            <ProfileTestimonials />
        </div>
    )
}

export default Page;