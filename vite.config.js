import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    host: 'localhost',
    port: 3000,
    open: true, // Открывать браузер при запуске
  },
  build: {
    outDir: 'dist', // Папка для сборки
    minify: 'terser', // Использовать Terser для минификации
    terserOptions: {
      compress: {
        drop_console: true, // Удалить console.log в продакшене
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Разделить зависимости в отдельный файл
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src', // Удобный алиас для импорта из папки src
    },
  },
});
