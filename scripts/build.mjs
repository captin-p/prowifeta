import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";

const rootDir = process.cwd();
const prerenderDir = path.join(rootDir, ".prerender");

await fs.rm(prerenderDir, { recursive: true, force: true });

await build({
  mode: "production",
});

await build({
  mode: "production",
  build: {
    ssr: "src/entry-server.jsx",
    outDir: ".prerender",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "entry-server.mjs",
      },
    },
  },
});

const serverEntryUrl = `${pathToFileURL(path.join(prerenderDir, "entry-server.mjs")).href}?t=${Date.now()}`;
const { prerender } = await import(serverEntryUrl);

await prerender();
await fs.rm(prerenderDir, { recursive: true, force: true });
