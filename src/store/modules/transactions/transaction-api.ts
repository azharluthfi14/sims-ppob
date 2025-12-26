import type { ApiResponse } from '@/store';
import { baseApi } from '@/store/base-api';

import type {
  PaymentTransactionPayload,
  TopUpAmountPayload,
  Transaction,
} from './transaction-schema';

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBalance: builder.query({
      query: () => ({
        url: '/balance',
        method: 'GET',
      }),
      transformResponse: (response) => response.data.balance,
      providesTags: ['balance'],
    }),
    topUp: builder.mutation<void, TopUpAmountPayload>({
      query: (form) => ({
        url: '/topup',
        method: 'POST',
        body: {
          top_up_amount: Number(form.top_up_amount),
        },
      }),
      invalidatesTags: ['balance', 'history'],
    }),
    transaction: builder.mutation<void, PaymentTransactionPayload>({
      query: (form) => ({
        url: '/transaction',
        method: 'POST',
        body: {
          service_code: form.service_code,
        },
      }),
      invalidatesTags: ['balance', 'history'],
    }),
    getHistoryTransaction: builder.infiniteQuery<
      ApiResponse<{
        offset: string;
        limit: string;
        records: Transaction[];
      }>,
      { limit: number },
      number
    >({
      infiniteQueryOptions: {
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
          const offset = Number(lastPage.data?.offset);
          const limit = Number(lastPage.data?.limit);

          if (lastPage.data?.records?.length < limit) return undefined;
          return offset + limit;
        },
      },
      query: ({ pageParam = 0, queryArg }) => ({
        url: '/transaction/history',
        method: 'GET',
        params: {
          offset: pageParam,
          limit: queryArg.limit,
        },
      }),
      providesTags: ['history'],
    }),
  }),
});

export const {
  useGetBalanceQuery,
  useTopUpMutation,
  useTransactionMutation,
  useGetHistoryTransactionInfiniteQuery,
} = transactionApi;
