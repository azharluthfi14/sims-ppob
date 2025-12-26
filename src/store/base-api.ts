import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { RootState } from '@/store';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const publicAPI = ['login', 'registration', 'banner'];

      if (publicAPI.includes(endpoint)) {
        return headers;
      }

      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['profile', 'banner', 'services', 'balance', 'history'],
  endpoints: () => ({}),
});
