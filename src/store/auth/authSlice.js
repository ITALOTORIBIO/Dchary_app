import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // 'not-authenticated', 'checking', 'authenticated'
        username: null,
        name: null,
        token: null,
        message: null
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.username = payload.username;
            state.name = payload.name;
            state.token = payload.token;
            state.message = null;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.username = null;
            state.name = null;
            state.token = null;
            state.message = payload.message;
        },
        loadUser: (state) => {
            state.status = localStorage.getItem('token') ? 'authenticated' : 'not-authenticated';
            state.username = localStorage.getItem('username') || null;
            state.name = localStorage.getItem('name') || null;
            state.token = localStorage.getItem('token') || null;
            state.message = null;
        },
        validateCredentials: (state) => {
            state.status = 'checking';
        }
    }
});

// Action creators are generated for each case reducer function
export const { login, logout, loadUser, validateCredentials } = authSlice.actions;
