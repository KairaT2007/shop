"use client"

import { useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { resetPassword } from '@/lib/api'

const requirements = [
    { regex: /.{12,}/, text: 'At least 12 characters' },
    { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
    { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
    { regex: /[0-9]/, text: 'At least 1 number' }
]

export function useResetPassword() {
    const { uid, token } = useParams()
    const router = useRouter()

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

            setTimeout(() => {
                router.push('/sign_in')
            }, 2000)

        } catch (error) {
            setStatus('error')
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