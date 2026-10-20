import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this project under /portfolio; keep Vite's dev server at /.
  base: command === 'build' ? '/portfolio/' : '/',
}))
