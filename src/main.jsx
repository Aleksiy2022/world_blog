import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import App from "./components/app/App.jsx";
import './assets/styles/common.modules.scss'

const root = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      {/*<Provider srore={}>*/}
        <App />
      {/*</Provider>*/}
    </BrowserRouter>
  </StrictMode>
);