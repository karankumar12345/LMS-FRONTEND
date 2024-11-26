import { apiSlice } from "../apislice";
export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: () => ({
        url: "layout/alllayout",
        method: "GET",
      }),
  
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/user`,
        method: "PUT",
        body: user,
      }),
   
    }),
  }),
});