import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { App } from "./App"; // Ajuste aqui: Importação nomeada, precisa usar chaves {}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
