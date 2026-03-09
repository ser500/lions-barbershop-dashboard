import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('/node_modules/')) return
          if (id.includes('apexcharts') || id.includes('vue3-apexcharts')) return 'chunk-charts'
          if (id.includes('@supabase/')) return 'chunk-supabase'
          if (id.includes('gsap') || id.includes('swiper')) return 'chunk-motion'
          if (id.includes('dayjs')) return 'chunk-dayjs'
          if (id.includes('@vueuse/')) return 'chunk-vueuse'
          if (id.includes('vue-router') || id.includes('pinia')) return 'chunk-vue-ecosystem'
          if (id.includes('/vue/') || id.includes('/vue@') || id.includes('@vue/')) return 'chunk-vue'
          return 'chunk-vendor'
        },
      },
    },
  },
})
