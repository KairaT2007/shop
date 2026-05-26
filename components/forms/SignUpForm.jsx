"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useSignUpForm } from "@/hooks/useSignUpForm"
import { Link } from "@/i18n/routing"
import GoogleButton from "../buttons/GoogleAuthButton"
import { CheckIcon, XIcon, EyeIcon, EyeOffIcon, Home } from "lucide-react"

const requirements = [
    { regex: /.{12,}/, text: 'At least 12 characters' },
    { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
    { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
    { regex: /[0-9]/, text: 'At least 1 number' }
]

export function SignUpForm({ className, ...props }) {
    const { formData, isLoading, handleChange, handleSubmit } = useSignUpForm();
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(prevState => !prevState);

    const strength = requirements.map(req => ({
        met: req.regex.test(formData.password || ''),
        text: req.text
    }));

    const strengthScore = useMemo(() => {
        return strength.filter(req => req.met).length;
    }, [strength]);

    const isAllRequirementsMet = strengthScore === 4;
    const isPasswordsMatch = formData.password === formData.confirmPassword && formData.password !== '';
    const isButtonDisabled = isLoading || !isAllRequirementsMet || !isPasswordsMatch;

    const getColor = (score) => {
        if (score === 0) return 'bg-muted'
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
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-sm text-balance text-muted-foreground">
                        Fill in the form below to create your account
                    </p>
                </div>

                <Field>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="John Doe"
                        value={formData.username}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                    />
                </Field>

                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="m@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                    />
                </Field>

                {/* Password Field */}
                <Field className="space-y-2">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={isVisible ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            disabled={isLoading}
                            className="pr-9"
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={toggleVisibility}
                            className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
                        >
                            {isVisible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                            <span className="sr-only">{isVisible ? 'Hide password' : 'Show password'}</span>
                        </Button>
                    </div>
                </Field>

                {/* Confirm Password Field */}
                <Field className="space-y-2">
                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={isVisible ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={isLoading}
                            className="pr-9"
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={toggleVisibility}
                            className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
                        >
                            {isVisible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                            <span className="sr-only">{isVisible ? 'Hide password' : 'Show password'}</span>
                        </Button>
                    </div>
                </Field>

                {/* Блок с требованиями перенесен сюда, после всех полей */}
                <div className="flex flex-col gap-3 py-1">
                    {/* Strength Bars - исправлены на div и увеличены по высоте */}
                    <div className="flex h-1 w-full gap-1">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className={cn(
                                    'h-full flex-1 rounded-full transition-all duration-500 ease-out',
                                    index < strengthScore ? getColor(strengthScore) : 'bg-muted'
                                )}
                            />
                        ))}
                    </div>

                    {/* Requirements Checklist */}
                    <div className="space-y-2">
                        <p className="text-foreground text-sm font-medium">{getText(strengthScore)}. Must contain :</p>
                        <ul className="space-y-1.5">
                            {strength.map((req, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    {req.met ? (
                                        <CheckIcon className="size-4 text-green-600 dark:text-green-400" />
                                    ) : (
                                        <XIcon className="text-muted-foreground size-4" />
                                    )}
                                    <span className={cn('text-xs', req.met ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground')}>
                                        {req.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Field className="pt-2">
                    <Button type="submit" disabled={isButtonDisabled} className="w-full">
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                </Field>

                <FieldSeparator>Or continue with</FieldSeparator>

                <Field>
                    <GoogleButton />
                </Field>

                <Field>
                    <Button variant="outline" asChild>
                        <Link href={'/'}>
                            <Home />
                            Back to Home
                        </Link>
                    </Button>
                </Field>

                <p className="text-center text-sm text-muted-foreground mt-2">
                    Already have an account? <Link href="/sign_in" className="underline underline-offset-4">Sign in</Link>
                </p>
            </FieldGroup>
        </form>
    );
}