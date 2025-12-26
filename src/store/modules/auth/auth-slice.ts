import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { authApi } from './auth-api';
import type { User } from './auth-schema';

type AuthState = {
  token: string | null;
  user?: User | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  token: localStorage.getItem('token') || null,
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    authCheck: (state) => {
      if (state.token) {
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.token = payload.data.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', payload.data.token);
      })
      .addMatcher(authApi.endpoints.getProfile.matchFulfilled, (state, { payload }) => {
        state.user = payload;
      });
  },
});

export const {
  reducer: authReducer,
  actions: { setAuthToken, logoutUser, authCheck },
} = authSlice;
