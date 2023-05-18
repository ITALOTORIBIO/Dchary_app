import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // 'not-authenticated', 'checking', 'authenticated'
        username: null,
        name: null,
        rol: null,
        message: null
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.username = payload.username;
            state.name = payload.name;
            state.rol = payload.rol;
            state.message = null;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.username = null;
            state.name = null;
            state.rol = null;
            state.message = payload.message;
        },
        // loadUser: (state) => {
        //     state.status = localStorage.getItem('rol') ? 'authenticated' : 'not-authenticated';
        //     state.username = localStorage.getItem('username') || null;
        //     state.name = localStorage.getItem('name') || null;
        //     state.rol = localStorage.getItem('rol') || null;
        //     state.message = null;
        // },
        validateCredentials: (state) => {
            state.status = 'checking';
        }
    }
});

// Action creators are generated for each case reducer function
export const { login, logout, validateCredentials } = authSlice.actions;
