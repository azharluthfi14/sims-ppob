import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { tokenStorage } from '@/utils/storage';

import { authApi } from './auth-api';
import type { User } from './auth-schema';

type AuthState = {
  token: string | null;
  user?: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
};

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isInitialized: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    restoreAuth: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.token = payload.data.token;
        state.isInitialized = true;
        tokenStorage.set(payload.data.token);
      })
      .addMatcher(authApi.endpoints.getProfile.matchFulfilled, (state, { payload }) => {
        state.user = payload;
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addMatcher(authApi.endpoints.getProfile.matchRejected, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
        state.isInitialized = true;
        tokenStorage.remove();
      });
  },
});

export const {
  reducer: authReducer,
  actions: { setAuthToken, logoutUser, restoreAuth, setInitialized },
} = authSlice;
