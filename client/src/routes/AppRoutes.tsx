import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "../pages/auth/SignInPage";
import { SignUpPage } from "../pages/auth/SignUpPage";
import { PublicLayout } from "../layout/public/PublicLayout";
import { App } from "../App";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { AllUsers } from "../pages/dashboard/AllUsers";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" index element={<PublicLayout><App /></PublicLayout>} />
        <Route path="sign-in" element={<PublicLayout><SignInPage /></PublicLayout>} />
        <Route path="sign-up" element={<PublicLayout><SignUpPage /></PublicLayout>} />
        <Route path="*" element={<Navigate to="/" />} />
        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="dashboard" index element={<DashboardPage />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="*" element={<Navigate to="dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
