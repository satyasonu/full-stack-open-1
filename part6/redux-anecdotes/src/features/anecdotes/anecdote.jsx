import React from 'react'

const Anecdote = ({data}) => {
  const {anecdote, handleVoteButton} = data
   return (
    <div>
      <p>{anecdote.content}</p>
      <p>has{anecdote.votes}<button onClick={() => handleVoteButton(anecdote)}>vote</button></p>
    </div>
  )
}

export default Anecdote