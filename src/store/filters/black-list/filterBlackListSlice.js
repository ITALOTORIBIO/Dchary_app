import { createSlice } from '@reduxjs/toolkit';

export const filterBlackListSlice = createSlice({
    name: 'filterBlackList',
    initialState: {
        listBlackList: [],
        filteredBlackList: []
    },
    reducers: {
        GET_BLACK_LIST: (state, { payload }) => {
            state.listBlackList = payload;
            state.filteredBlackList = payload;
        },
        FILTER_BLACK_LIST: (state, { payload }) => {
            state.filteredBlackList = payload;
        }
    }
});

export const { GET_BLACK_LIST, FILTER_BLACK_LIST } = filterBlackListSlice.actions;
