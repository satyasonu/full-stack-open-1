import { configureStore } from '@reduxjs/toolkit'
import ratingReducer from './features/ratings/ratingSlice'
export default configureStore({
  reducer: {
    rating: ratingReducer
  }
})