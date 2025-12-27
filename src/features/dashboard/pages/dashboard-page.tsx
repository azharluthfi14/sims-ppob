import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import type { Service } from '@/store/modules';
import { setService, useGetBannerQuery, useGetServicesQuery } from '@/store/modules';

import { ListMenu, ListPromo } from '../components';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: banner, isLoading: loadingBanner } = useGetBannerQuery({});
  const { data: services, isLoading: loadingService } = useGetServicesQuery({});

  const handleClickService = (service: Service) => {
    navigate(`/service/${service.service_code.toLowerCase()}`);
    dispatch(
      setService({
        code: service.service_code,
        name: service.service_name,
        tarif: service.service_tariff,
        icon: service.service_icon,
      })
    );
  };

  return (
    <>
      <ListMenu services={services} isLoading={loadingService} handleClick={handleClickService} />
      <ListPromo banners={banner} isLoading={loadingBanner} />
    </>
  );
};
