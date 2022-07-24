import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const registerUser = createAsyncThunk('user/registerUser', async (data, thunk) => {
    const resp = await axios.post('/users/register', data)
    return resp
})

export const loginUser = createAsyncThunk('user/loginUser', async (data, thunk) => {
    const resp = await axios.post('/users/login', data)
    return resp
})

export const updateUser = createAsyncThunk('user/updateUser', async (data, thunk) => {
    const resp = await axios.patch('/users/edit')
    return resp
})

// Use case for this?
export const getUser = createAsyncThunk('user/getUser', async (data, thunk) => {
    const resp = await axios.get('users/profile')
    return resp
})

export const deleteUser = createAsyncThunk('user/deleteUser', async (data, thunk) => {
    const resp = await axios.delete('/users/delete')
    return resp
})


const initialState = {
    username: '',
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
            state.username = action.payload.data.username
        },
        [registerUser.rejected]: () => {
            console.log('Rejected: Error registering user')
        },
        [loginUser.fulfilled]: (state, action) => {
            if (action.payload.data === "Failed Authentication") return;

            state.username = action.payload.data.user.username
            state.bodyStats = action.payload.data.user.bodyStats
        },
        [loginUser.rejected]: () => {
            console.log('Rejected: Error logging in user')
        },
        [updateUser.fulfilled]: (state, action) => {
            state.username = action.payload.data.username
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