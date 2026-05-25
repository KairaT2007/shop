"use client"

import { useState } from "react"
import { loginUser } from "@/lib/api"

export function useSignInForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignIn = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const data = await loginUser({ email, password });

            const isSecure = window.location.protocol === 'https:' ? 'Secure;' : '';
            const baseOptions = `path=/; SameSite=Lax; ${isSecure}`;

            const accessExpire = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
            document.cookie = `access_token=${data.access}; expires=${accessExpire}; ${baseOptions}`;

            const refreshExpire = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
            document.cookie = `refresh_token=${data.refresh}; expires=${refreshExpire}; ${baseOptions}`;

            window.location.href = `/`;

        } catch (err) {
            setError(err.message || "Invalid credentials");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        handleSignIn,
    };
}