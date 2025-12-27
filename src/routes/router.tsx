import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

import { AuthLayout, LoadingLayout, MainLayout } from '@/components/layout';
import {
  restoreAuth,
  selectIsInitialized,
  selectToken,
  setInitialized,
  useGetProfileQuery,
} from '@/store/modules';
import { cn } from '@/utils/cn';
import { tokenStorage } from '@/utils/storage';

import { ProtectedRoute } from './protected-route';
import { PublicRoute } from './public-route';

const LoginPage = lazy(() => import('@/features/auth/pages/login-page'));
const RegisterPage = lazy(() => import('@/features/auth/pages/register-page'));
const DashboardPage = lazy(() => import('@/features/dashboard/pages/dashboard-page'));
const PaymentServicePage = lazy(() => import('@/features/dashboard/pages/payment-service-page'));
const TopupPage = lazy(() => import('@/features/dashboard/pages/topup-page'));
const HistoryTransactionPage = lazy(
  () => import('@/features/dashboard/pages/history-transaction-page')
);
const ProfilePage = lazy(() => import('@/features/profile/pages/profile-page'));

export default function AppRouter() {
  const dispatch = useDispatch();
  const isInitialized = useSelector(selectIsInitialized);
  const token = useSelector(selectToken);

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
      <Suspense fallback={<LoadingLayout />}>
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
      </Suspense>
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
