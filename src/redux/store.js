import { configureStore, combineReducers } from '@reduxjs/toolkit'

import authSlice from '@/components/profile_forms/authSlice.js'
import articlesPageSlice from '@/components/article_list/articlesPageSlice.js'

import blogApiSlice from './apiSlice.js'

const rootReducer = combineReducers({
  articlesPage: articlesPageSlice.reducer,
  auth: authSlice.reducer,
  [blogApiSlice.reducerPath]: blogApiSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export { store }
