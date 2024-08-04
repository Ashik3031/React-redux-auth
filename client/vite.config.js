import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/signup': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/signin': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/updated': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/users':{
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
     '/edituser': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/delete': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/search': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },

    },
  },
});