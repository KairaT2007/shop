'use client';

import { useEffect, useState } from "react";
import { getAllProfiles } from "@/lib/api"; 

export function useGetAllProfiles() {
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        
        getAllProfiles()
            .then((data) => {
                console.log("=== Список всех пользователей ===", data);
                
                setProfiles(data);
            })
            .catch((err) => {
                console.error("Ошибка при получении всех профилей:", err);
                setError(err.message || "Не удалось загрузить пользователей");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { profiles, isLoading, error };
}