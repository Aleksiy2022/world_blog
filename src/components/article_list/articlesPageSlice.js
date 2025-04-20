import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  page: 1,
}

const articlesPageSlice = createSlice({
  name: 'articlesPage',
  initialState,
  reducers: {
    setPage: (state, action) => {
      const { page } = action.payload
      state.page = page
    },
  },
  selectors: {
    selectPage: (state) => state.page,
  },
})

export const { setPage } = articlesPageSlice.actions
export const { selectPage } = articlesPageSlice.selectors
export default articlesPageSlice
