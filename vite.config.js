import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  esbuild: {
    target: "es2020",
  },
  optimizeDeps: {
    include: ["ol", "rlayers"],
  },
});
