import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const blogApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api',
    prepareHeaders: (headers) => {
      const jwt = JSON.parse(localStorage.getItem('blogAuthTokenData'))?.jwt
      if (jwt) headers.set('Authorization', `Bearer ${jwt}`)
      return headers
    },
  }),
  tagTypes: ['User', 'Article'],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit, offset }) => ({
        url: `/articles?limit=${limit}&offset=${offset}`,
        method: 'GET',
      }),
      providesTags: ['Article'],
    }),
    getArticleBySlug: builder.query({
      query: ({ slug }) => ({
        url: `/articles/${slug}`,
        method: 'GET',
      }),
      providesTags: ['Article'],
    }),
    createNewUser: builder.mutation({
      query: ({ formData }) => ({
        url: '/users',
        method: 'POST',
        body: { user: formData },
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation({
      query: ({ formData }) => ({
        url: '/users/login',
        method: 'POST',
        body: { user: formData },
      }),
      invalidatesTags: ['Article'],
    }),
    getUser: builder.query({
      query: () => ({
        url: `/user`,
        method: 'GET',
      }),
      providesTags: ['User'],
      invalidatesTags: ['Article'],
    }),
    updateUser: builder.mutation({
      query: ({ formData }) => ({
        url: `/user`,
        method: 'PUT',
        body: { user: formData },
      }),
      invalidatesTags: ['User', 'Article'],
    }),
    favoriteArticle: builder.mutation({
      query: ({ slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['Article'],
    }),
    unFavoriteArticle: builder.mutation({
      query: ({ slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Article'],
    }),
    createArticle: builder.mutation({
      query: ({ newArticle }) => ({
        url: '/articles',
        method: 'POST',
        body: newArticle,
      }),
      invalidatesTags: ['Article'],
    }),
    deleteArticle: builder.mutation({
      query: ({ slug }) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Article'],
    }),
    updateArticle: builder.mutation({
      query: ({ updatedArticle, slug }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        body: updatedArticle,
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
