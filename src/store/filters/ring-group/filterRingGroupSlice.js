import { createSlice } from '@reduxjs/toolkit';

export const filterRingGroupSlice = createSlice({
    name: 'filterRingGroup',
    initialState: {
        listRingGroup: [],
        filteredRingGroup: []
    },
    reducers: {
        GET_RING_GROUP: (state, { payload }) => {
            state.listRingGroup = payload;
            state.filteredRingGroup = payload;
        },
        FILTER_RING_GROUP: (state, { payload }) => {
            state.filteredRingGroup = payload;
        }
    }
});

export const { GET_RING_GROUP, FILTER_RING_GROUP } = filterRingGroupSlice.actions;
