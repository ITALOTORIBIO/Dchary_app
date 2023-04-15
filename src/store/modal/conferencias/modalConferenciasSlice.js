import { createSlice } from '@reduxjs/toolkit';

export const modalConferenciasSlice = createSlice({
    name: 'conferencias',
    initialState: {
        open: false
    },
    reducers: {
        MODAL_OPEN_CONFERENCIAS: (state, { payload }) => {
            state.open = payload;
        }
    }
});

export const { MODAL_OPEN_CONFERENCIAS } = modalConferenciasSlice.actions;
