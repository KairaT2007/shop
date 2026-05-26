'use client'

import { UploadCloudIcon, TrashIcon, ImageIcon, Loader2, Lock, SaveAll, KeyRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useChangeSettings } from '@/hooks/useChangeSettings'
import { useGetMyProfile } from '@/hooks/useGetMyProfile'
import { Link } from "@/i18n/routing"

const AccountSettingsForm = () => {
    const {
        inputRef,
        file,
        preview,
        username,
        setUsername,
        description,
        setDescription,
        isSaving,
        onSelect,
        openPicker,
        remove,
        handleSubmit
    } = useChangeSettings()

    const { error } = useGetMyProfile();

    if (error) {
        return (
            <Card className="border-border/50 mt-10 bg-background/50 backdrop-blur-md">
                <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="bg-muted p-4 rounded-full mb-4">
                        <Lock className="size-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Доступ закрыт</h2>
                    <p className="text-muted-foreground mb-6 max-w-md text-pretty">
                        Пожалуйста, войдите в свой аккаунт, чтобы просматривать баланс и редактировать личные данные.
                    </p>
                    <Link
                        href="/sign_in"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                    >
                        Войти в аккаунт
                    </Link>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className='mb-6 p-6 grid grid-cols-1 gap-10 lg:grid-cols-3 bg-background/50 backdrop-blur-md'>
            <div className='flex flex-col space-y-1'>
                <h3 className='font-semibold'>Personal Information</h3>
                <p className='text-muted-foreground text-sm'>Manage your personal information and role.</p>
            </div>

            <div className='space-y-6 lg:col-span-2'>
                <form className='mx-auto' onSubmit={handleSubmit}>
                    <div className='mb-6 w-full space-y-2'>
                        <Label>Your Avatar</Label>
                        <div className='flex items-center gap-4'>
                            <div
                                role='button'
                                tabIndex={0}
                                aria-label='Upload your avatar'
                                onClick={openPicker}
                                onKeyDown={e => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        openPicker()
                                    }
                                }}
                                className='flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed hover:opacity-95'
                            >
                                {preview ? (
                                    <img src={preview} alt='avatar preview' className='h-full w-full object-cover' />
                                ) : (
                                    <ImageIcon />
                                )}
                            </div>

                            <div className='flex items-center gap-2'>
                                <input ref={inputRef} type='file' accept='image/*' className='hidden' onChange={onSelect} />
                                <Button type='button' variant='outline' onClick={openPicker} className='flex items-center gap-2'>
                                    <UploadCloudIcon className="h-4 w-4" />
                                    Upload avatar
                                </Button>
                                <Button type='button' variant='ghost' onClick={remove} disabled={!file && !preview} className='text-destructive'>
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <p className='text-muted-foreground text-sm'>Pick a photo up to 1MB.</p>
                    </div>

                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                        <div className='flex flex-col items-start gap-2'>
                            <Label htmlFor='username'>Username</Label>
                            <Input
                                id='username'
                                placeholder='John'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-2 sm:col-span-2'>
                            <Label htmlFor='description'>Description</Label>
                            <Textarea
                                placeholder='Describe your workspace purpose and goals...'
                                id='description'
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row justify-between mt-6 gap-4'>
                        <Button size='lg' variant='outline' className='max-sm:w-full' type='button' asChild>
                            <Link href="/check_email/reset_password">
                                <KeyRound />
                                Change Password
                            </Link>
                        </Button>
                        <Button size='lg' type='submit' className='max-sm:w-full' disabled={isSaving}>
                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <SaveAll />}
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    )
}

export default AccountSettingsForm