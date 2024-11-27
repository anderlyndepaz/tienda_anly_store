import { defineConfig } from 'vite';  //para definir la configuración del proyecto
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],//te permite trabajar con archivos jsx
  server: {
    proxy: {   //define reglas para redirigir solicitudes a otras direcciones
      '/api': {
        target: 'http://localhost:3000', // puerto de mi backend 
        changeOrigin: true,
        secure: false, //para que vite verifique los certificados ssl
      },
    },
  },
});

