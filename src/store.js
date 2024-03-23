import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './composents/features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})