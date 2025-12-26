import { baseApi } from '@/store/base-api';

import type {
  LoginForm,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  UpdateAvatarPayload,
  UpdateProfileUserPayload,
  User,
} from './auth-schema';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginForm>({
      query: (form) => ({
        url: '/login',
        method: 'POST',
        body: form,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterPayload>({
      query: (form) => ({
        url: '/registration',
        method: 'POST',
        body: form,
      }),
    }),
    getProfile: builder.query<User, void>({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
      providesTags: ['profile'],
      transformResponse: (response: { data: User }) => response.data,
    }),
    updateAvatarProfile: builder.mutation<User, UpdateAvatarPayload>({
      query: (fileImage) => ({
        url: '/profile/image',
        method: 'PUT',
        body: fileImage,
      }),
      invalidatesTags: ['profile'],
    }),
    updateProfileData: builder.mutation<User, UpdateProfileUserPayload>({
      query: (value) => ({
        url: '/profile/update',
        method: 'PUT',
        body: value,
      }),
      invalidatesTags: ['profile'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateAvatarProfileMutation,
  useUpdateProfileDataMutation,
} = authApi;
