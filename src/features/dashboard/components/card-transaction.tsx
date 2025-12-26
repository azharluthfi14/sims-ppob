import 'dayjs/locale/id';

import dayjs from 'dayjs';

dayjs.locale('id');
import { cn } from '@/utils/cn';

interface Props {
  amount: number;
  type: string;
  createdAt: string;
  description: string;
}

export const CardTransaction = ({ amount, createdAt, type, description }: Props) => {
  const isTopUp = type === 'TOPUP';

  return (
    <div className="rounded border border-gray-200 px-5 py-3">
      <div className="flex items-center justify-between">
        <h1
          className={cn('text-xl font-semibold', isTopUp ? 'text-emerald-500' : 'text-orange-500')}>
          {isTopUp ? '+' : '-'}{' '}
          {new Intl.NumberFormat('id-ID', {
            currency: 'IDR',
            style: 'currency',
            maximumFractionDigits: 0,
          }).format(amount)}
        </h1>
        <h2 className="text-sm text-gray-400">{description}</h2>
      </div>
      <div className="text-xs text-gray-300">
        {dayjs(createdAt).format('DD MMMM YYYY HH:mm')} WIB
      </div>
    </div>
  );
};
