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
      <div className="space-y-10 py-6 lg:py-12">
        <div className="layout flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-row space-y-4 gap-x-4 lg:flex-col">
            <img
              src={
                user?.profile_image.includes('null') ? '/images/avatar.png' : user?.profile_image
              }
              alt="profile-image"
              loading="lazy"
              className="size-14 rounded-full lg:size-20"
            />
            <div className="space-y-1">
              <h3 className="text-lg lg:text-xl">Selamat datang,</h3>
              <h1 className="text-xl font-semibold capitalize lg:text-3xl">
                {user?.first_name + ' ' + user?.last_name}
              </h1>
            </div>
          </div>
          <PanelBalance amountBalance={balanceUser} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
