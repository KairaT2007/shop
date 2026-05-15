"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useSignInForm } from "@/hooks/useSignInForm"

export function SignInForm({ className, ...props }) {
    const { isLoading, error, handleSignIn } = useSignInForm();

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
                        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                            Forgot your password?
                        </a>
                    </div>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        disabled={isLoading}
                        required
                    />
                </Field>

                <Field>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </Field>

                <p className="text-center text-sm text-muted-foreground mt-2">
                    Don't have an account? <a href="/sign_up" className="underline underline-offset-4">Sign up</a>
                </p>
            </FieldGroup>
        </form>
    )
}