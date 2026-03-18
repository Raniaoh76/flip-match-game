import { defineConfig } from 'vite'
import react from '@vitejs/react-vite'

export default defineConfig({
  plugins: [react()],
  base: '/flip-match-game/', // This must match your GitHub repo name!
})
