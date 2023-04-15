import { createSlice } from '@reduxjs/toolkit';

export const modalRingGroupSlice = createSlice({
    name: 'ring-group',
    initialState: {
        open: false,
        openBackdropRingGroup: false,
        openSnackbarRingGroup: false
    },
    reducers: {
        MODAL_OPEN_RING_GROUP: (state, { payload }) => {
            state.open = payload;
        },
        BACKDROP_OPEN_RING_GROUP: (state, { payload }) => {
            state.openBackdropRingGroup = payload;
        },
        SNARCKBAR_OPEN_RING_GROUP: (state, { payload }) => {
            state.openSnackbarRingGroup = payload;
        }
    }
});

export const { MODAL_OPEN_RING_GROUP, BACKDROP_OPEN_RING_GROUP, SNARCKBAR_OPEN_RING_GROUP } = modalRingGroupSlice.actions;
