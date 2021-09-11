import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        password: '',
        time: '',
        username: ''
    },
    reducers: {
        userCreated: (user, { payload }) => {
            user.email = payload.email
            user.password = payload.password
            user.time = Date.now()
            user.username = payload.username
        }
    }
})

const { userCreated } = slice.actions

export const createUser = (user) => ({
    type: userCreated.type,
    payload: user
})

export const getUserDetails = (state) => state.user

export default slice.reducer