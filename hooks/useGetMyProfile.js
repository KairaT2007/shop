"use client"

import { useAuth } from '@/providers/AuthContext'

export function useGetMyProfile() {
    const { user, isLoading, handleLogout } = useAuth();
    const error = (!isLoading && !user) ? "Не авторизован" : null;
    return { user, isLoading, handleLogout, error };
}
