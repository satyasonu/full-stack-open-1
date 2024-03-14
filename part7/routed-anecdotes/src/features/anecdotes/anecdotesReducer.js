import { createSlice } from '@reduxjs/toolkit'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState : {
    anecdote: {}
  },
  reducers : {
    setAnecdote: (state, action) => {
      console.log(action.payload)
      state.anecdote = action.payload
    }
  }
})

export const {setAnecdote} = anecdotesSlice.actions

export default anecdotesSlice.reducer