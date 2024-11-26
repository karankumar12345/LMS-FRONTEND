import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLogin } from './auth/authSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000/api/v1/',
    credentials: 'include',  // This will apply to all requests
  }),
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: 'user/refreshToken',
        method: 'GET',
        credentials: "include" as const,
      
      })
    }),
    LoadUser: builder.query({
      query: () => ({
        url: 'user/me',
        method: 'GET',
        credentials: "include" as const,
      
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogin({
              token: result.data.token,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),
  }), // You can extend endpoints here or in other slices
});
export const { useRefreshTokenQuery,useLoadUserQuery } = apiSlice;
