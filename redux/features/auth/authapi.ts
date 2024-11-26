import { apiSlice } from "../apislice";
import { userLogin, userRegistration } from "./authSlice";

// Define the types for the responses
type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {
  name: string;
  email: string;
  password: string;
};
type UpdateUserData = {
  name: string;
  email: string;
  
};
type UpdateUserDataResponse = {
message: string;
  
};

type LoginData = {
  email: string;
  password: string;
};
type UpdatePassword = {
  oldPassword: string;
  newPassword: string;
};
type UpdatePasswordRes = {
  message: string;
};


// Define the response type for the login endpoint
type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    // Add any other fields you expect in the user object
  };
};


export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: 'user/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          console.error("Registration error:", error);
        }
      },
    }),

    activateUser: builder.mutation<void, { activation_token: string; activation_code: string }>({
      query: ({ activation_token, activation_code }) => ({
        url: 'user/activate-user',
        method: 'POST',
        body: { activation_token, activation_code },
      }),
    }),

    loginUser: builder.mutation<LoginResponse, LoginData>({
      query: ({ email, password }) => ({
        url: 'user/login',
        method: 'POST',
        body: { email, password },
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
    UpdateProfileUser: builder.mutation<UpdateUserDataResponse, UpdateUserData>({
      query: ({ email, name }) => ({
        url: 'user/updateuserinfo',
        method: 'PUT',
        body: { email, name },
      }),
     
    }),
  updateProfileAvatar: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('avatar', file);

        return {
          url: '/user/update/profilepic', // API endpoint
          method: 'PUT',
          body: formData,
        };
      },
    }),
  
    
    UpdatePasswordUser: builder.mutation<UpdatePasswordRes, UpdatePassword>({
      query: ({oldPassword,newPassword }) => ({
        url: 'user/password/update',
        method: 'PUT',
        body: {  oldPassword,newPassword},
      }),
     
    }),
    //alluser
    AllUser: builder.query({
      query: () => ({
        url: 'user/getalluser',
        method: 'GET',
        credentials: "include" as const,
      }),
    }),

    //update user role
    UpdateUserRole: builder.mutation({
      query: ({email, role }) => ({
        url: `user/updateuserrole`,
        method: 'PUT',
        body: {email, role },
      }),
    }),
    //handelDeleteuser
    DeleteUser: builder.mutation({
      query: ({id}) => ({
        url: `user/deleteuser/${id}`,
        method: 'DELETE',
        credentials: "include" as const,
      }),
    }),
    //logout
    LogoutUser: builder.mutation({
      query: () => ({
        url: 'user/logout',
        method: 'GET',
        credentials: "include" as const,
      }),
    }),
  
  }),
});

export const { useLogoutUserMutation,useRegisterUserMutation, useActivateUserMutation, useLoginUserMutation,useUpdateProfileUserMutation,useUpdateProfileAvatarMutation,useUpdatePasswordUserMutation,useAllUserQuery,useUpdateUserRoleMutation,useDeleteUserMutation } = authApi;
