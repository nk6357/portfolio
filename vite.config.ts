import { defineConfig } from 'vite';
import { resolve } from 'node:path';

function normalizeBase(value: string | undefined): string {
  if (!value) return '/';
  const trimmed = value.trim();
  if (trimmed === '' || trimmed === '/') return '/';
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`;
}

export default defineConfig({
  base: normalizeBase(process.env.VITE_BASE_PATH),
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy/index.html'),
        cookies: resolve(import.meta.dirname, 'cookies/index.html'),
        legal: resolve(import.meta.dirname, 'legal/index.html')
      }
    }
  }
});
