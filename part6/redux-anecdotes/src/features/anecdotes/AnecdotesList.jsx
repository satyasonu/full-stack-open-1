import React from 'react'
import Anecdote from './anecdote'
import { useSelector, useDispatch } from 'react-redux'
import { castVote} from './anecdotesReducer'

const AnecdotesList = () => {
  const dispatch = useDispatch()

  const adList = useSelector((state) => state.anecdotes.ad )
  // const sortedList = adList.sort((a,b) => b.vote - a.vote)
  //can not change adList array directly
  const sortedList = [...adList].sort((a,b) => b.vote - a.vote)
  // created new array using spread operator [...adList]
  const handleVoteButton = (anecdote) => {
    dispatch(castVote(anecdote))
  }
  return (
    <div>
      {sortedList.map((anecdote) => {
        return (
          <Anecdote key={anecdote.id} data={{anecdote, handleVoteButton}}/>
        )
      })}
    </div>
  )
}

export default AnecdotesList