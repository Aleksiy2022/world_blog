import { configureStore, combineReducers } from '@reduxjs/toolkit'
import blogApiSlice from './apiSlice.js'
import articlesPageSlice from '/src/components/article_list/articlesPageSlice.js'

const rootReducer = combineReducers({
  articlesPage: articlesPageSlice.reducer,
  [blogApiSlice.reducerPath]: blogApiSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export { store }