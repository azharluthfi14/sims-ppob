import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Check } from 'lucide-react';

import { Button } from '@/components/ui';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  amount?: number;
  onConfirm?: () => void;
  isLoading?: boolean;
  title: string;
  confirmLabel?: string;
}

export const ModalSuccess = ({ isOpen, amount, onClose, title }: Props) => {
  return (
    <Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none" onClose={onClose}>
      <DialogBackdrop className="fixed inset-0 bg-black/40" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-xs flex-col rounded-xl bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
            <div className="mb-5 flex items-center justify-center">
              <div className="grid size-12 place-content-center rounded-full bg-emerald-500">
                <Check className="text-white" />
              </div>
            </div>
            <div className="text-center">
              <h2>{title}</h2>
              <h1 className="text-2xl font-bold">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  maximumFractionDigits: 0,
                }).format(amount!)}{' '}
              </h1>
              <p>berhasil!</p>
            </div>
            <div className="mt-4 space-y-2">
              <Button
                variant="ghost"
                onClick={onClose}
                className="w-full cursor-pointer text-red-500">
                Kembali ke Beranda
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
