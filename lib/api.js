const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

/**
 * Функция для регистрации нового пользователя.
 * @param {Object} userData - Данные пользователя { username, email, password }
 */
export async function registerUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                username: userData.username,
                email: userData.email,
                password: userData.password,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `Ошибка сервера: ${response.status}`;

            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.detail || errorData.message || errorMessage;
            } catch (jsonError) {
                console.error("Сервер вернул не JSON:", errorText);
            }

            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function loginUser(credentials) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/jwt/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = "Неверный email или пароль";
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.detail || errorData.non_field_errors?.[0] || errorMessage;
            } catch (e) {
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function getCurrentUser(token) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/users/me/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`, 
            },
        });

        if (!response.ok) {
            throw new Error('Не удалось загрузить данные пользователя');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}