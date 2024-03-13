import React from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { addAd} from './anecdotesReducer'
import {setNotification, clearNotification} from '../Notification/notificationReducer'
import noteService from '../../services/notes'
import {useAddAnecdoteMutation} from '../../redux/rtkapi'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [addAnecdote] = useAddAnecdoteMutation()
  const notification = useSelector((state) => state.notification)
  
  const handleAdd = (e) => {
    e.preventDefault()
    const anecdote = {
      content: e.target.ad.value,
      votes: 0
    }
    addAnecdote(anecdote)
    // noteService.createNew(e.target.ad.value).then(data => dispatch(addAd(data)))
    dispatch(setNotification({
      data: `You added '${e.target.ad.value}'`,
      color: 'blue',
      time: 5
    }))
    e.target.ad.value='' 
    setTimeout(() => {
      dispatch(clearNotification())
    }, notification.time)  
  }
  return (
    <form onSubmit={handleAdd}>
      <span>Name :</span>
      <input type='text' name='ad' placeholder='Enter name' required/>
      <button type="submit">add</button>
    </form>
  )
}

export default AnecdoteForm