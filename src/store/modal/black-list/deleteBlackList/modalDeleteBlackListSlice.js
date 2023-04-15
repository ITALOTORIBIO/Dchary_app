import { createSlice } from '@reduxjs/toolkit';

export const modalDeleteBlackListSlice = createSlice({
    name: 'blackList',
    initialState: {
        openModalBlackListDelete: false,
        openBackdropBlackListDelete: false,
        openSnackbarBlackListDelete: false
    },
    reducers: {
        MODAL_OPEN_BLACKLIST_DELETE: (state, { payload }) => {
            state.openModalBlackListDelete = payload;
        },
        BACKDROP_OPEN_BLACKLIST_DELETE: (state, { payload }) => {
            state.openBackdropBlackListDelete = payload;
        },
        SNARCKBAR_OPEN_BLACKLIST_DELETE: (state, { payload }) => {
            state.openSnackbarBlackListDelete = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { MODAL_OPEN_BLACKLIST_DELETE, BACKDROP_OPEN_BLACKLIST_DELETE, SNARCKBAR_OPEN_BLACKLIST_DELETE } =
    modalDeleteBlackListSlice.actions;
