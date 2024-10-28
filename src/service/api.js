import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

const api = axios.create({
	baseURL: API_URL,
	// baseURL: "https://api.marrfa.com/api/v1",
	withCredentials: true,
});

export const loginAuth = (payload) => api.post("./auth/login", payload);
export const signupAuth = (payload) => api.post("./auth/signup", payload);
export const logoutAuth = () => api.get("./auth/logout");

export const createBlog = (payload) => api.post("./blog", payload, {
					"Content-Type": "multipart/form-data",
				});
export const getBlogs = () => api.get("./blog");
export const getBlog = (id) => api.get("./blog/" + id);
export const updateBlog = (id, payload) => api.patch("./blog/" + id, payload);
export const deleteBlog = (id) => api.delete("./blog/" + id)