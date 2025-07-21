<<<<<<< Updated upstream
import React from 'react'; // Importa a biblioteca React
import ReactDOM from 'react-dom/client'; // Importa o ReactDOM para interagir com o DOM
import App from './App.tsx'; // Importa o componente principal da sua aplicação
import './static/scss/main.scss'; // Importa estilos globais

// Cria uma "raiz" para a aplicação React no elemento com id 'root' no HTML
ReactDOM.createRoot(document.getElementById('root')!).render(
=======
import React from "react"; 
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./static/scss/main.scss";

import { store } from "./store.ts"
import { Provider } from "react-redux";

// Creates a "root" for the React application on the element with id "root" in the HTML
ReactDOM.createRoot(document.getElementById("root")!).render(
>>>>>>> Stashed changes
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);