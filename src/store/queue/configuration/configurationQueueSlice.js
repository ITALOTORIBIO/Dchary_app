import { createSlice } from '@reduxjs/toolkit';

export const configurationQueueSlice = createSlice({
    name: 'configurationQueue',
    initialState: {
        estrategia: '',
        nivelServicio: '',
        peso: '',
        maxUsuariosCola: '',
        formatoGrabacion: '',
        contexto: '',
        tiempoEsperaConexionAgente: '',
        tiempoTimbradoAgente: '',
        tiempoDescansoEntreLlamada: '',
        tiempoEsperaTimbrado: '',
        frecuenciaAnuncioCola: ''
    },
    reducers: {
        SET_CONFIGURATION: (state, { payload }) => {
            state.estrategia = payload.estrategia;
            state.nivelServicio = payload.nivelServicio;
            state.peso = payload.peso;
            state.maxUsuariosCola = payload.maxUsuariosCola;
            state.formatoGrabacion = payload.formatoGrabacion;
            state.contexto = payload.contexto;
            state.tiempoEsperaConexionAgente = payload.tiempoEsperaConexionAgente;
            state.tiempoTimbradoAgente = payload.tiempoTimbradoAgente;
            state.tiempoDescansoEntreLlamada = payload.tiempoDescansoEntreLlamada;
            state.tiempoEsperaTimbrado = payload.tiempoEsperaTimbrado;
            state.frecuenciaAnuncioCola = payload.frecuenciaAnuncioCola;
        },
        SET_ESTRATEGIA: (state, { payload }) => {
            state.estrategia = payload;
        },
        SET_NIVELSERVICIO: (state, { payload }) => {
            state.nivelServicio = payload;
        },
        SET_PESO: (state, { payload }) => {
            state.peso = payload;
        },
        SET_MAXUSUARIOSCOLA: (state, { payload }) => {
            state.maxUsuariosCola = payload;
        },
        SET_FORMATOGRABACION: (state, { payload }) => {
            state.formatoGrabacion = payload;
        },
        SET_CONTEXTO: (state, { payload }) => {
            state.contexto = payload;
        },
        SET_TIEMPOESPERACONEXIONAGENTE: (state, { payload }) => {
            state.tiempoEsperaConexionAgente = payload;
        },
        SET_TIEMPOTIMBRADOAGENTE: (state, { payload }) => {
            state.tiempoTimbradoAgente = payload;
        },
        SET_TIEMPODESCANSOENTRELLAMADA: (state, { payload }) => {
            state.tiempoDescansoEntreLlamada = payload;
        },
        SET_TIEMPOESPERATIMBRADO: (state, { payload }) => {
            state.tiempoEsperaTimbrado = payload;
        },
        SET_FRECUENCIAANUNCIOCOLA: (state, { payload }) => {
            state.frecuenciaAnuncioCola = payload;
        }
    }
});

export const {
    SET_CONFIGURATION,
    SET_ESTRATEGIA,
    SET_NIVELSERVICIO,
    SET_PESO,
    SET_MAXUSUARIOSCOLA,
    SET_FORMATOGRABACION,
    SET_CONTEXTO,
    SET_TIEMPOESPERACONEXIONAGENTE,
    SET_TIEMPOTIMBRADOAGENTE,
    SET_TIEMPODESCANSOENTRELLAMADA,
    SET_TIEMPOESPERATIMBRADO,
    SET_FRECUENCIAANUNCIOCOLA
} = configurationQueueSlice.actions;
