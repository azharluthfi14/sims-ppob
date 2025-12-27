import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from './base-api';
import { authMiddleware } from './middleware';
import { authReducer } from './modules/auth';
import { transactionReducer } from './modules/transactions';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    transaction: transactionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
