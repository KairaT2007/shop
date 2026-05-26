"use client"

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { resetPassword } from '@/lib/api'

const requirements = [
    { regex: /.{12,}/, text: 'Минимум 12 символов' },
    { regex: /[a-z]/, text: 'Минимум 1 строчная буква' },
    { regex: /[A-Z]/, text: 'Минимум 1 заглавная буква' },
    { regex: /[0-9]/, text: 'Минимум 1 цифра' }
]

export function useResetPassword() {
    const { uid, token } = useParams()

    const [isVisible, setIsVisible] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('idle')

    const toggleVisibility = () => setIsVisible(prevState => !prevState)

    const strength = requirements.map(req => ({
        met: req.regex.test(newPassword),
        text: req.text
    }))

    const strengthScore = useMemo(() => {
        return strength.filter(req => req.met).length
    }, [strength])

    const isAllRequirementsMet = strengthScore === 4
    const isPasswordsMatch = newPassword === confirmPassword && newPassword !== ''
    const isButtonDisabled = !isAllRequirementsMet || !isPasswordsMatch || loading || status === 'success'

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isButtonDisabled) return

        setLoading(true)
        setStatus('idle')

        try {
            await resetPassword(uid, token, newPassword, confirmPassword)
            setStatus('success')

            toast.success("Пароль успешно изменен!", {
                style: {
                    '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                }
            })

            // Ждем 2 секунды, чтобы пользователь увидел зеленый тост, затем жестко перенаправляем
            setTimeout(() => {
                window.location.href = '/sign_in'
            }, 2000)

        } catch (error) {
            setStatus('error')
            const errMsg = error.message || "Не удалось сбросить пароль"
            
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

    return {
        isVisible,
        newPassword,
        confirmPassword,
        loading,
        status,
        strength,
        strengthScore,
        isButtonDisabled,
        setNewPassword,
        setConfirmPassword,
        toggleVisibility,
        handleSubmit
    }
}