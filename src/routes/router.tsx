import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

import { AuthLayout } from '@/components/layout/auth-layout';
import { LoadingLayout } from '@/components/layout/loading';
import { MainLayout } from '@/components/layout/main-layout';
import { LoginPage, RegisterPage } from '@/features/auth';
import {
  DashboardPage,
  HistoryTransactionPage,
  PaymentServicePage,
  TopupPage,
} from '@/features/dashboard';
import { ProfilePage } from '@/features/profile';
import type { RootState } from '@/store';
import { restoreAuth, setInitialized, useGetProfileQuery } from '@/store/modules';
import { cn } from '@/utils/cn';
import { tokenStorage } from '@/utils/storage';

import { ProtectedRoute } from './protected-route';
import { PublicRoute } from './public-route';

export default function AppRouter() {
  const dispatch = useDispatch();
  const { isInitialized, token } = useSelector((state: RootState) => state.auth);

  const { isLoading } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    const storedToken = tokenStorage.get();

    if (storedToken) {
      dispatch(restoreAuth({ token: storedToken! }));
    } else {
      dispatch(setInitialized());
    }
  }, [dispatch]);

  if (!isInitialized || (token && isLoading)) {
    return <LoadingLayout />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/service/:serviceCode" element={<PaymentServicePage />} />
            <Route path="/topup" element={<TopupPage />} />
            <Route path="/history/transaction" element={<HistoryTransactionPage />} />
          </Route>
          <Route path="/akun" element={<ProfilePage />} />
        </Route>
      </Routes>
      <Toaster
        position="bottom-left"
        toastOptions={{
          classNames: {
            error: cn('bg-red-50! text-red-500! shadow-none! border-transparent!'),
            success: cn('bg-emerald-50! text-emerald-500! shadow-none! border-transparent!'),
          },
        }}
      />
    </BrowserRouter>
  );
}
