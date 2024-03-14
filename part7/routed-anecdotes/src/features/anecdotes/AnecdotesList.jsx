import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { setNotification, clearNotification } from '../Notification/notificationReducer'
import Notification from '../Notification/Notification'
import {useGetAllAnecdotesQuery, useUpdateAnecdoteMutation} from '../../redux/rtkapi'
import { Link } from 'react-router-dom'
import { setAnecdote } from './anecdotesReducer'

const AnecdotesList = () => {
  const dispatch = useDispatch()
  const dataToFilter = useSelector(state => state.filter.filter.toLowerCase())

  const {data, error, isLoading} = useGetAllAnecdotesQuery()
  // const [updateAnecdote] = useUpdateAnecdoteMutation()
  let fdata = [];
  if(data){
    fdata = dataToFilter.length !== 0 ? Array.from(data).filter(note => note.content.toLowerCase().includes(dataToFilter)) : Array.from(data)
  }

  const notification = useSelector((state) => state.notification)

  const sortedList = fdata.sort((a,b) => b.votes - a.votes)
  // const handleVoteButton = (anecdote) => {

  //   updateAnecdote({...anecdote, votes: anecdote.votes+1})
  //   dispatch(setNotification({
  //     data: `You voted '${anecdote.content}'`,
  //     color: 'green',
  //     time: 5
  //   }))
  //   setTimeout(() => {
  //     dispatch(clearNotification())
  //   }, notification.time)
  // }

  return (
    <ul>
      { notification.data !== '' && <Notification data={notification} />}
      {sortedList.map((anecdote) => {
        return (
          // <Anecdote key={anecdote.id} data={{anecdote, handleVoteButton}}/>
          <li key={anecdote.id}><Link to={{pathname: `/anecdotes/:${anecdote.id}`}} onClick={()=>dispatch(setAnecdote(anecdote))}>{anecdote.content}</Link></li>
        )
      })}
    </ul>
  )
}

export default AnecdotesList