import { createSlice } from '@reduxjs/toolkit';

export const modalDeleteAnnexSlice = createSlice({
    name: 'annex',
    initialState: {
        openModalDelete: false,
        openBackdropDelete: false,
        openSnackbarDelete: false
    },
    reducers: {
        MODAL_OPEN_ANNEX_DELETE: (state, { payload }) => {
            state.openModalDelete = payload;
        },
        BACKDROP_OPEN_DELETE: (state, { payload }) => {
            state.openBackdropDelete = payload;
        },
        SNARCKBAR_OPEN_DELETE: (state, { payload }) => {
            state.openSnackbarDelete = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { MODAL_OPEN_ANNEX_DELETE, BACKDROP_OPEN_DELETE, SNARCKBAR_OPEN_DELETE } = modalDeleteAnnexSlice.actions;
