"use client"

import ProfileTestimonials from '@/components/blocks/ProfileTestimonials'
import UserProfile from '@/components/blocks/UserProfile'

const page = () => {
    return (
        <div className='gap-4 w-full pt-30 mx-auto min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8'>
            <UserProfile />
            <ProfileTestimonials />
        </div>
    )
}

export default page;