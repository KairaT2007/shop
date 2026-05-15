"use client"

import { useParams } from 'next/navigation'
import { useAuth } from '@/providers/AuthContext'

export function useGetMyProfile() {
    const { user, isLoading, handleLogout } = useAuth();
    const params = useParams();
    const locale = params?.locale || 'en';

    return { user, isLoading, handleLogout, locale };
}