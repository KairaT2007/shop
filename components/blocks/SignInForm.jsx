"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginUser } from "@/lib/api" // Убедитесь, что путь верный

export function SignInForm({ className, ...props }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const data = await loginUser({ email, password });

            // Определяем настройки безопасности
            // В продакшене (https) добавляем флаг Secure
            const isSecure = window.location.protocol === 'https:' ? 'Secure;' : '';
            const baseOptions = `path=/; SameSite=Lax; ${isSecure}`;

            // Сохраняем Access Token (например, на 1 час)
            const accessExpire = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
            document.cookie = `access_token=${data.access}; expires=${accessExpire}; ${baseOptions}`;

            // Сохраняем Refresh Token (например, на 1 день)
            const refreshExpire = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
            document.cookie = `refresh_token=${data.refresh}; expires=${refreshExpire}; ${baseOptions}`;

            // Редирект
            window.location.href = "/dashboard";
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    {error && (
                        <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-md w-full">
                            {error}
                        </p>
                    )}
                </div>

                {/* Поле Email */}
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="mail@example.com"
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
                        required
                    />
                </Field>

                <Field>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}