"use client"

import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/config/firebase"
import { loginWithGoogle } from "@/lib/api"
import { useState } from "react"

export function useGoogleAuth() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const signIn = async () => {
        setIsLoading(true)
        setError("")

        try {
            const result = await signInWithPopup(auth, googleProvider)

            const idToken = await result.user.getIdToken()

            const data = await loginWithGoogle(idToken)

            const isSecure = window.location.protocol === "https:" ? "Secure;" : ""
            const baseOptions = `path=/; SameSite=Lax; ${isSecure}`

            const accessExpire = new Date(Date.now() + 60 * 60 * 1000).toUTCString()
            document.cookie = `access_token=${data.access}; expires=${accessExpire}; ${baseOptions}`

            const refreshExpire = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString()
            document.cookie = `refresh_token=${data.refresh}; expires=${refreshExpire}; ${baseOptions}`
            window.location.href = `/`;

            return data
        } catch (err) {
            setError(err.message || "Google sign-in failed")
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return {
        signIn,
        isLoading,
        error,
    }
}