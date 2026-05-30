const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
            console.log(e);
        }

        throw new Error(errorMessage);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export function registerUser(userData) {
    return apiRequest(`${API_BASE_URL}/api/auth/registration/`, {
        method: "POST",
        credentials: "include", 
        body: JSON.stringify({
            username: userData.username,
            email: userData.email,
            password: userData.password,
            re_password: userData.confirmPassword,
        }),
    });
}

export function loginUser(credentials) {
    return apiRequest(`${API_BASE_URL}/api/auth/login/`, {
        method: "POST",
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
        }),
    });
}

export function getCurrentUser(token) {
    return apiRequest(`${API_BASE_URL}/api/auth/my_profile/`, {
        method: "GET",
        headers: {
            Authorization: `JWT ${token}`,
        },
    });
}

export function getUserProfile(uuid) {
    return apiRequest(`${API_BASE_URL}/api/auth/profiles/${uuid}/`, {
        method: "GET",
    });
}

export function getAllProfiles() {
    return apiRequest(`${API_BASE_URL}/api/auth/profiles/`, {
        method: "GET",
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
    return apiRequest(`${API_BASE_URL}/api/auth/activation/`, {
        method: "POST",
        body: JSON.stringify({ uid, token }),
    });
}

export function resendActivation(email) {
    return apiRequest(`${API_BASE_URL}/api/auth/activation/resend/`, {
        method: "POST",
        body: JSON.stringify({ email }),
    });
}

export function confirmEmail(email) {
    return apiRequest(`${API_BASE_URL}/api/auth/password_reset/request/`, {
        method: "POST",
        body: JSON.stringify({ email }),
    });
}

export function resetPassword(uid, token, new_password, re_new_password) {
    return apiRequest(`${API_BASE_URL}/api/auth/password_reset/confirmation/`, {
        method: "POST",
        body: JSON.stringify({ uid, token, new_password, re_new_password }),
    });
}

export function updateUserProfile(token, formData) {
    return fetch(`${API_BASE_URL}/api/auth/my_profile/`, {
        method: "PATCH",
        headers: {
            Authorization: `JWT ${token}`,
        },
        body: formData,
    }).then(async (response) => {
        if (!response.ok) {
            let errorMessage = `HTTP error ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.detail || errorData.message || errorMessage;
            } catch (e) {
                console.log(e);
            }
            throw new Error(errorMessage);
        }
        if (response.status === 204) return null;
        return response.json();
    });
}