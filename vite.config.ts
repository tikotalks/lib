import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: resolve(__dirname, './tsconfig.app.json'),
      include: ['lib/**/*.ts', 'lib/**/*.vue'],
      outDir: 'dist',
      staticImport: true,
      insertTypesEntry: true,
      rollupTypes: false,
      copyDtsFiles: true,
      aliasesExclude: ['vue'],
      compilerOptions: {
        skipLibCheck: true
      }
    })
  ],

  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'TikoLib',
      formats: ['es', 'umd'],
      fileName: (format) => `tiko-lib.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'open-icon', 'bemm'],
      output: {
        globals: {
          vue: 'Vue',
          'bemm': 'bemm',
          'open-icon': 'OpenIcon'
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, './lib')
    }
  }
})
