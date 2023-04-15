import { createSlice } from '@reduxjs/toolkit';

export const modalEditRingGroupSlice = createSlice({
    name: 'blackList',
    initialState: {
        openModalRingGroupEdit: false,
        openBackdropRingGroupEdit: false,
        openSnackbarRingGroupEdit: false
    },
    reducers: {
        MODAL_OPEN_RING_GROUP_EDIT: (state, { payload }) => {
            state.openModalRingGroupEdit = payload;
        },
        BACKDROP_OPEN_RING_GROUP_EDIT: (state, { payload }) => {
            state.openBackdropRingGroupEdit = payload;
        },
        SNARCKBAR_OPEN_RING_GROUP_EDIT: (state, { payload }) => {
            state.openSnackbarRingGroupEdit = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { MODAL_OPEN_RING_GROUP_EDIT, BACKDROP_OPEN_RING_GROUP_EDIT, SNARCKBAR_OPEN_RING_GROUP_EDIT } =
    modalEditRingGroupSlice.actions;
