import React from 'react'
import Anecdote from './anecdote'
import { useSelector, useDispatch } from 'react-redux'
import { castVote} from './anecdotesReducer'
import { setNotification, clearNotification } from '../Notification/notificationReducer'
import Notification from '../Notification/Notification'
import noteService from '../../services/notes'
import {useGetAllAnecdotesQuery, useUpdateAnecdoteMutation} from '../../redux/rtkapi'

const AnecdotesList = () => {
  const dispatch = useDispatch()
  const dataToFilter = useSelector(state => state.filter.filter.toLowerCase())

  const {data, error, isLoading} = useGetAllAnecdotesQuery()
  const [updateAnecdote] = useUpdateAnecdoteMutation()
  let fdata = [];
  if(data){
    fdata = dataToFilter.length !== 0 ? Array.from(data).filter(note => note.content.toLowerCase().includes(dataToFilter)) : Array.from(data)
  }

  const notification = useSelector((state) => state.notification)

  const sortedList = fdata.sort((a,b) => b.votes - a.votes)
  const handleVoteButton = (anecdote) => {
    // noteService.update({...anecdote, votes: anecdote.votes+1}).then(data => dispatch(castVote(data)))
    // const newAnecdote = {
    //   id: anecdote.id,
    //   content: anecdote.content,
    //   votes: anecdote.votes + 1
    // }
    updateAnecdote({...anecdote, votes: anecdote.votes+1})
    dispatch(setNotification({
      data: `You voted '${anecdote.content}'`,
      color: 'green',
      time: 5
    }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, notification.time)
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