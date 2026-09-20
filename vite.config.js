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
	build: {
		chunkSizeWarningLimit: 800,
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes("node_modules")) {
						if (id.includes("react-dom") || id.includes("react-router-dom") || id.includes("react/")) {
							return "vendor-react";
						}
						if (id.includes("@tanstack/react-query")) {
							return "vendor-query";
						}
						if (id.includes("lucide-react")) {
							return "vendor-lucide";
						}
						if (id.includes("@reduxjs/toolkit") || id.includes("react-redux")) {
							return "vendor-redux";
						}
						if (id.includes("embla-carousel") || id.includes("clsx") || id.includes("tailwind-merge")) {
							return "vendor-ui";
						}
					}
				},
			},
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "https://admin.egimedical.com",
				changeOrigin: true,
				secure: false,
				xfwd: false,
				configure: (proxy, _options) => {
					proxy.on("error", (err, _req, _res) => {
						console.error("Proxy Error:", err.message);
					});
					proxy.on("proxyReq", (proxyReq, req, _res) => {
						proxyReq.removeHeader("x-forwarded-for");
						proxyReq.removeHeader("x-forwarded-proto");
						proxyReq.removeHeader("x-forwarded-host");
						proxyReq.removeHeader("x-forwarded-port");
					});
				},
			},
		},
	},
});
