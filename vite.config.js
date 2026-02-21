import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // 👈 ודא שהשורה הזו קיימת

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 👇 החלק הזה מגדיר את הקיצור
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
