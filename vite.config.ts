import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const frontendPort = parseInt(env.VITE_FRONTEND_PORT || "7000");
  const backendUrl = env.VITE_BACKEND_URL || "https://admin.starfoodbanquet.com/api";

  return {
    server: {
      host: "::",
      port: frontendPort,
      hmr: {
        overlay: false,
      },
      proxy: {
        "/api": {
          target: backendUrl,
          changeOrigin: true,
        },
      },
    },
    preview: {
      host: "::",
      port: frontendPort,
      allowedHosts: ["starfoodbanquet.com", "www.starfoodbanquet.com", "admin.starfoodbanquet.com", "www.admin.starfoodbanquet.com", "localhost"],
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
