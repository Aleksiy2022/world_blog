import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { blogApiSlice } from './apiSlice.js'

const rootReducer = combineReducers({
  [blogApiSlice.reducerPath]: blogApiSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export { store }