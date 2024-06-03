import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  id: number;
  name: string;
  email: number;
};

export const UserManagerApiSlice: any = createApi({
  reducerPath: "UserManagerApiSlice",
  refetchOnFocus: true,
  refetchOnReconnect: true,

  tagTypes: ["Users", "Authorzation", "Roles", "Permissions"],

  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),

  endpoints: (builder) => ({
    checkAuthUser: builder.query<User[], null>({
      query: () => "/checkAuth",
    }),

    getUsers: builder.query({
      query(params) {
        return {
          url: `/users`,
          method: "GET",
        };
      },

        providesTags: (result, error, arg) =>
            result
                ? [...result.map(({ id }) => ({ type: 'Users', id: id })), 'Users']
                : ['Users'],
    }),

    getUserById: builder.query({
        query(params) {
            const queryString = new URLSearchParams(params)
            return {
                url: `/users/?${queryString}`,
                method: "GET",
            };
        },
    }),

    createNewUser: builder.mutation({
      query(params) {
        return {
          url: `/users`,
          method: "POST",
          body: params,
        };
      },

      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },

      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
      query(params) {
        const { id } = params;

        return {
          url: `/users/${id}`,
          method: "PUT",
          body: params,
        };
      },

      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },

        invalidatesTags: (result, error, arg) => [{ type: 'Users', id: arg.id }]
      // invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query(params) {
        return {
          url: `/users/${params}`,
          method: "DELETE",
        };
      },

      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },

      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserManagerApiSlice;
