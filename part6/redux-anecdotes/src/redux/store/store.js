import { configureStore } from '@reduxjs/toolkit'
import adReducer from '../../features/anecdotes/anecdotesReducer'
import filterSlice from '../../features/anecdotes/filterSlice'
import notificationReducer from '../../features/Notification/notificationReducer'
import {anecdotesApi} from '../rtkapi'


const store = configureStore({
  reducer : {
    anecdotes : adReducer,
    filter: filterSlice,
    notification: notificationReducer,
    [anecdotesApi.reducerPath]: anecdotesApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(anecdotesApi.middleware)
})

export default store