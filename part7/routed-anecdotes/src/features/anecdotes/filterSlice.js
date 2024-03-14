import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: "",
  },
  reducers: {
    setFilter: (state,action) => {
      console.log(action.payload)
      state.filter = action.payload
    }
  }
})

export const {setFilter} = filterSlice.actions
export default filterSlice.reducer