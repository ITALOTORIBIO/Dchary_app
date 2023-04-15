import { createSlice } from '@reduxjs/toolkit';

export const modalAnnexSlice = createSlice({
    name: 'annex',
    initialState: {
        openModal: false,
        openBackdrop: false,
        openSnackbar: false
    },
    reducers: {
        MODAL_OPEN_ANNEX: (state, { payload }) => {
            state.openModal = payload;
        },
        BACKDROP_OPEN: (state, { payload }) => {
            state.openBackdrop = payload;
        },
        SNARCKBAR_OPEN: (state, { payload }) => {
            state.openSnackbar = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { MODAL_OPEN_ANNEX, BACKDROP_OPEN, SNARCKBAR_OPEN } = modalAnnexSlice.actions;
