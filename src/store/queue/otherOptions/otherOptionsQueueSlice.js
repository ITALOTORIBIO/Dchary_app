import { createSlice } from '@reduxjs/toolkit';

export const otherOptionsQueueSlice = createSlice({
    name: 'otherOptionsQueue',
    initialState: {
        timbrar: false,
        reiniciar: false,
        unirse: false,
        dejar: false,
        musica: false,
        anunciarEspera: false,
        anunciarPosicion: false,
        pausado: false,
        anunciarTiempo: '',
        posicion: '',
        formatoGrabacionMusica: ''
    },
    reducers: {
        SET_OTHER_OPTIONS: (state, { payload }) => {
            state.timbrar = payload.timbrar;
            state.reiniciar = payload.reiniciar;
            state.unirse = payload.unirse;
            state.dejar = payload.dejar;
            state.musica = payload.musica;
            state.anunciarEspera = payload.anunciarEspera;
            state.anunciarTiempo = payload.anunciarTiempo;
            state.anunciarPosicion = payload.anunciarPosicion;
            state.pausado = payload.pausado;
            state.posicion = payload.posicion;
            state.formatoGrabacionMusica = payload.formatoGrabacionMusica;
        },
        SET_TIMBRAR: (state, { payload }) => {
            state.timbrar = payload;
        },
        SET_REINICIAR: (state, { payload }) => {
            state.reiniciar = payload;
        },
        SET_UNIRSE: (state, { payload }) => {
            state.unirse = payload;
        },
        SET_DEJAR: (state, { payload }) => {
            state.dejar = payload;
        },
        SET_MUSICA: (state, { payload }) => {
            state.musica = payload;
        },
        SET_ANUNCIAR_ESPERA: (state, { payload }) => {
            state.anunciarEspera = payload;
        },
        SET_ANUNCIAR_TIEMPO: (state, { payload }) => {
            state.anunciarTiempo = payload;
        },
        SET_ANUNCIAR_POSICION: (state, { payload }) => {
            state.anunciarPosicion = payload;
        },
        SET_PAUSADO: (state, { payload }) => {
            state.pausado = payload;
        },
        SET_POSICION: (state, { payload }) => {
            state.posicion = payload;
        },
        SET_FORMATOGRABACIONMUSICA: (state, { payload }) => {
            state.formatoGrabacionMusica = payload;
        }
    }
});

export const {
    SET_OTHER_OPTIONS,
    SET_TIMBRAR,
    SET_REINICIAR,
    SET_UNIRSE,
    SET_DEJAR,
    SET_MUSICA,
    SET_ANUNCIAR_ESPERA,
    SET_ANUNCIAR_TIEMPO,
    SET_ANUNCIAR_POSICION,
    SET_PAUSADO,
    SET_POSICION,
    SET_FORMATOGRABACIONMUSICA
} = otherOptionsQueueSlice.actions;
