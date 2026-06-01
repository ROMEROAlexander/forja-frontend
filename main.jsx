import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

/**
 * PUNTO DE ENTRADA PRINCIPAL ('main.jsx')
 * Propósito: Inicializar el árbol de componentes de React, montar la SPA 
 * e inyectar los estilos globales ("Hierro y Piedra").
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
