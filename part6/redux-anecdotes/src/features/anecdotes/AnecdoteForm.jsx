import React from 'react'
import {useDispatch } from 'react-redux'
import { addAd} from './anecdotesReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const handleAdd = (e) => {
    e.preventDefault()
    dispatch(addAd(e.target.ad.value))
  }
  return (
    <form onSubmit={handleAdd}>
        <span>Name :</span>
        <input type='text' name='ad' placeholder='Enter name'/>
        <button type="submit">add</button>
      </form>
  )
}

export default AnecdoteForm