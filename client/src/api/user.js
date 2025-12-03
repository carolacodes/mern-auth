import axios from "./axios"; // tu instancia con baseURL + withCredentials

export const getUserRequest = () => axios.get("/users/me");

export const updateUserRequest = (data) => axios.put("/users/me", data);

export const deleteUserRequest = () => axios.delete("/users/me");