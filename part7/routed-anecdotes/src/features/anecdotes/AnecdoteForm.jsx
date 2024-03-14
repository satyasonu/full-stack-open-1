import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import {setNotification, clearNotification} from '../Notification/notificationReducer'
import {useAddAnecdoteMutation} from '../../redux/rtkapi'
import {useField} from '../../hooks/index'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [addAnecdote] = useAddAnecdoteMutation()
  const notification = useSelector((state) => state.notification)
  const navigate = useNavigate()
  const {content, resetvalue} = useField('text', 'ad')

  
  const handleAdd = (e) => {
    e.preventDefault()
    const anecdote = {
      content: e.target.ad.value,
      votes: 0
    }
    addAnecdote(anecdote)
    // noteService.createNew(e.target.ad.value).then(data => dispatch(addAd(data)))
    dispatch(setNotification({
      data: `a new anecdote '${e.target.ad.value}' created!`,
      color: 'blue',
      time: 5
    }))
    e.target.ad.value='' 
    navigate('/')
    setTimeout(() => {
      dispatch(clearNotification())
    }, notification.time)  
  }
  return (
    <>
    <form onSubmit={handleAdd}>
      <span>Name :</span>
      <input {...content}  placeholder='Enter name' required/>
      <button type="submit">add</button>
    </form>
    <button onClick={resetvalue}>reset</button>
    </>
  )
}

export default AnecdoteForm