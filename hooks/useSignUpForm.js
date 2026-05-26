"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { registerUser } from "@/lib/api"

export function useSignUpForm() {
    const router = useRouter();
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
            const errMsg = "Пароли не совпадают!";
            setError(errMsg);
            toast.error(errMsg, {
                style: {
                    '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-red-600), var(--color-red-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-red-600), var(--color-red-400))',
                    '--normal-border': 'light-dark(var(--color-red-600), var(--color-red-400))'
                }
            });
            return;
        }

        setIsLoading(true);

        try {
            await registerUser({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            localStorage.setItem("pending_email", formData.email);

            toast.success('Регистрация успешна! На вашу почту отправлена ссылка для активации аккаунта.', {
                duration: 5000,
                style: {
                    '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                }
            });

            window.location.href = '/check_email/activation';

        } catch (err) {
            const errMsg = err.message || "Что-то пошло не так";
            setError(errMsg);
            toast.error(errMsg, {
                style: {
                    '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-red-600), var(--color-red-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-red-600), var(--color-red-400))',
                    '--normal-border': 'light-dark(var(--color-red-600), var(--color-red-400))'
                }
            });
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