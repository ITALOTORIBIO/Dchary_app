import { createSlice } from '@reduxjs/toolkit';

export const tabsQueueSlice = createSlice({
    name: 'tabsQueue',
    initialState: {
        name: ''
    },
    reducers: {
        SET_QUEUE: (state, { payload }) => {
            state.name = payload.name;
        },
        SET_NAME: (state, { payload }) => {
            state.name = payload;
        }
    }
});

export const { SET_QUEUE, SET_NAME } = tabsQueueSlice.actions;
