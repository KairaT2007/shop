import { useEffect, useRef, useState } from 'react'
import { getCurrentUser, updateUserProfile } from '@/lib/api'
import { toast } from 'sonner'

const getCookie = (name) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

export const useChangeSettings = () => {
    const inputRef = useRef(null)
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [isAvatarDeleted, setIsAvatarDeleted] = useState(false)
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    const TOKEN_COOKIE_NAME = 'access_token';

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = getCookie(TOKEN_COOKIE_NAME);

                if (!token) {
                    setIsLoading(false);
                    return;
                }

                const userData = await getCurrentUser(token);

                setUsername(userData.username || '');
                setDescription(userData.description || '');

                if (userData.avatar_url || userData.avatar) {
                    setPreview(userData.avatar_url || userData.avatar);
                }
            } catch (error) {
                if (error.message.includes('401') || error.message.includes('not valid')) {
                    document.cookie = `${TOKEN_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (!file) return;

        const url = URL.createObjectURL(file)
        const t = window.setTimeout(() => setPreview(url), 0)

        return () => {
            clearTimeout(t)
            URL.revokeObjectURL(url)
        }
    }, [file])

    const onSelect = (e) => {
        const f = e.target.files?.[0]
        if (!f) return

        if (!f.type.startsWith('image/')) {
            toast.error('Пожалуйста, выберите файл изображения');
            e.currentTarget.value = ''
            return
        }

        if (f.size > 5 * 1024 * 1024) {
            toast.error('Файл должен быть меньше 5MB');
            e.currentTarget.value = ''
            return
        }

        setFile(f)
        setIsAvatarDeleted(false)
    }

    const openPicker = () => inputRef.current?.click()

    const remove = () => {
        setFile(null)
        setPreview(null)
        setIsAvatarDeleted(true)
        if (inputRef.current) inputRef.current.value = ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const token = getCookie(TOKEN_COOKIE_NAME);

            if (!token) {
                throw new Error("Session expired. Please log in again.");
            }

            const formData = new FormData();
            formData.append('username', username);
            formData.append('description', description);

            if (file) {
                formData.append('avatar', file);
            } else if (isAvatarDeleted) {
                formData.append('avatar', '');
            }

            await updateUserProfile(token, formData);
            toast.success('Профиль успешно обновлен!', {
                style: {
                    '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                }
            });
            setIsAvatarDeleted(false);

        } catch (error) {
            toast.error(error.message || 'Не удалось обновить профиль', {
                style: {
                    '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-red-600), var(--color-red-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-red-600), var(--color-red-400))',
                    '--normal-border': 'light-dark(var(--color-red-600), var(--color-red-400))'
                }
            });
        } finally {
            setIsSaving(false);
        }
    }

    return {
        inputRef,
        file,
        preview,
        username,
        setUsername,
        description,
        setDescription,
        isLoading,
        isSaving,
        onSelect,
        openPicker,
        remove,
        handleSubmit
    }
}