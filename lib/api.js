// lib/api.js

// Базовый URL бэкенда. 
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

        // СНАЧАЛА проверяем, успешен ли запрос
        if (!response.ok) {
            // Читаем ответ как обычный текст
            const errorText = await response.text();
            let errorMessage = `Ошибка сервера: ${response.status}`;

            try {
                // Пробуем распарсить текст как JSON (на случай, если бэкенд всё-таки прислал JSON с ошибкой)
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.detail || errorData.message || errorMessage;
            } catch (jsonError) {
                // Если парсинг упал, значит бэкенд прислал HTML/текст (как в твоем случае с 500 ошибкой)
                console.error("Сервер вернул не JSON:", errorText);
            }

            throw new Error(errorMessage);
        }

        // Если статус 200-299, смело парсим JSON
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function loginUser(credentials) {
    try {
        // Убедитесь, что константа API_BASE_URL импортирована или доступна в области видимости
        const response = await fetch(`${API_BASE_URL}/api/auth/jwt/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: credentials.email, // Теперь передаем email
                password: credentials.password,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = "Неверный email или пароль";
            try {
                const errorData = JSON.parse(errorText);
                // Проверяем detail или вложенные ошибки полей
                errorMessage = errorData.detail || errorData.non_field_errors?.[0] || errorMessage;
            } catch (e) {
                // Игнорируем ошибку парсинга, оставляем сообщение по умолчанию
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}