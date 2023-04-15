import { createSlice } from '@reduxjs/toolkit';

export const filterConferencesSlice = createSlice({
    name: 'filterConferences',
    initialState: {
        listConferences: [],
        filteredConferences: []
    },
    reducers: {
        GET_CONFERENCES: (state, { payload }) => {
            state.listConferences = payload;
            state.filteredConferences = payload;
        },
        FILTER_CONFERENCES: (state, { payload }) => {
            state.filteredConferences = payload;
        }
    }
});

export const { GET_CONFERENCES, FILTER_CONFERENCES } = filterConferencesSlice.actions;
