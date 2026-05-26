"use client"

import { useState } from "react"
import { toast } from "sonner"
import { confirmEmail } from "@/lib/api"

export function useResetPasswordRequest() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!email) {
            toast.error("Пожалуйста, введите email", {
                style: {
                    '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-red-600), var(--color-red-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-red-600), var(--color-red-400))',
                    '--normal-border': 'light-dark(var(--color-red-600), var(--color-red-400))'
                }
            })
            return
        }

        setLoading(true)
        setMessage("")

        try {
            await confirmEmail(email)
            const successMsg = "Ссылка для сброса пароля отправлена!"
            setMessage(successMsg)
            
            toast.success(successMsg, {
                style: {
                    '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                }
            })
        } catch (err) {
            const errMsg = err.message || "Не удалось отправить ссылку для сброса"
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
        setEmail,
        loading,
        status,
        handleSubmit
    }
}