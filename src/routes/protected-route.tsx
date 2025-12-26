import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import type { RootState } from '@/store';
import { useGetProfileQuery } from '@/store/modules/auth';

export const ProtectedRoute = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const { isLoading, isError } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!token || isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
