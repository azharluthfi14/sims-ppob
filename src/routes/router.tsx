import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

import { AuthLayout } from '@/components/layout/auth-layout';
import { MainLayout } from '@/components/layout/main-layout';
import { LoginPage, RegisterPage } from '@/features/auth';
import {
  DashboardPage,
  HistoryTransactionPage,
  PaymentServicePage,
  TopupPage,
} from '@/features/dashboard';
import { ProfilePage } from '@/features/profile';
import { cn } from '@/utils/cn';

import { ProtectedRoute } from './protected-route';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
          },
        }}
      />
    </BrowserRouter>
  );
}
