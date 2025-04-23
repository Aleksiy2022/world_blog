import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthorized: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorized(state) {
      state.isAuthorized = true
    },
    setUnauthorized(state) {
      state.isAuthorized = false
    },
  },
  selectors: {
    selectAuth: (state) => state.isAuthorized,
  },
})

export default authSlice
export const { setAuthorized, setUnauthorized } = authSlice.actions
export const { selectAuth } = authSlice.selectors
