import { createSlice } from '@reduxjs/toolkit';

export const modalEditBlackListSlice = createSlice({
    name: 'blackList',
    initialState: {
        openModalBlackListEdit: false,
        openBackdropBlackListEdit: false,
        openSnackbarBlackListEdit: false
    },
    reducers: {
        MODAL_OPEN_BLACKLIST_EDIT: (state, { payload }) => {
            state.openModalBlackListEdit = payload;
        },
        BACKDROP_OPEN_BLACKLIST_EDIT: (state, { payload }) => {
            state.openBackdropBlackListEdit = payload;
        },
        SNARCKBAR_OPEN_BLACKLIST_EDIT: (state, { payload }) => {
            state.openSnackbarBlackListEdit = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { MODAL_OPEN_BLACKLIST_EDIT, BACKDROP_OPEN_BLACKLIST_EDIT, SNARCKBAR_OPEN_BLACKLIST_EDIT } = modalEditBlackListSlice.actions;
