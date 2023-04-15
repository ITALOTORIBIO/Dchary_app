import { createSlice } from '@reduxjs/toolkit';

export const basicAnnexSlice = createSlice({
    name: 'basicAnnex',
    initialState: {
        extension: '',
        key: '',
        callerID: '',
        voiceMail: '',
        context: 'from-internal'
    },
    reducers: {
        SET_BASIC: (state, { payload }) => {
            state.extension = payload.extension;
            state.key = payload.key;
            state.callerID = payload.calledID;
            state.voiceMail = payload.voiceMail;
            state.context = payload.context;
        },
        SET_INPUT_VALUE: (state, { payload }) => {
            state[payload.key] = payload.value;
        }
    }
});

export const { SET_BASIC, SET_INPUT_VALUE } = basicAnnexSlice.actions;
