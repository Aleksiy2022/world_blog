import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const blogAliSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog-platform.kata.academy/api/' })
  // endpoints: (builder) => ({
  //   getArtic
  // })
})
