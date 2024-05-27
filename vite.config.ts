import { defineConfig } from 'vite'
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `client.js`
      }
    }
  }
})