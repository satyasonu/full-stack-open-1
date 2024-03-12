import React, { useMemo } from 'react'
import Anecdote from './anecdote'
import { useSelector, useDispatch } from 'react-redux'
import { castVote} from './anecdotesReducer'
import {createSelector} from '@reduxjs/toolkit'
import { setNotification } from '../Notification/notificationReducer'
import Notification from '../Notification/Notification'

const selectNotes = state => state.anecdotes.notes;
const selectFilter = state => state.filter.filter.toLowerCase();

const selectFilteredNotes = createSelector(
  [selectNotes, selectFilter],
  (notes, filter) => {
    return filter.length === 0
      ? notes
      : notes.filter(note => note.name.toLowerCase().includes(filter));
  }
);

const AnecdotesList = () => {
  const dispatch = useDispatch()

  const filteredNotes = useSelector(selectFilteredNotes);
  const notification = useSelector((state) => state.notification)
  // console.log(notification)

  const sortedList = [...filteredNotes].sort((a,b) => b.vote - a.vote)
  const handleVoteButton = (anecdote) => {
    dispatch(castVote(anecdote))
    dispatch(setNotification({
      data: `You voted '${anecdote.name}'`,
      color: 'green'
    }))
    setTimeout(() => {
      dispatch(setNotification({data: '', color: ''}))
    }, 5000)
  }

  

  return (
    <div>
      { notification.data !== '' && <Notification data={notification} />}
      {sortedList.map((anecdote) => {
        return (
          <Anecdote key={anecdote.id} data={{anecdote, handleVoteButton}}/>
        )
      })}
    </div>
  )
}

export default AnecdotesList