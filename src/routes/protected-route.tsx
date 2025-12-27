import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectIsAuthenticated } from '@/store/modules';

export const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
