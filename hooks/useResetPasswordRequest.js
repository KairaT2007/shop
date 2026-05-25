"use client"

import { useState } from "react"
import { confirmEmail } from "@/lib/api"

export function useResetPasswordRequest() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) return

        setLoading(true)
        setMessage("")

        try {
            await confirmEmail(email)
            setMessage("Ссылка для сброса отправлена!")
        } catch (err) {
            setMessage(err.message || "Failed to send reset email")
        } finally {
            setLoading(false)
        }
    }

    let status = "idle"
    if (loading) {
        status = "loading"
    } else if (message) {
        status = message.includes("Failed") ? "error" : "success"
    }

    return {
        email,
        setEmail,
        loading,
        status,
        handleSubmit
    }
}