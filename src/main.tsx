import React from "react"; 
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./static/scss/main.scss";

import { store } from "./store.ts"
import { Provider } from "react-redux";

// Creates a "root" for the React application on the element with id "root" in the HTML
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);