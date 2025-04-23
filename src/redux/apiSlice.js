import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const blogApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog-platform.kata.academy/api' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit, offset }) => `/articles?limit=${limit}&offset=${offset}`,
    }),
    getArticleBySlug: builder.query({
      query: ({ slug }) => `/articles/${slug}`,
    }),
    createNewUser: builder.mutation({
      query: ({ userData }) => ({
        url: '/users',
        method: 'POST',
        body: userData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    login: builder.mutation({
      query: ({ loginData, jwt }) => ({
        url: '/users/login',
        method: 'POST',
        body: loginData,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }),
    }),
    getUser: builder.query({
      query: ({ jwt }) => ({
        url: `/user`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ userData, jwt }) => ({
        url: `/user`,
        method: 'PUT',
        body: { user: userData },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export default blogApiSlice
export const {
  useGetArticlesQuery,
  useGetArticleBySlugQuery,
  useCreateNewUserMutation,
  useLoginMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = blogApiSlice
