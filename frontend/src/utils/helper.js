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

export const renderItem = (result) => {
    return (
      <div key={result.id} className="flex space-x-2 rounded overflow-hidden">
        <img
          src={result.avatar}
          alt={result.name}
          className="w-16 h-16 object-cover"
        />
        <p className="dark:text-white font-semibold hover:underline">{result.name} Reviews</p>
      </div>
    );
  };