"use client"

import { CheckIcon, XIcon, EyeIcon, EyeOffIcon, MailCheck, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/Logo'
import { useResetPassword } from '@/hooks/useResetPassword'

export function ResetPasswordCard() {

    const {
        isVisible,
        newPassword,
        confirmPassword,
        loading,
        status,
        strength,
        strengthScore,
        isButtonDisabled,
        setNewPassword,
        setConfirmPassword,
        toggleVisibility,
        handleSubmit
    } = useResetPassword()


    const getColor = (score) => {
        if (score === 0) return 'bg-border'
        if (score === 1) return 'bg-destructive'
        if (score === 2) return 'bg-orange-500'
        if (score === 3) return 'bg-yellow-400'
        return 'bg-green-500'
    }

    const getText = (score) => {
        if (score === 0) return 'Enter a password'
        if (score === 1) return 'Weak password'
        if (score === 2) return 'Medium password'
        if (score === 3) return 'Strong password'
        return 'Very strong password'
    }

    return (
        <Card className="z-1 w-full gap-6 py-6 sm:max-w-lg">
            <CardHeader className="gap-6 px-6">
                <div className="flex justify-between">
                    <Logo />
                    <div
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full ring-2 
              ${status === 'idle' ? "bg-[#00c66d]/10 text-[#00c66d] ring-[#00c66d]/30" : ""}
              ${status === 'success' ? "bg-green-500/10 text-green-500 ring-green-500/30" : ""}
              ${status === 'error' ? "bg-red-500/10 text-red-500 ring-red-500/30" : ""}
            `}
                    >
                        {status === 'idle' && <MailCheck size={18} />}
                        {status === 'success' && <CheckCircle2 size={18} />}
                        {status === 'error' && <AlertCircle size={18} />}
                    </div>
                </div>

                <div className="text-center">
                    <CardTitle className="mb-2 text-2xl font-semibold">
                        Change Password
                    </CardTitle>
                </div>
            </CardHeader>

            <CardContent className="px-6">
                <div className='lg:col-span-2'>
                    <form className='mx-auto space-y-6' onSubmit={handleSubmit}>
                        <div className='w-full space-y-2'>
                            <Label htmlFor='new-password' className='gap-1'>
                                New Password
                            </Label>
                            <div className='relative'>
                                <Input
                                    id='new-password'
                                    type={isVisible ? 'text' : 'password'}
                                    placeholder='Password'
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    className='pr-9'
                                    required
                                    disabled={loading || status === 'success'}
                                />
                                <Button
                                    type="button"
                                    variant='ghost'
                                    size='icon'
                                    onClick={toggleVisibility}
                                    className='absolute inset-y-0 right-0 rounded-l-none text-muted-foreground hover:bg-transparent focus-visible:ring-ring/50'
                                >
                                    {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                                    <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
                                </Button>
                            </div>
                        </div>

                        <div className='w-full space-y-2'>
                            <Label htmlFor='confirm-password' className='gap-1'>
                                Confirm New Password
                            </Label>
                            <div className='relative mb-3'>
                                <Input
                                    id='confirm-password'
                                    type={isVisible ? 'text' : 'password'}
                                    placeholder='Password'
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    className='pr-9'
                                    required
                                    disabled={loading || status === 'success'}
                                />
                                <Button
                                    type="button"
                                    variant='ghost'
                                    size='icon'
                                    onClick={toggleVisibility}
                                    className='absolute inset-y-0 right-0 rounded-l-none text-muted-foreground hover:bg-transparent focus-visible:ring-ring/50'
                                >
                                    {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                                    <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
                                </Button>
                            </div>

                            <div className='mb-4 flex h-1 w-full gap-1'>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <span
                                        key={index}
                                        className={cn(
                                            'h-full flex-1 rounded-full transition-all duration-500 ease-out',
                                            index < strengthScore ? getColor(strengthScore) : 'bg-border'
                                        )}
                                    />
                                ))}
                            </div>

                            <p className='text-sm font-medium text-foreground'>{getText(strengthScore)}. Must contain :</p>

                            <ul className='mb-4 space-y-1.5'>
                                {strength.map((req, index) => (
                                    <li key={index} className='flex items-center gap-2'>
                                        {req.met ? (
                                            <CheckIcon className='size-4 text-green-600 dark:text-green-400' />
                                        ) : (
                                            <XIcon className='size-4 text-muted-foreground' />
                                        )}
                                        <span
                                            className={cn('text-xs', req.met ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground')}
                                        >
                                            {req.text}
                                            <span className='sr-only'>{req.met ? ' - Requirement met' : ' - Requirement not met'}</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button type='submit' className='w-full' disabled={isButtonDisabled}>
                            {loading ? "Saving..." : "Save New password"}
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    )
}