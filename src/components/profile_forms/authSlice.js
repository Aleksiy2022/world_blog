import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthorized: false,
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthorized(state) {
      state.isAuthorized = !state.isAuthorized;
    }
  },
  selectors: {
    selectAuthorized: state => state.isAuthorized,
  },
})

export { authSlice }
export const { setAuthorized } = authSlice.actions
export const { selectAuthorized } = authSlice.selectors
