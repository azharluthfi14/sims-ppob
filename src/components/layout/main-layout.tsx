import { Outlet } from 'react-router-dom';

import { PanelBalance } from '@/features/dashboard/components';
import { useGetBalanceQuery } from '@/store/modules';
import { useGetProfileQuery } from '@/store/modules/auth';

import { Navbar } from './navbar';

export const MainLayout = () => {
  const { data: user } = useGetProfileQuery();
  const { data: balanceUser } = useGetBalanceQuery({});

  return (
    <div>
      <Navbar />
      <div className="space-y-10 py-12">
        <div className="layout flex items-center justify-between">
          <div className="space-y-4">
            <img
              src={user?.profile_image}
              alt="profile-image"
              loading="lazy"
              className="size-20 rounded-full"
            />
            <div className="space-y-1">
              <h3 className="text-xl">Selamat datang,</h3>
              <h1 className="text-3xl font-semibold">{user?.first_name + ' ' + user?.last_name}</h1>
            </div>
          </div>
          <PanelBalance amountBalance={balanceUser} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
