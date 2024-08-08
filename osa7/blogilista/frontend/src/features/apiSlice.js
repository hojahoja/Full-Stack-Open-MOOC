import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogAppApi = createApi({
  reducerPath: "blogAppApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({ query: () => "/users" }),
  }),
});

export const { useGetAllUsersQuery } = blogAppApi;
