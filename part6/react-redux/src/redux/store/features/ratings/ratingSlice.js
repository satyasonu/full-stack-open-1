import { createSlice } from '@reduxjs/toolkit'

const ratingSlice = createSlice({
  name: 'rating',
  initialState: {
    good: 0,
    bad: 0,
    ok: 0
  },
  reducers: 
  {
    handleGood: (state) => {
        state.good++
    },
    handleBad: (state) => {
      state.bad++
    },
    handleOk: (state) => {
      state.ok++
    },
    handleReset: (state) => {
      state.good = 0;
      state.bad = 0;
      state.ok = 0;
    }
  }
})

export const { handleGood, handleBad, handleOk, handleReset} = ratingSlice.actions

export default ratingSlice.reducer