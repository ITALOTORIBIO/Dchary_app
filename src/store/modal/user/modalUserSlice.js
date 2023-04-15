import { createSlice } from '@reduxjs/toolkit';

export const modalUserSlice = createSlice({
    name: 'user',
    initialState: {
        open: false
    },
    reducers: {
        MODAL_OPEN_USER: (state, { payload }) => {
            state.open = payload;
        }
    }
});

export const { MODAL_OPEN_USER } = modalUserSlice.actions;
