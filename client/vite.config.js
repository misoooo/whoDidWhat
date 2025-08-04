import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "0.0.0.0",
      "11566182-3c07-424d-93fa-58cd18b332b8-00-5k32tb2of67a.picard.replit.dev",
    ],
  },
});
