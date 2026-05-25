import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwincdss from "@tailwindcss/vite"


export default defineConfig({
  plugins: [react(), tailwincdss()],
});
