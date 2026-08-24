import axios from "axios";
import { setupInterceptors } from "./interceptors";
import { env } from "@/config/env";

export const api = axios.create({
	baseURL: env.apiUrl || "http://localhost:8000/api/v1", // Fallback if env is missing
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json"
	},
});

setupInterceptors(api);

export default api;
