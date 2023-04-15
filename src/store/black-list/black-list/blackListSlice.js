import { createSlice } from '@reduxjs/toolkit';

export const blackListSlice = createSlice({
    name: 'black-list',
    initialState: {
        tipo: '',
        numero: '',
        descripcion: '',
        estado: false
    },
    reducers: {
        SET_BLACK_LIST: (state, { payload }) => {
            state.tipo = payload.tipo;
            state.numero = payload.numero;
            state.descripcion = payload.descripcion;
            state.estado = payload.estado;
        },
        SET_TIPO: (state, { payload }) => {
            state.tipo = payload;
        },
        SET_NUMERO: (state, { payload }) => {
            state.numero = payload;
        },
        SET_DESCRIPCION: (state, { payload }) => {
            state.descripcion = payload;
        },
        SET_ESTADO: (state, { payload }) => {
            state.estado = payload;
        }
    }
});

export const { SET_BLACK_LIST, SET_TIPO, SET_NUMERO, SET_DESCRIPCION, SET_ESTADO } = blackListSlice.actions;
