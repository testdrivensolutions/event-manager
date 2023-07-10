import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import sassDts from 'vite-plugin-sass-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    sassDts(),
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/EventManager.tsx',
      name: 'EventManager',
      fileName: (format) => `event-manager.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
