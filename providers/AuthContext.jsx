"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getCurrentUser } from '@/lib/api'

function getCookie(name) {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        const token = getCookie('access_token');
        if (!token) {
            setIsLoading(false);
            return;
        }

        getCurrentUser(token)
            .then(data => setUser(data?.uuid ? data : null))
            .catch(err => console.error("Auth error:", err))
            .finally(() => setIsLoading(false));
    }, []);

    const handleLogout = () => {
        document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        setUser(null);
        const currentLocale = pathname.split('/')[1] || 'en';
        window.location.href = `/${currentLocale}`;
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);