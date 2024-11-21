import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import process from "node:process";

export default defineConfig(({ mode }) => {
  // Load environment variables for the current mode (e.g., development or production)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      federation({
        name: "host-app",
        remotes: {
          users: `${env.VITE_USERS_REMOTE_URL}/assets/remoteEntry.js`,
          products: `${env.VITE_PRODUCTS_REMOTE_URL}/assets/remoteEntry.js`,
        },
        shared: ["react"],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
  };
});
