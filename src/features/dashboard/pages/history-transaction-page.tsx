import { IconDocs, IconLoader } from '@/components/icons';
import { Button } from '@/components/ui';
import { useGetHistoryTransactionInfiniteQuery } from '@/store/modules';

import { CardTransaction } from '../components';

const LIMIT = 5;

export default function HistoryTransactionPage() {
  const {
    data: history,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetHistoryTransactionInfiniteQuery({
    limit: LIMIT,
  });

  const transactions = history?.pages.flatMap((item) => item.data.records) ?? [];
  return (
    <div className="layout">
      <h1 className="mb-6 text-xl font-semibold">Semua Transaksi</h1>
      <div className="space-y-3">
        {isLoading ? (
          <div className="flex h-60 flex-col items-center justify-center">
            <IconLoader className="text-danger mb-4 size-10 animate-spin" />
            <div className="text-gray-400">Loading...</div>
          </div>
        ) : transactions.length <= 0 ? (
          <div className="flex h-60 flex-col items-center justify-center space-y-3">
            <IconDocs className="size-10 text-gray-400" />
            <div className="text-gray-400">Tidak ada transaksi</div>
          </div>
        ) : (
          transactions?.map((transaction) => (
            <CardTransaction
              key={transaction.invoice_number}
              amount={transaction.total_amount}
              type={transaction.transaction_type}
              description={transaction.description}
              createdAt={transaction.created_on}
            />
          ))
        )}

        <div className="flex items-center justify-center">
          {hasNextPage && (
            <Button
              variant="link"
              className="cursor-pointer"
              onClick={() => fetchNextPage()}
              isLoading={isFetchingNextPage}>
              View More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
