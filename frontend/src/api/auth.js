import client from "./client"

export const createUser = async (userInfo) => {
    try {
        const { data } = await client.post("/user/create", userInfo);
        return data;
    } catch (error) {
        const { response } = error;
        if (response?.data) return response.data;

        return { error: error.message || error };
    }
}

export const verifyUserEmail = async (userInfo) => {
    try {
        const { data } = await client.post("/user/verify-email", userInfo);
        return data;
    } catch (error) {
        const { response } = error;
        if (response?.data) return response.data;

        return { error: error.message || error };
    }
}
export const signInUser = async (userInfo) => {
    try {
        const { data } = await client.post("/user/sign-in", userInfo);
        return data;
    } catch (error) {
        const { response } = error;
        if (response?.data) return response.data;

        return { error: error.message || error };
    }
};
export const getIsAuth = async (token) => {
    try {
        const { data } = await client.get("/user/is-auth", {
            Headers: {
                Authorization: 'Bearer' + token, 
                accept: 'application/json',
            }
        });
        return data;
    } catch (error) {
        const { response } = error;
        if (response?.data) return response.data;

        return { error: error.message || error };
    }
};
export const forgetPassword = async (token) => {
    try {
        const { data } = await client.get("/user/forget-password", {email});
        return data;
    } catch (error) {
        const { response } = error;
        if (response?.data) return response.data;

        return { error: error.message || error };
    }
};
export const verifyPasswordResetToken = async (token, userId) => {
    try {
        const { data } = await client.get("/user/verify-pass-reset-token", {token, userId});
        return data;
    } catch (error) {
        const { response } = error;
        if (response?.data) return response.data;

        return { error: error.message || error };
    }
};