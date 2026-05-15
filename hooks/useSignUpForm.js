"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { registerUser } from "@/lib/api"

export function useSignUpForm() {
    const router = useRouter();
    const pathname = usePathname();
    
    const currentLocale = pathname.split('/')[1];

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setIsLoading(true);

        try {
            await registerUser({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            router.push(`/${currentLocale}/sign_in`);

        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        error,
        isLoading,
        handleChange,
        handleSubmit
    };
}