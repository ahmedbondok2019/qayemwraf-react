import axios from "axios";
import { env } from "@/config/env";
import { setupInterceptors } from "./interceptors";

export const api = axios.create({
	baseURL: env.apiUrl,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

setupInterceptors(api);

export default api;
