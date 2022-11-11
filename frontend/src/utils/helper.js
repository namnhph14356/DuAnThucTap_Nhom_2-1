/* eslint-disable no-useless-escape */
export const isValidEmail = (email) =>{
    const isValid = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
    return isValid.test(email);
}
export const getToken = () => localStorage.getItem("auth-token");

export const cathError = (error) => {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
}