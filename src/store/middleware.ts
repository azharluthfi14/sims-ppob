import type { Middleware } from '@reduxjs/toolkit';

import { tokenStorage } from '@/utils/storage';

import { logoutUser, setAuthToken } from './modules';

export const authMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  if (setAuthToken.match(action)) {
    tokenStorage.set(action.payload.token);
  }

  if (logoutUser.match(action)) {
    tokenStorage.remove();
  }

  return result;
};
