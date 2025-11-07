import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // If you deploy to GitHub Pages under a repo, set base='/your-repo-name/'
  // base: '/react-calendar-pro/',
})
