import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { Provider } from 'react-redux'
import store from './app/store.ts'
import AppRoutes from './routes/AppRoutes.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>,
)
