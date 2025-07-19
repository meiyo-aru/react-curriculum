import React from 'react'; // Importa a biblioteca React
import ReactDOM from 'react-dom/client'; // Importa o ReactDOM para interagir com o DOM
import App from './App.tsx'; // Importa o componente principal da sua aplicação
import './static/scss/main.scss'; // Importa estilos globais

// Cria uma "raiz" para a aplicação React no elemento com id 'root' no HTML
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Renderiza o componente App dentro do StrictMode */}
    <App />
  </React.StrictMode>,
);