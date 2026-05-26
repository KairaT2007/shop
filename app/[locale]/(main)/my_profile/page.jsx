"use client"

import AccountSettingsForm from '@/components/forms/AccountSettingsForm'
import ProfileTestimonials from '@/components/blocks/ProfileTestimonials'
import MyUserProfile from '@/components/blocks/MyUserProfile'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const tabs = [
    { name: 'Profile', value: 'profile' },
    { name: 'Settings', value: 'settings' },
    { name: 'Orders', value: 'orders' }
]

const page = () => {

    return (
        <Tabs defaultValue='profile' className='gap-4 w-full pt-30 mx-auto min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8'>
            <TabsList className='h-fit! w-full rounded-none border-b bg-transparent p-0 sm:justify-start'>
                {tabs.map(tab => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className='data-[state=active]:border-primary dark:data-[state=active]:border-primary rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none! sm:flex-0 dark:data-[state=active]:bg-transparent'
                    >
                        {tab.name}
                    </TabsTrigger>
                ))}
            </TabsList>

            <div className='mt-4'>
                <TabsContent value="profile">
                    <MyUserProfile />
                    <ProfileTestimonials />
                </TabsContent>

                <TabsContent value="settings">
                    <AccountSettingsForm />
                </TabsContent>

                <TabsContent value="orders">
                    <div>Здесь будет компонент заказов</div>
                </TabsContent>
            </div>
        </Tabs>
    )
}

export default page;