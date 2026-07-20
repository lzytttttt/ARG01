import { defineConfig } from 'vite';

// 轻量构建：零运行时依赖。?raw 为 Vite 内置能力，无需额外插件。
export default defineConfig({
  base: './',
  server: { open: true },
  build: { target: 'es2018' }
});
