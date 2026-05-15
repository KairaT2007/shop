"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export function useToggleTheme() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return {
        mounted,
        setTheme,
    }
}