import { createSlice } from '@reduxjs/toolkit';

export const modalQueueSlice = createSlice({
    name: 'queue',
    initialState: {
        open: false
    },
    reducers: {
        MODAL_OPEN_QUEUE: (state, { payload }) => {
            state.open = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { MODAL_OPEN_QUEUE } = modalQueueSlice.actions;
