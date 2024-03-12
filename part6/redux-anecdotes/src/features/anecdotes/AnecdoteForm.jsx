import React from 'react'
import {useDispatch } from 'react-redux'
import { addAd} from './anecdotesReducer'
import {setNotification} from '../Notification/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const handleAdd = (e) => {
    e.preventDefault()
    dispatch(addAd(e.target.ad.value))
    
    dispatch(setNotification({
      data: `You added '${e.target.ad.value}'`,
      color: 'blue'
    }))
    e.target.ad.value='' 
    setTimeout(() => {
      dispatch(setNotification({data: '', color: ''}))
    }, 5000)
     
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