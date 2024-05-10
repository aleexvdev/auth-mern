import { Navigate } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { SignInPage } from "../pages/auth/SignInPage";
import { SignUpPage } from "../pages/auth/SignUpPage";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { ErrorPage } from "../pages/error/ErrorPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { Root } from "./Root";

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
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: '*',
        element: <Navigate to="/" />
      },
    ]
  }
];

export const router = createBrowserRouter(routerConfig);