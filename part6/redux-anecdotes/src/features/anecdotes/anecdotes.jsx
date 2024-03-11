import React from 'react'
import AnecdoteForm from './AnecdoteForm'
import AnecdotesList from './AnecdotesList'

const Anecdotes = () => {

  return (
    <>
      <h1>Anecdotes</h1>
      <AnecdotesList/>
      <AnecdoteForm />
    </>
  )
}

export default Anecdotes