"use client"

import { useEffect, useState } from "react"
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
        if (!email) return

        setLoading(true)
        setMessage("")

        try {
            await resendActivation(email)
            setMessage("Email sent again!")
        } catch (err) {
            setMessage(err.message || "Failed to resend email")
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
        loading,
        status,
        handleResend
    }
}