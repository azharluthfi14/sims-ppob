import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type Service = {
  code: string;
  name: string;
  tarif: number;
  icon: string;
};

type TransactionState = {
  service: Service | null;
};

const initialState: TransactionState = {
  service: null,
};

export const transactionSlice = createSlice({
  name: 'transactionSlice',
  initialState,
  reducers: {
    setService: (state, action: PayloadAction<Service>) => {
      state.service = action.payload;
    },
  },
  extraReducers: () => {},
});

export const {
  reducer: transactionReducer,
  actions: { setService },
} = transactionSlice;
