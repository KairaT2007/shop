'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/api"; 

export function useGetProfile() {
    const params = useParams();
    const userId = params?.id; 

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        setIsLoading(true);
        setError(null);

        getUserProfile(userId)
            .then((data) => {
                setUser(data);
            })
            .catch((err) => {
                console.error("Ошибка при загрузке профиля:", err);
                setError(err.message || "Не удалось загрузить профиль");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [userId]);

    return { user, isLoading, error, userId };
}