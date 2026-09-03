import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// Two builds out of one config: the library itself, and the styleguide page
// (`--mode styleguide`) that doubles as the dev playground.
export default defineConfig(({ mode }) => {
  const isStyleguide = mode === "styleguide";

  return {
    build: isStyleguide
      ? { outDir: "styleguide-dist" }
      : {
          cssCodeSplit: false,
          lib: {
            entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
            fileName: "bearded-ui",
            formats: ["es"],
          },
          rollupOptions: {
            external: ["vue", "@phosphor-icons/vue"],
            output: { assetFileNames: "bearded-ui.[ext]" },
          },
        },
    plugins: [vue(), ...(isStyleguide ? [] : [dts({ bundleTypes: true })])],
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
  };
});
