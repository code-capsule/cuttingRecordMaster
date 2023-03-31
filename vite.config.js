import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { devMainPlugin } from "./plugins/vite-plugin-dev-main";

export default defineConfig({
  root: "./",
  server: {
    port: 3000,
  },
  plugins: [devMainPlugin(), react()],
});
