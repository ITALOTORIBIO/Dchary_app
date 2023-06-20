import { createSlice } from '@reduxjs/toolkit';

export const blackListSlice = createSlice({
    name: 'black-list',
    initialState: {
        nombre: '',
        correo: '',
        rol: '',
        username: '',
        password: ''
    },
    reducers: {
        SET_BLACK_LIST: (state, { payload }) => {
            state.nombre = payload.tipo;
            state.correo = payload.correo;
            state.rol = payload.rol;
            state.username = payload.username;
            state.password = payload.password;
        },
        SET_NOMBRE: (state, { payload }) => {
            state.nombre = payload;
        },
        SET_CORREO: (state, { payload }) => {
            state.correo = payload;
        },
        SET_ROL: (state, { payload }) => {
            state.rol = payload;
        },
        SET_USERNAME: (state, { payload }) => {
            state.username = payload;
        },
        SET_PASSWORD: (state, { payload }) => {
            state.password = payload;
        }
    }
});

export const { SET_BLACK_LIST, SET_NOMBRE, SET_CORREO, SET_ROL, SET_USERNAME, SET_PASSWORD } = blackListSlice.actions;
