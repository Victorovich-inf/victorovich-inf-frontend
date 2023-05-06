import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    isAdmin: false,
    isCurator: false,
    reload: 0,
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        RELOAD: function (state) {
            state.RELOAD += 1;
        },
        auth: function (state) {
            state.isAuthenticated = true
        },
        authAdmin: function (state) {
            state.isAdmin = true
        },
        logout: function (state) {
            state.isAuthenticated = false
        },
        logoutAdmin: function (state) {
            state.isAdmin = false
        },
        init: function (state) {
            state.isInitialized = true
        },
        setUser: function (state, action) {
            state.user = action.payload
            state.isCurator = action.payload.role === 2
        },
        setBalance: function (state, action) {
            state.user = {...state.user, balance: state.user.balance + action.payload}
        },
    }
    })

export const {RELOAD, auth, setUser, init, logout} = userSlice.actions

export const getUserData = (state) => state.user.user;
export const getIsCurator = (state) => state.user.isCurator;

export default userSlice.reducer
