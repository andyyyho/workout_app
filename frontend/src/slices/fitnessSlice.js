import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    workouts: [],
    routines: [],
    liftEntries: [],
    currentLift: {}
}

export const getLiftEntries = createAsyncThunk('/users/getLiftEntries', async (data, thunk) => {
    const resp = await axios.get('/users/getEntries')
    return resp
})

export const getFilteredLiftEntries = createAsyncThunk('/users/getLiftEntries', async (data, thunk) => {
    const resp = await axios.get('/users/getEntries', { params: { requestedWorkout: data } } )
    return resp
})

export const addWorkout = createAsyncThunk('/users/addWorkout', async (data, thunk) => {
    const resp = await axios.post('/users/workouts', data)
    return resp
})

export const getWorkout = createAsyncThunk('user/getWorkout', async (data, thunk) => {
    const resp = await axios.get('/users/workouts', { params: { workoutID: data } } )
    return resp
})

export const getWorkouts = createAsyncThunk('user/getWorkouts', async (data, thunk) => {
    const resp = await axios.get('/users/workouts',)
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
        [getLiftEntries.fulfilled]: (state, action) => {
            state.liftEntries = action.payload.data
        },
        [getLiftEntries.rejected]: () => {
            console.log('Rejected: Error when fetching lift entries')
        },
        [getFilteredLiftEntries.fulfilled]: (state, action) => {
            state.liftEntries = action.payload.data
        },
        [getFilteredLiftEntries.rejected]: () => {
            console.log('Rejected: Error when fetching filtered lift entries')
        },
        [getWorkout.fulfilled]: (state, action) => {
            state.currentLift = action.payload.data
        },
        [getWorkout.rejected]: () => {
            console.log('Rejected: Error when fetching this workout')
        },
        [getWorkouts.fulfilled]: (state, action) => {
            state.workouts = action.payload.data
        },
        [getWorkouts.rejected]: () => {
            console.log('Rejected: Error getting workouts')
        },
        [addWorkout.fulfilled]: (state, action) => {
            state.workouts.unshift(action.payload.data)
        },
        [addWorkout.rejected]: () => {
            console.log('Rejected: Error adding this workout')
        },
        [getRoutines.fulfilled]: (state, action) => {
            state.routines = action.payload.data
        },
        [getRoutines.rejected]: () => {
            console.log('Rejected: Error getting routines')
        },

    }    
})

export default fitnessSlice.reducer