import React from 'react'
import AnecdoteForm from './AnecdoteForm'
import AnecdotesList from './AnecdotesList'
import FilterAnecdotes from './FilterAnecdotes'

const Anecdotes = () => {

  return (
    <>
      <h1>Anecdotes</h1>
      <FilterAnecdotes />
      <AnecdotesList/>
      <AnecdoteForm />
    </>
  )
}

export default Anecdotes