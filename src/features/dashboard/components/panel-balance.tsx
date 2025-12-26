import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui';

interface Props {
  amountBalance: string;
}

export const PanelBalance = ({ amountBalance }: Props) => {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="relative h-full w-full max-w-xl overflow-clip rounded-2xl px-4 py-6">
      <img
        src="/images/bg-balance.png"
        alt=""
        className="absolute inset-0 h-full w-full scale-[148%] object-fill"
      />

      <div className="relative space-y-4">
        <h1 className="text-white">Saldo anda</h1>
        <h1 className="text-4xl font-semibold text-white">
          {showBalance ? (
            new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            }).format(+amountBalance)
          ) : (
            <span>••••••••••</span>
          )}
        </h1>
        <div className="flex items-center text-sm text-white">
          <span> Lihat saldo</span>
          <Button
            onClick={() => setShowBalance(!showBalance)}
            variant="ghost"
            size="icon"
            className="cursor-pointer">
            {showBalance ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
