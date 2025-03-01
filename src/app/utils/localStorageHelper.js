export const getUsersFromStorage = () => JSON.parse(localStorage.getItem("users")) || [];

export const saveUsersToStorage = (users) => localStorage.setItem("users", JSON.stringify(users));
