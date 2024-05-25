import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const PrivateRoutes = () => {

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();
  if (!isAuthenticated) {
      return <Navigate to={"/sign-in"} state={{ from: location }} replace />
  }
  return <Outlet />;
};

export default PrivateRoutes;