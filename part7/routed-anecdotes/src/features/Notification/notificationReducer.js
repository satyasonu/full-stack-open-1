import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    data: "",
    color: "blue",
    time: 5000
  },
  reducers: {
    setNotification(state, action){
      state.data = action.payload.data
      state.color = action.payload.color
      state.time = action.payload.time * 1000
    },
    clearNotification(state){
      state.data = ''
      state.color = ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer