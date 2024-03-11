import { configureStore } from '@reduxjs/toolkit'
import adReducer from '../../features/anecdotes/anecdotesReducer'

export default configureStore({
  reducer : {
    anecdotes : adReducer
  }
})