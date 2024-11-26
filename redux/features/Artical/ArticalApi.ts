import { apiSlice } from "../apislice";


export const ArticalApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        CreateArtical:builder.mutation({
            query:(data)=>({
                url: "artical/create-artical",
                method: "POST",
                body: data, // Remove the array wrapper
                credentials: "include" as const, 
            })
        }),
        //updateArtical 
        UpdateArtical: builder.mutation({
            query: ({ id, data }) => ({
              url: `artical/update/${id}`,
              method: "PUT",
              body: data, // Ensure `data` is passed here for the request payload
              credentials: "include", // This ensures cookies are sent with the request
            }),
          }),
          
        //GeTALLArtical 
        GetAllArtical:builder.query({
            query:()=>({
                url:'artical/get-all-artical',
                method:'GET',
                credentials:"include" as const,
            }),
        }),
   
        GetSingleArtical:builder.query({
            query:(id)=>({
                url:`artical/get-artical/${id}`,
                method:'GET',
                credentials:"include" as const
            }),
        }),
        DeleteArtical:builder.mutation({
            query:(id)=>({
                url:`artical/delete-artical/${id}`,
                method:'DELETE',
                credentials:"include" as const

            })
        })
        
    })
})


export const {useCreateArticalMutation,useDeleteArticalMutation,useGetAllArticalQuery,useGetSingleArticalQuery,useUpdateArticalMutation} =ArticalApi