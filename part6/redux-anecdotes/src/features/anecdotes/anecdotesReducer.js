import { createSlice } from '@reduxjs/toolkit'

// const getID = () => (1000 * Math.random()).toFixed(0)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState : {
    notes: []
  },
  reducers : {
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    addAd : (state, action) => {
      // const newAnecdote = {content:action.payload,votes:0, id: state.notes.length === 0 ? 1 : state.notes[state.notes.length - 1].id + 1}
      const newAnecdote = {content:action.payload.content,votes:action.payload.votes, id: action.payload.id}
      state.notes.push(newAnecdote)
    },
    castVote : (state, action) => {
      const votedfor = action.payload
      const findIndex =   state.notes.findIndex((anecdote) => anecdote.id === votedfor.id)
      state.notes[findIndex].votes = action.payload.votes
      return state
    }
  }
})

export const {castVote, addAd, setNotes} = anecdotesSlice.actions

export default anecdotesSlice.reducer