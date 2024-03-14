import React from 'react'
import {useDispatch} from 'react-redux'
import { setFilter } from './filterSlice'

const FilterAnecdotes = () => {
  const dispatch = useDispatch()
  return (
    <div>
        <span>filter</span>
        <input type='text' name='filteranecdotes' onChange={(e) => dispatch(setFilter(e.target.value))}/>
    </div>
  )
}

export default FilterAnecdotes