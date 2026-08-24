import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dns from "dns";

// Prevent VPN/Proxy DNS timeout by forcing IPv4 DNS resolution first
dns.setDefaultResultOrder("ipv4first");
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "https://admin.egimedical.com",
				changeOrigin: true,
				secure: false,
				xfwd: false, // Prevent adding X-Forwarded-For headers
				configure: (proxy, _options) => {
					proxy.on("error", (err, _req, _res) => {
						console.error("Proxy Error:", err.message);
					});
					proxy.on("proxyReq", (proxyReq, req, _res) => {
						// Remove headers that can trigger Cloudflare/firewall blocking
						proxyReq.removeHeader("x-forwarded-for");
						proxyReq.removeHeader("x-forwarded-proto");
						proxyReq.removeHeader("x-forwarded-host");
						proxyReq.removeHeader("x-forwarded-port");
						console.log("Proxy Request Sent:", req.method, req.url);
					});
					proxy.on("proxyRes", (proxyRes, req, _res) => {
						console.log("Proxy Response Received:", proxyRes.statusCode, req.url);
					});
				},
			},
		},
	},
});


