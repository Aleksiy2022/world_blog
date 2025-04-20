import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const blogApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog-platform.kata.academy/api' }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit, offset }) => `/articles?limit=${limit}&offset=${offset}`,
    }),
    getArticleBySlug: builder.query({
      query: ({ slug }) => `/articles/${slug}`,
    }),
  }),
})

export default blogApiSlice
export const { useGetArticlesQuery, useGetArticleBySlugQuery } = blogApiSlice
