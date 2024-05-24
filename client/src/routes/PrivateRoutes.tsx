import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const PrivateRoutes = () => {

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();
  return !isAuthenticated && !localStorage.getItem('token') ? <Outlet /> : <Navigate to={"/sign-in"} state={{ from: location }} replace />;
};

export default PrivateRoutes;