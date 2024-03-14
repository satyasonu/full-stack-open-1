import React from 'react'
import {useSelector} from 'react-redux'

const Anecdote = () => {

  const anecdote = useSelector((state) =>state.anecdotes.anecdote)

   return (
    <div>
      <p>{anecdote.content}</p>
      <p>has {anecdote.votes} votes</p>
      {/* <p>has{anecdote.votes}<button onClick={() => handleVoteButton(anecdote)}>vote</button></p> */}
    </div>
  )
}

export default Anecdote