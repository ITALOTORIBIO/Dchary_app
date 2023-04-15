import { createSlice } from '@reduxjs/toolkit';

export const ringGroupSlice = createSlice({
    name: 'ring-group',
    initialState: {
        nombreGrupo: '',
        numeroGrupo: '',
        selectAnexo: ''
    },
    reducers: {
        SET_RING_GROUP: (state, { payload }) => {
            state.nombreGrupo = payload.nombreGrupo;
            state.numeroGrupo = payload.numeroGrupo;
            state.selectAnexo = payload.selectAnexo;
        },
        SET_NOMBRE_GRUPO: (state, { payload }) => void (state.nombreGrupo = payload),
        SET_NUMERO_GRUPO: (state, { payload }) => void (state.numeroGrupo = payload),
        SET_SELECT_ANEXO: (state, { payload }) => void (state.selectAnexo = payload)
    }
});

export const { SET_RING_GROUP, SET_NOMBRE_GRUPO, SET_NUMERO_GRUPO, SET_SELECT_ANEXO } = ringGroupSlice.actions;
