import { createSlice } from '@reduxjs/toolkit';

export const modalBlackListSlice = createSlice({
    name: 'black-list',
    initialState: {
        open: false,
        openBackdropBlackList: false,
        openSnackbarBlackList: false
    },
    reducers: {
        MODAL_OPEN_BLACK_LIST: (state, { payload }) => {
            state.open = payload;
        },
        BACKDROP_OPEN_BLACK_LIST: (state, { payload }) => {
            state.openBackdropBlackList = payload;
        },
        SNARCKBAR_OPEN_BLACK_LIST: (state, { payload }) => {
            state.openSnackbarBlackList = payload;
        }
    }
});

export const { MODAL_OPEN_BLACK_LIST, BACKDROP_OPEN_BLACK_LIST, SNARCKBAR_OPEN_BLACK_LIST } = modalBlackListSlice.actions;
