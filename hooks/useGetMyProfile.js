"use client"

import { useAuth } from '@/providers/AuthContext'

export function useGetMyProfile() {
    const { user, isLoading, handleLogout } = useAuth();
    return { user, isLoading, handleLogout };
}
