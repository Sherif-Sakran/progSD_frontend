import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/", // Replace with your Django backend URL
  withCredentials: true, // To handle session-based authentication
});

export const login = async (username, password) => {
  const response = await api.post("users/login/", { username, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.post("users/logout/");
  return response.data;
};

export const sayMyName = async (name) => {
    const response = await api.post("users/say_my_name/", { name });
    return response.data;
  };

export default api;
