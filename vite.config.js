// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 关键配置：指向完整版 Vue
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  }
})