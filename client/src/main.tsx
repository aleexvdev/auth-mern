import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ErrorPage, Root } from './routes'
import './assets/index.css'
import { SignInPage } from './pages/SignInPage.tsx'
import { SignUpPage } from './pages/SignUpPage.tsx'

const routerConfig = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '/',
        element: <App />
      },
      {
        path: '/sign-in',
        element: <SignInPage />
      },
      {
        path: '/sign-up',
        element: <SignUpPage />
      }
    ]
  }
];

const router = createBrowserRouter(routerConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
