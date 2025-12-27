import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import type { RootState } from '@/store';

export const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
