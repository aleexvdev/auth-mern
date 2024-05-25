import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "../pages/auth/SignInPage";
import { SignUpPage } from "../pages/auth/SignUpPage";
import { PublicLayout } from "../layout/public/PublicLayout";
import { App } from "../App";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { AllUsers } from "../pages/dashboard/AllUsers";
import { PrivateLayout } from "../layout/private/PrivateLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectAuth, verifyToken } from "../features/auth/authSlice";
import { UnknownAction } from "@reduxjs/toolkit";
import { RecoverPasswordPage } from "../pages/auth/RecoverPasswordPage";

const AppRoutes = () => {

  const { isAuthenticated } = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(verifyToken({ token }) as unknown as UnknownAction);
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" index element={<PublicLayout><App /></PublicLayout>} />
        <Route path="/sign-in" element={<PublicLayout><SignInPage /></PublicLayout>} />
        <Route path="/sign-up" element={<PublicLayout><SignUpPage /></PublicLayout>} />
        <Route path="/recover-password" element={<PublicLayout><RecoverPasswordPage /></PublicLayout>} />
        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <PrivateLayout>
                <DashboardPage />
              </PrivateLayout>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/users"
          element={
            isAuthenticated ? (
              <PrivateLayout>
                <AllUsers />
              </PrivateLayout>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;