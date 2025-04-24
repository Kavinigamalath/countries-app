import { defineConfig } from 'vite'              // Utility to define and type-check Vite configuration
import react from '@vitejs/plugin-react'         // Official Vite plugin for React support (JSX, Fast Refresh, etc.)

// https://vite.dev/config/                        // Link to the Vite config reference documentation
export default defineConfig({
  plugins: [
    react()                                       // Enables React plugin: handles JSX transform and React Fast Refresh during development
  ],
})