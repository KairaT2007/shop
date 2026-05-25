"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useSignInForm } from "@/hooks/useSignInForm"
import { Link } from "@/i18n/routing"
import GoogleButton from "../buttons/GoogleAuthButton"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

export function SignInForm({ className, ...props }) {
    const { isLoading, error, handleSignIn } = useSignInForm();
    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => setIsVisible(prevState => !prevState)

    return (
        <form onSubmit={handleSignIn} className={cn("flex flex-col gap-6", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    {error && (
                        <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-md w-full">
                            {error}
                        </p>
                    )}
                </div>

                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="mail@example.com"
                        disabled={isLoading}
                        required
                    />
                </Field>

                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Link href="/check_email/reset_password" className="ml-auto text-sm underline-offset-4 hover:underline">
                            Forgot your password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={isVisible ? 'text' : 'password'}
                            disabled={isLoading}
                            required
                        />
                        <Button
                            type="button"
                            variant='ghost'
                            size='icon'
                            onClick={toggleVisibility}
                            className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
                        >
                            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                            <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
                        </Button>
                    </div>
                </Field>

                <Field>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </Field>

                <FieldSeparator>Or continue with</FieldSeparator>

                <Field>
                    <GoogleButton />
                </Field>

                <p className="text-center text-sm text-muted-foreground mt-2">
                    Don't have an account? <Link href={`/sign_up`} className="underline underline-offset-4">Sign up</Link>
                </p>
            </FieldGroup>
        </form>
    )
}