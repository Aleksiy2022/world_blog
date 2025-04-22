import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthorized: false,
  username: '',
  image: null,
  email: ''
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.isAuthorized = true;
      state.username = action.payload.username
      state.image = action.payload.image
      state.email = action.payload.email
    }
  },
  selectors: {
    selectProfile: state => state.isAuthorized,
  },
})

export default profileSlice
export const { setProfile } = profileSlice.actions
export const { selectProfile } = profileSlice.selectors
