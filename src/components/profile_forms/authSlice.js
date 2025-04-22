import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthorized: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state) {
      state.isAuthorized = true;
    }
  },
  selectors: {
    selectAuth: state => state.isAuthorized,
  },
})

export default authSlice
export const { setAuth } = authSlice.actions
export const { selectAuth } = authSlice.selectors
