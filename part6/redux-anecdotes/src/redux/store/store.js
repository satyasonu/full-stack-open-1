import { configureStore } from '@reduxjs/toolkit'
import adReducer from '../../features/anecdotes/anecdotesReducer'
import filterSlice from '../../features/anecdotes/filterSlice'
import notificationReducer from '../../features/Notification/notificationReducer'

export default configureStore({
  reducer : {
    anecdotes : adReducer,
    filter: filterSlice,
    notification: notificationReducer
  }
})