import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import fitnessReducer from './slices/fitnessSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        fitness: fitnessReducer,
    }
})

export default store;