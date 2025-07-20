import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173, // Uma porta padrão para desenvolvimento local
    strictPort: true,
  },
  preview: { // Configurações para 'npm run preview'
    host: '0.0.0.0',
    port: 4173, // Uma porta padrão para preview local, o Render vai sobrescrever com --port $PORT
    strictPort: true,
    allowedHosts: [
      'react-curriculum-render-api.onrender.com',
      // Outros hosts permitidos
    ],
  },
  css: {
    modules: {
      // Isso garante que os nomes de classe no objeto 'styles'
      // sejam convertidos de kebab-case para camelCase
      localsConvention: 'camelCase',
      // Opcional: para permitir classes globais se misturadas
      // globalModulePaths: [],
    },
  },
});