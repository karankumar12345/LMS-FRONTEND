import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLogin } from './auth/authSlice';

// Helper function to retrieve the token from localStorage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("accessToken");
};

// Helper function to save tokens to localStorage
const saveTokensToLocalStorage = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

// Helper function to remove tokens from localStorage
const removeTokensFromLocalStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'https://backendlearn-g3wj.onrender.com/api/v1/',
    credentials: 'include', // Required for cookies, keep for now in case cookies are used as a fallback
    prepareHeaders: (headers) => {
      const token = getTokenFromLocalStorage();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (builder) => ({
    // Endpoint for refreshing the token
    refreshToken: builder.query({
      query: () => ({
        url: 'user/refreshToken',
        method: 'GET',
        credentials: 'include', // Required for cookies (if using refresh token in cookies)
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // Save the new access token and refresh token in localStorage
          saveTokensToLocalStorage(result.data.accessToken, result.data.refreshToken);
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      },
    }),

    // Load user details
    LoadUser: builder.query({
      query: () => ({
        url: 'user/me',
        method: 'GET',
        credentials: 'include',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // Save user data and token in localStorage
          saveTokensToLocalStorage(result.data.token, result.data.refreshToken);
          dispatch(
            userLogin({
              token: result.data.token,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.error("Error loading user:", error);
        }
      },
    }),
  }), // You can extend endpoints here or in other slices
});

// Export hooks for the queries you created
export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;

// Optionally, add a logout function to clear tokens from localStorage
export const logout = () => {
  removeTokensFromLocalStorage();
};
