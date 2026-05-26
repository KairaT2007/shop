"use client"

import { useEffect, useState, useRef } from "react"
import { toast } from "sonner"
import { activateUser } from "@/lib/api"
import { useParams } from "next/navigation"

export function useActivationAccount() {
    const { uid, token } = useParams()
    const [status, setStatus] = useState("loading")
    
    const hasAttempted = useRef(false)

    useEffect(() => {
        async function activate() {
            if (!uid || !token) {
                setStatus("error")
                toast.error("Неверная или неполная ссылка для активации", {
                    style: {
                        '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-red-600), var(--color-red-400)) 10%, var(--background))',
                        '--normal-text': 'light-dark(var(--color-red-600), var(--color-red-400))',
                        '--normal-border': 'light-dark(var(--color-red-600), var(--color-red-400))'
                    }
                })
                return
            }

            if (hasAttempted.current) return
            hasAttempted.current = true

            const cleanToken = typeof token === 'string' 
                ? token.replace(/%3D/g, '').replace(/=/g, '') 
                : token;

            try {
                await activateUser(uid, cleanToken)
                setStatus("success")
                
                toast.success("Аккаунт успешно активирован!", {
                    style: {
                        '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                        '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                        '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                    }
                })
            } catch (e) {
                setStatus("error")
                const errMsg = e.message || "Не удалось активировать аккаунт. Возможно, ссылка устарела."
                
                toast.error(errMsg, {
                    style: {
                        '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-red-600), var(--color-red-400)) 10%, var(--background))',
                        '--normal-text': 'light-dark(var(--color-red-600), var(--color-red-400))',
                        '--normal-border': 'light-dark(var(--color-red-600), var(--color-red-400))'
                    }
                })
            }
        }

        activate()
    }, [uid, token])

    return { status }
}