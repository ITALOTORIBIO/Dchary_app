import { createSlice } from '@reduxjs/toolkit';

export const conferenciasSlice = createSlice({
    name: 'conferencias',
    initialState: {
        nombre: '',
        numero: '',
        passAdmin: '',
        passUsu: '',
        fecha: '',
        hora: '',
        cantPart: '',
        musicBienv: '',
        musicEspera: '',
        cantidad: ''
    },
    reducers: {
        SET_CONFERENCIAS: (state, { payload }) => {
            state.nombre = payload.nombre;
            state.numero = payload.numero;
            state.passAdmin = payload.passAdmin;
            state.passUsu = payload.passUsu;
            state.fecha = payload.fecha;
            state.hora = payload.hora;
            state.cantPart = payload.cantPart;
            state.musicBienv = payload.musicBienv;
            state.musicEspera = payload.musicEspera;
            state.cantidad = payload.cantidad;
        },
        SET_NOMBRE: (state, { payload }) => void (state.nombre = payload),
        SET_NUMERO: (state, { payload }) => void (state.numero = payload),
        SET_PASS_ADMIN: (state, { payload }) => void (state.passAdmin = payload),
        SET_PASS_USU: (state, { payload }) => void (state.passUsu = payload),
        SET_FECHA: (state, { payload }) => void (state.fecha = payload),
        SET_HORA: (state, { payload }) => void (state.hora = payload),
        SET_CANT_PART: (state, { payload }) => void (state.cantPart = payload),
        SET_MUSIC_BIENV: (state, { payload }) => void (state.musicBienv = payload),
        SET_MUSIC_ESPERA: (state, { payload }) => void (state.musicEspera = payload),
        SET_CANTIDAD: (state, { payload }) => void (state.cantidad = payload)
    }
});

export const {
    SET_CONFERENCIAS,
    SET_NOMBRE,
    SET_NUMERO,
    SET_PASS_ADMIN,
    SET_PASS_USU,
    SET_FECHA,
    SET_HORA,
    SET_CANT_PART,
    SET_MUSIC_BIENV,
    SET_MUSIC_ESPERA,
    SET_CANTIDAD
} = conferenciasSlice.actions;
