import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const blogApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog-platform.kata.academy/api' }),
  tagTypes: ['User', 'Article'],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit, offset, jwt = null }) => ({
        url: `/articles?limit=${limit}&offset=${offset}`,
        method: 'GET',
        headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined,
      }),
      providesTags: ['Article'],
    }),
    getArticleBySlug: builder.query({
      query: ({ slug, jwt = null }) => ({
        url: `/articles/${slug}`,
        method: 'GET',
        headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined,
      }),
      providesTags: ['Article'],
    }),
    createNewUser: builder.mutation({
      query: ({ userData }) => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: ({ loginData }) => ({
        url: '/users/login',
        method: 'POST',
        body: loginData,
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
      invalidatesTags: ['Article'],
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
      invalidatesTags: ['User', 'Article'],
    }),
    favoriteArticle: builder.mutation({
      query: ({ slug, jwt }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }),
      invalidatesTags: ['Article'],
    }),
    unFavoriteArticle: builder.mutation({
      query: ({ slug, jwt }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }),
      invalidatesTags: ['Article'],
    }),
    createArticle: builder.mutation({
      query: ({ newArticle, jwt }) => ({
        url: '/articles',
        method: 'POST',
        body: newArticle,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }),
      invalidatesTags: ['Article'],
    }),
    deleteArticle: builder.mutation({
      query: ({ slug, jwt }) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }),
      invalidatesTags: ['Article'],
    }),
    updateArticle: builder.mutation({
      query: ({ updatedArticle, slug, jwt }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        body: updatedArticle,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }),
      invalidatesTags: ['Article'],
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
  useFavoriteArticleMutation,
  useUnFavoriteArticleMutation,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
} = blogApiSlice
