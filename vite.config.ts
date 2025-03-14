import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3333,
  },
  plugins: [tailwindcss(), react()],
});
