"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { resendActivation } from "@/lib/api"

export function useResendEmailActivation() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        const savedEmail = localStorage.getItem("pending_email")
        if (savedEmail) setEmail(savedEmail)
    }, [])

    const handleResend = async () => {
        if (!email) {
            toast.error("Email не найден. Пожалуйста, начните регистрацию заново.", {
                style: {
                    '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-red-600), var(--color-red-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-red-600), var(--color-red-400))',
                    '--normal-border': 'light-dark(var(--color-red-600), var(--color-red-400))'
                }
            });
            return;
        }

        setLoading(true)
        setMessage("")

        try {
            await resendActivation(email)
            const successMsg = "Письмо отправлено повторно!"
            setMessage(successMsg)
            
            toast.success(successMsg, {
                style: {
                    '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                }
            })
        } catch (err) {
            const errMsg = err.message || "Не удалось отправить письмо"
            setMessage(errMsg)
            
            toast.error(errMsg, {
                style: {
                    '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-red-600), var(--color-red-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-red-600), var(--color-red-400))',
                    '--normal-border': 'light-dark(var(--color-red-600), var(--color-red-400))'
                }
            })
        } finally {
            setLoading(false)
        }
    }

    let status = "idle"
    if (loading) {
        status = "loading"
    } else if (message) {
        status = message.includes("Не удалось") ? "error" : "success"
    }

    return {
        email,
        loading,
        status,
        handleResend
    }
}