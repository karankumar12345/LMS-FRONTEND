import { apiSlice } from "../apislice";


export const InterviewApiApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        CreateInterviewApi:builder.mutation({
            query:(data)=>({
                url: "exper/add-interview",
                method: "POST",
                body: data, // Remove the array wrapper
                credentials: "include" as const, 
            })
        }),
        //updateInterviewApi 
        UpdateInterviewApi: builder.mutation({
            query: ({ id, data }) => ({
              url: `exper/update/${id}`,
              method: "PUT",
              body: data, // Ensure `data` is passed here for the request payload
              credentials: "include", // This ensures cookies are sent with the request
            }),
          }),
          
        //GeTALLInterviewApi 
        GetAllInterviewApi:builder.query({
            query:()=>({
                url:'exper/all-interviewexper',
                method:'GET',
                credentials:"include" as const,
            }),
        }),
   
        GetSingleInterviewApi:builder.query({
            query:(id)=>({
                url:`exper/interviewexper/${id}`,
                method:'GET',
                credentials:"include" as const
            }),
        }),
        DeleteInterviewApi:builder.mutation({
            query:(id)=>({
                url:`exper/deleteexper/${id}`,
                method:'DELETE',
                credentials:"include" as const

            })
        })
        
    })
})


export const {useCreateInterviewApiMutation,useDeleteInterviewApiMutation,useGetAllInterviewApiQuery,useGetSingleInterviewApiQuery,useUpdateInterviewApiMutation} =InterviewApiApi