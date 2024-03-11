import React from 'react'

const Anecdote = ({data}) => {
  const {anecdote, handleVoteButton} = data
   return (
    <div>
      <p>{anecdote.name}</p>
      <p>has{anecdote.vote}<button onClick={() => handleVoteButton(anecdote)}>vote</button></p>
    </div>
  )
}

export default Anecdote