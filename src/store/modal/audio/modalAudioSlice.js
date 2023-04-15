import { createSlice } from '@reduxjs/toolkit';

export const modalAudioSlice = createSlice({
    name: 'audio',
    initialState: {
        open: false
    },
    reducers: {
        MODAL_OPEN_AUDIO: (state, { payload }) => {
            state.open = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { MODAL_OPEN_AUDIO } = modalAudioSlice.actions;
