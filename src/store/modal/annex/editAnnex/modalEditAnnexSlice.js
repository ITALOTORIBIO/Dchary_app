import { createSlice } from '@reduxjs/toolkit';

export const modalEditAnnexSlice = createSlice({
    name: 'annex',
    initialState: {
        openModalEdit: false,
        openBackdropEdit: false,
        openSnackbarEdit: false
    },
    reducers: {
        MODAL_OPEN_ANNEX_EDIT: (state, { payload }) => {
            state.openModalEdit = payload;
        },
        BACKDROP_OPEN_EDIT: (state, { payload }) => {
            state.openBackdropEdit = payload;
        },
        SNARCKBAR_OPEN_EDIT: (state, { payload }) => {
            state.openSnackbarEdit = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { MODAL_OPEN_ANNEX_EDIT, BACKDROP_OPEN_EDIT, SNARCKBAR_OPEN_EDIT } = modalEditAnnexSlice.actions;
