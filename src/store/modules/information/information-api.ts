import { baseApi } from '@/store/base-api';

export const informationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanner: builder.query({
      query: () => ({
        url: '/banner',
        method: 'GET',
      }),
      providesTags: ['banner'],
      transformResponse: (response) => response.data,
    }),
    getServices: builder.query({
      query: () => ({
        url: '/services',
        method: 'GET',
      }),
      providesTags: ['services'],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetBannerQuery, useGetServicesQuery } = informationApi;
