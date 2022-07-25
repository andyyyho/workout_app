import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    workouts: [],
    routines: [],
}

export const getWorkouts = createAsyncThunk('user/getWorkouts', async (data, thunk) => {
    const resp = await axios.get('/users/workouts')
    return resp
})

export const getRoutines = createAsyncThunk('user/getRoutines', async (data, thunk) => {
    const resp = await axios.get('/users/routines')
    return resp
})

const fitnessSlice = createSlice({
    name: 'fitness',
    initialState,
    extraReducers: {
        [getWorkouts.fulfilled]: (state, action) => {
            state.workouts = action.payload.data.workouts
        },
        [getWorkouts.rejected]: () => {
            console.log('Rejected: Error getting workouts')
        },
        [getRoutines.fulfilled]: (state, action) => {
            state.routines = action.payload.data.routines
        },
        [getRoutines.rejected]: () => {
            console.log('Rejected: Error getting routines')
        },

        
    }    
})

export default fitnessSlice.reducer