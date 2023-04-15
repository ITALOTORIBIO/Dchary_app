import { createSlice } from '@reduxjs/toolkit';

export const monitoringQueueSlice = createSlice({
    name: 'monitoringQueue',
    initialState: {
        cola: '',
        numAnexo: '',
        correo: '',
        minTiempo: '',
        medTiempo: '',
        maxTiempo: ''
    },
    reducers: {
        SET_MONITORING: (state, { payload }) => {
            state.cola = payload.cola;
            state.numAnexo = payload.numAnexo;
            state.correo = payload.correo;
            state.minTiempo = payload.minTiempo;
            state.medTiempo = payload.medTiempo;
            state.maxTiempo = payload.maxTiempo;
        },
        SET_COLA: (state, { payload }) => {
            state.cola = payload;
        },
        SET_NUMERO_ANEXO: (state, { payload }) => {
            state.numAnexo = payload;
        },
        SET_CORREO: (state, { payload }) => {
            state.correo = payload;
        },
        SET_MINIMO_TIEMPO: (state, { payload }) => {
            state.minTiempo = payload;
        },
        SET_MEDIA_TIEMPO: (state, { payload }) => {
            state.medTiempo = payload;
        },
        SET_MAXIMO_TIEMPO: (state, { payload }) => {
            state.maxTiempo = payload;
        }
    }
});

export const { SET_MONITORING, SET_COLA, SET_NUMERO_ANEXO, SET_CORREO, SET_MINIMO_TIEMPO, SET_MEDIA_TIEMPO, SET_MAXIMO_TIEMPO } =
    monitoringQueueSlice.actions;
