import { Navigate } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { SignInPage } from "../pages/auth/SignInPage";
import { SignUpPage } from "../pages/auth/SignUpPage";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { ErrorPage } from "../pages/error/ErrorPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicLayout } from "../layout/PublicLayout";
import { PrivateLayout } from "../layout/PrivateLayout";
import { AllUsers } from "../pages/dashboard/AllUsers";

const routerConfig = [
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: '/', element: <App /> },
      { path: '/sign-in', element: <SignInPage /> },
      { path: '/sign-up', element: <SignUpPage /> },
      { path: '*', element: <Navigate to={"/"} /> }
    ]
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><PrivateLayout /></ProtectedRoute>,
    children: [
      { index: true, path: '/dashboard', element: <DashboardPage /> },
      { path: '*', element: <Navigate to={"/dashboard"} /> },
      { path: '/dashboard/users', element: <AllUsers /> }
    ]
  }
];

export const router = createBrowserRouter(routerConfig);