import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(rootDir, 'index.html'),
        produtos: resolve(rootDir, 'produtos.html'),
        contatos: resolve(rootDir, 'contatos.html'),
      },
    },
  },
});
