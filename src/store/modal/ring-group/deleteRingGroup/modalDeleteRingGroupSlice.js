import { createSlice } from '@reduxjs/toolkit';

export const modalDeleteRingGroupSlice = createSlice({
    name: 'blackList',
    initialState: {
        openModalRingGroupDelete: false,
        openBackdropRingGroupDelete: false,
        openSnackbarRingGroupDelete: false
    },
    reducers: {
        MODAL_OPEN_RING_GROUP_DELETE: (state, { payload }) => {
            state.openModalRingGroupDelete = payload;
        },
        BACKDROP_OPEN_RING_GROUP_DELETE: (state, { payload }) => {
            state.openBackdropRingGroupDelete = payload;
        },
        SNARCKBAR_OPEN_RING_GROUP_DELETE: (state, { payload }) => {
            state.openSnackbarRingGroupDelete = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { MODAL_OPEN_RING_GROUP_DELETE, BACKDROP_OPEN_RING_GROUP_DELETE, SNARCKBAR_OPEN_RING_GROUP_DELETE } =
    modalDeleteRingGroupSlice.actions;
