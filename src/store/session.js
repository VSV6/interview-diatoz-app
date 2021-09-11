import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'session',
    initialState: {
        username: '',
        time: ''
    },
    reducers: {
        userLoggedIn: (user, { payload }) => {
            user.name = payload.name
            user.time = Date.now()
        },
        userLoggedOut: (user) => {
            user.name = undefined
            user.time = undefined
        }
    }
})

const { userLoggedIn, userLoggedOut } = slice.actions

export const addUserDetails = (user) => ({
    type: userLoggedIn.type,
    payload: user
})

export const getUserDetails = (state) => state.user

export const removeUserDetails = () => ({
    type: userLoggedOut.type
})

export default slice.reducer