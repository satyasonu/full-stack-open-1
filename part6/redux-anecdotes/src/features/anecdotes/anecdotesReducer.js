import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getID = () => (1000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    name: anecdote,
    vote: 0,
    id : getID()
  }
}

const iState = anecdotesAtStart.map(asObject)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState : {
    ad : iState
  },
  reducers : {
    addAd : (state, action) => {
      const newAnecdote = {name:action.payload,vote:0, id: getID()}
      const newAd = state.ad.concat(newAnecdote)
      return {ad:newAd}
    },
    castVote : (state, action) => {
      const votedfor = action.payload
      const findIndex =   state.ad.findIndex((anecdote) => anecdote.id === votedfor.id)
      state.ad[findIndex].vote += 1
      return state
    }
  }
})

export const {castVote, addAd} = anecdotesSlice.actions

export default anecdotesSlice.reducer