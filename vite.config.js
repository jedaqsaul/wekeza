import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Matches the backend's default CORS_ALLOWED_ORIGINS (http://localhost:3000).
    port: 3000,
    strictPort: true,
  },
});
