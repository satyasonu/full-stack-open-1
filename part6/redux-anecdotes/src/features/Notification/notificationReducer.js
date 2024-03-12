import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    data: "",
    color: "blue"
  },
  reducers: {
    setNotification(state, action){
      state.data = action.payload.data
      state.color = action.payload.color
    }
  }
})

export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer