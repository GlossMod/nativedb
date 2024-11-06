import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { exec } from 'child_process'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'copy-index-to-404',
          closeBundle() {
            exec('cp dist/index.html dist/404.html', (err, stdout, stderr) => {
              if (err) {
                console.error(`Error copying index.html to 404.html: ${stderr}`);
              } else {
                console.log('index.html successfully copied to 404.html');
              }
            });
          }
        }
      ]
    }
  }
})
