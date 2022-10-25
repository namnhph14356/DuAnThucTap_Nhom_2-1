export const isValidEmail = (email) =>{
    const isValid = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
    return isValid.test(email);
}