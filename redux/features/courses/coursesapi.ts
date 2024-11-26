
import { apiSlice } from "../apislice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CreateCourse: builder.mutation({
      query: (data) => ({
        url: "course/create-course",
        method: "POST",
        body: data, // Remove the array wrapper
        credentials: "include" as const, // Keep this if you're using cookies
      }),
    }),
    addQuestion: builder.mutation({
      query: (data) => ({
          url: "course/add-question",
          method: "PUT",
          body: data,
          credentials: "include" as const, // Keep this if you're using cookies
      }),
  }),
  addReview: builder.mutation({
    query: ( data) => ({
        url: `course/add-review/${data.courseId}`, // Use the correct `courseId`
        method: "PUT",
        body: data, // Contains `review` and `rating`
        credentials: "include", // Include cookies if authentication is required
    }),
}),



ReplyReview: builder.mutation({
    query: ({ id, ...data }: { id: string; reply: string }) => ({
        url: `course/add-replied/${id}`, // Interpolate `id` into the URL
        method: "PUT",
        body: data,
        credentials: "include", // Include cookies if needed
    }),
}),

  addReply: builder.mutation({
      query: (data) => ({
          url: "course/replies-answer",
          method: "PUT",
          body: data,
          credentials: "include" as const, // Keep this if you're using cookies
      }),
  }),
    getAllCourses: builder.query({
      query: () => ({
        url: "course/all-courses",
        method: "GET",
        credentials: "include" as const, // Keep this if you're using cookies
      }),
    }),
    //deletecourses
    DeleteCourse: builder.mutation({
      query: ({id}) => ({
        url: `course/delete/${id}`,
        method: "DELETE",
        credentials: "include" as const, // Keep this if you're using cookies
      }),
    }),
    //updatecourse
    UpdateCourse: builder.mutation({
      query: ({id, data}) => ({
        url: `course/edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const, // Keep this if you're using cookies
      }),
    }),
    GetSingleCourses:builder.query({
      query: (id) => ({
        url: `course/single-course/${id}`,
        method: "GET",
        credentials: "include" as const, // Keep this if you're using cookies
      }),
    }),
    GetSingleCoursesContent:builder.query({
      query: (id) => ({
        url: `course/single-courses-content/${id}`,
        method: "GET",
        credentials: "include" as const, // Keep this if you're using cookies
      }),
    }),
    GetUserAllCourses:builder.query({
      query:()=>({
        url:`course/all-courses`,
        method:"GET",
        credentials: "include" as const, // Keep this if you're using cookies
    
      }),
    }),
    CreateOrderbyuser:builder.mutation({
      query:(data)=>({
        url:`course/getcoursesAccess/${data.coursesID}`,
        method:"POST",
        body:data,
        credentials: "include" as const, // Keep this if you're using cookies
      })
    })

  }),
});

export const { useCreateCourseMutation,useAddReviewMutation, useGetAllCoursesQuery,useDeleteCourseMutation,useUpdateCourseMutation,useGetSingleCoursesQuery,useGetUserAllCoursesQuery,useGetSingleCoursesContentQuery,useAddQuestionMutation,useAddReplyMutation ,useCreateOrderbyuserMutation} = courseApi;
