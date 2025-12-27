import { zodResolver } from '@hookform/resolvers/zod';
import { Banknote } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from '@/components/ui';
import { type TopUpAmountFormInput, topUpSchema, useTopUpMutation } from '@/store/modules';
import { cn } from '@/utils/cn';
import { formatRupiah, unformatRupiah } from '@/utils/format';

import { ModalConfirm } from '../components/modal-confirm';
import { ModalFailed } from '../components/modal-failed';
import { ModalSuccess } from '../components/modal-success';

const AMOUNT_BUTTONS = [
  { id: 1, value: 10000 },
  { id: 2, value: 20000 },
  { id: 3, value: 50000 },
  { id: 4, value: 100000 },
  { id: 5, value: 250000 },
  { id: 6, value: 500000 },
];

export const TopupPage = () => {
  const [topUp, { isLoading }] = useTopUpMutation();
  const navigate = useNavigate();

  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [openModalFailed, setOpenModalFailed] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  const {
    control,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<TopUpAmountFormInput>({
    resolver: zodResolver(topUpSchema),
    mode: 'onChange',
    defaultValues: {
      top_up_amount: '',
    },
  });

  const watchAmount = watch('top_up_amount');

  const handleClickAmountPreset = (value: number) => {
    setValue('top_up_amount', String(value), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleConfirmTopUp = () => {
    setOpenModalConfirm(true);
  };

  const handleSubmitTopUp = async () => {
    try {
      await topUp({
        top_up_amount: getValues('top_up_amount'),
      }).unwrap();
      setOpenModalConfirm(false);
      setOpenModalSuccess(true);
    } catch {
      setOpenModalConfirm(false);
      setOpenModalSuccess(false);
      setOpenModalFailed(true);
    }
  };

  const isInValid = !!errors.top_up_amount || !watchAmount || Number(watchAmount) <= 0;

  return (
    <>
      <div className="layout space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg">Silahkan masukan</h2>
          <h1 className="text-2xl font-semibold">Nominal Top Up</h1>
        </div>

        <div className="flex flex-col items-stretch gap-x-4 gap-y-10 lg:flex-row lg:gap-y-0">
          <div className="order-2 w-full lg:order-1 lg:w-7/12">
            <div className="h-16">
              <div className="relative">
                <Controller
                  name="top_up_amount"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="0"
                      value={formatRupiah(field.value || '')}
                      onChange={(event) => {
                        const rawAmount = unformatRupiah(event.target.value);
                        field.onChange(rawAmount);
                      }}
                      className={cn(
                        'h-10 rounded ps-12',
                        errors.top_up_amount ? 'border-red-500' : 'border-gray-300'
                      )}
                    />
                  )}
                />
                <div
                  className={cn(
                    'pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50'
                  )}>
                  <Banknote className={cn('size-6 text-gray-400')} />
                </div>
              </div>
              {errors.top_up_amount && (
                <span className="text-xs text-red-500">{errors.top_up_amount.message}</span>
              )}
            </div>
            <Button
              disabled={isInValid}
              onClick={handleConfirmTopUp}
              className="mt-2 w-full cursor-pointer select-none"
              size="lg">
              {isInValid ? 'Top Up' : 'Bayar'}
            </Button>
          </div>
          <div className="order-1 grid w-full grid-cols-3 gap-3 lg:order-2 lg:w-5/12">
            {AMOUNT_BUTTONS.map((amount) => (
              <Button
                onClick={() => handleClickAmountPreset(amount.value)}
                key={amount.id}
                size="lg"
                className="cursor-pointer"
                variant="outline">
                {new Intl.NumberFormat('id-ID', {
                  currency: 'IDR',
                  style: 'currency',
                  minimumFractionDigits: 0,
                }).format(amount.value)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <ModalConfirm
        isOpen={openModalConfirm}
        amount={+getValues('top_up_amount')}
        onClose={() => setOpenModalConfirm(false)}
        title={'Anda yakin untuk Top Up sebesar'}
        confirmLabel={'Ya, lanjutkan Top Up'}
        onConfirm={handleSubmitTopUp}
        isLoading={isLoading}
      />

      <ModalSuccess
        isOpen={openModalSuccess}
        amount={+getValues('top_up_amount')}
        onClose={() => {
          navigate('/');
          reset();
        }}
        title="Top Up sebesar"
      />

      <ModalFailed
        isOpen={openModalFailed}
        amount={+getValues('top_up_amount')}
        onClose={() => {
          navigate('/');
          reset();
        }}
        title="Top Up sebesar"
      />
    </>
  );
};
