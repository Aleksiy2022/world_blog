import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider } from 'react-redux'
import {BrowserRouter, Route, Routes} from 'react-router'
import App from "./components/app/App.jsx";
import { store } from './redux/store.js'
import './assets/styles/common.modules.scss'

const root = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);