import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router'

import App from './components/app/App.jsx'
import { store } from './redux/store.js'
import './assets/styles/common.modules.scss'
import '@ant-design/v5-patch-for-react-19'

const root = document.getElementById('root')

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>
)
