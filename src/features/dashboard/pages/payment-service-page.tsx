import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { IconBanknote } from '@/components/icons';
import { Button, Input } from '@/components/ui';
import type { RootState } from '@/store';
import type { Service } from '@/store/modules';
import { setService, useGetServicesQuery, useTransactionMutation } from '@/store/modules';
import { cn } from '@/utils/cn';
import { formatRupiah } from '@/utils/format';

import { ModalConfirm, ModalFailed, ModalSuccess } from '../components';

export default function PaymentServicePage() {
  const dispatch = useDispatch();
  const { serviceCode } = useParams();
  const { data: services } = useGetServicesQuery({});
  const selectedService = useSelector((state: RootState) => state.transaction.service);
  const navigate = useNavigate();
  const [payment, { isLoading }] = useTransactionMutation();

  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [openModalFailed, setOpenModalFailed] = useState(false);

  const handleConfirmPayment = () => {
    setOpenModalConfirm(true);
  };

  const handlePayTransaction = async () => {
    try {
      await payment({
        service_code: selectedService && selectedService.code,
      }).unwrap();
      setOpenModalConfirm(false);
      setOpenModalSuccess(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setOpenModalFailed(true);
      setOpenModalConfirm(false);
      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    if (!selectedService && serviceCode) {
      const fallback = services?.find((s: Service) => s.service_code.toLowerCase() === serviceCode);

      if (fallback) {
        dispatch(
          setService({
            code: fallback.service_code,
            name: fallback.service_name,
            tarif: fallback.service_tariff,
            icon: fallback.service_icon,
          })
        );
      }
    }
  }, [dispatch, selectedService, serviceCode, services]);

  return (
    <>
      <div className="layout space-y-6">
        <div className="space-y-5">
          <h2>Pembayaran</h2>
          <div className="flex items-center gap-x-3">
            <img
              src={selectedService?.icon}
              alt="icon-service"
              loading="lazy"
              className="size-10"
            />
            <h3 className="font-semibold">{selectedService?.name}</h3>
          </div>
        </div>
        <div className="space-y-5">
          <div className="relative">
            <Input
              type="text"
              placeholder="0"
              className={cn('h-10 rounded border-gray-300 ps-10')}
              value={selectedService ? formatRupiah(selectedService?.tarif.toString()) : 0}
              readOnly
            />
            <div
              className={cn(
                'pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50'
              )}>
              <IconBanknote className={cn('size-4 text-gray-400')} />
            </div>
          </div>
          <Button
            isLoading={isLoading}
            onClick={handleConfirmPayment}
            className="w-full cursor-pointer select-none"
            size="lg">
            Bayar
          </Button>
        </div>
      </div>

      <ModalConfirm
        isOpen={openModalConfirm}
        onClose={() => setOpenModalConfirm(false)}
        amount={selectedService?.tarif}
        title={`Beli ${selectedService?.name} senilai`}
        onConfirm={handlePayTransaction}
        isLoading={isLoading}
      />

      <ModalSuccess
        isOpen={openModalSuccess}
        amount={selectedService?.tarif}
        title={`Pembayaran ${selectedService?.name} sebesar`}
        onClose={() => navigate('/')}
      />

      <ModalFailed
        isOpen={openModalFailed}
        onClose={() => navigate('/')}
        title={`Pembayaran ${selectedService?.name} sebesar`}
        amount={selectedService?.tarif}
      />
    </>
  );
}
