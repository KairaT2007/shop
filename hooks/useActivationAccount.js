"use client"

import { useEffect, useState } from "react"
import { activateUser } from "@/lib/api"
import { useParams } from "next/navigation"

export function useActivationAccount() {
    const { uid, token } = useParams()
    const [status, setStatus] = useState("loading")

    useEffect(() => {
        async function activate() {
            if (!uid || !token) {
                setStatus("error")
                return
            }

            const cleanToken = typeof token === 'string' 
                ? token.replace(/%3D/g, '').replace(/=/g, '') 
                : token;

            try {
                await activateUser(uid, cleanToken)
                setStatus("success")
            } catch (e) {
                setStatus("error")
            }
        }

        activate()
    }, [uid, token])

    return { status }
}