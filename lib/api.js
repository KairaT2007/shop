const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function apiRequest(url, options = {}) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    });

    if (!response.ok) {
        let errorMessage = `HTTP error ${response.status}`;

        try {
            const errorData = await response.json();

            errorMessage =
                errorData.detail ||
                errorData.message ||
                errorData.non_field_errors?.[0] ||
                errorMessage;
        } catch (e) {
            // fallback if response is not JSON
        }

        throw new Error(errorMessage);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export function registerUser(userData) {
    return apiRequest(`${API_BASE_URL}/api/auth/users/`, {
        method: "POST",
        credentials: "include", // Убедись, что credentials нужны, обычно для JWT они не требуются, но оставь, если используешь куки
        body: JSON.stringify({
            username: userData.username,
            email: userData.email,
            password: userData.password,
            re_password: userData.confirmPassword,
        }),
    });
}

export function loginUser(credentials) {
    return apiRequest(`${API_BASE_URL}/api/auth/jwt/create/`, {
        method: "POST",
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
        }),
    });
}

export function getCurrentUser(token) {
    return apiRequest(`${API_BASE_URL}/api/auth/users/me/`, {
        method: "GET",
        headers: {
            Authorization: `JWT ${token}`,
        },
    });
}

export function loginWithGoogle(idToken) {
    return apiRequest(`${API_BASE_URL}/api/auth/google/`, {
        method: "POST",
        body: JSON.stringify({
            id_token: idToken,
        }),
    });
}

export function activateUser(uid, token) {
    return apiRequest(`${API_BASE_URL}/api/auth/users/activation/`, {
        method: "POST",
        body: JSON.stringify({ uid, token }),
    });
}

export function resendActivation(email) {
    return apiRequest(
        `${API_BASE_URL}/api/auth/users/resend_activation/`,
        {
            method: "POST",
            body: JSON.stringify({ email }),
        }
    );
}

export function confirmEmail(email) {
    return apiRequest(`${API_BASE_URL}/api/auth/users/reset_password/`, {
        method: "POST",
        body: JSON.stringify({ email }),
    });
}

export function resetPassword(uid, token, new_password, re_new_password) {
    return apiRequest(`${API_BASE_URL}/api/auth/users/reset_password_confirm/`, {
        method: "POST",
        body: JSON.stringify({ uid, token, new_password, re_new_password }),
    });
}