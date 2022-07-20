import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const registerUser = createAsyncThunk('user/registerUser', async (data, thunk) => {
    const resp = await axios.post('/users/register', data)
    return resp
})

export const loginUser = createAsyncThunk('user/loginUser', async (data, thunk) => {
    const resp = await axios.post('/user/loginUser')
    return resp
})

export const updateUser = createAsyncThunk('user/updateUser', async (data, thunk) => {
    const resp = await axios.patch('/user/updateUser')
    return resp
})

// Use case for this?
export const getUser = createAsyncThunk('user/getUser', async (data, thunk) => {
    const resp = await axios.get('user/getUser')
    return resp
})

export const deleteUser = createAsyncThunk('user/deleteUser', async (data, thunk) => {
    const resp = await axios.delete('/user/deleteUser')
    return resp
})


const initialState = {
    username: 'Drake Williams',
    workouts: [],
    routines: [],
    bodyStats: [],
    currentLift: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [registerUser.fulfilled]: (state, action) => {
            state.username = action.payload.user
        }, 
        [loginUser.fulfilled]: (state, action) => {
            state.username = 'Drake'
            state.workouts = action.payload.workouts
            state.routines = action.payload.routines
            state.bodyStats = action.payload.bodyStats
        },
        [updateUser.fulfilled]: (state, action) => {
            state.username = action.payload.user
        },
        [getUser.fulfilled]: (state) => {

        },
        [deleteUser.fulfilled]: (state) => {
            state.username = ''
            state.workouts = []
            state.routines = []
            state.bodyStats = []
            state.currentLift = []
        },
    }    
})


export default userSlice.reducer