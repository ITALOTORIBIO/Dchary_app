import { createSlice } from '@reduxjs/toolkit';

export const filterAnnexSipSlice = createSlice({
    name: 'filterAnnexSip',
    initialState: {
        listAnnexSIP: [],
        filteredListAnnexSIP: []
    },
    reducers: {
        GET_LIST_ANNEX_SIP: (state, { payload }) => {
            state.listAnnexSIP = payload;
            state.filteredListAnnexSIP = payload;
        },
        FILTER_LIST_ANNEX_SIP: (state, { payload }) => {
            state.filteredListAnnexSIP = payload;
        },
        FILTER_LIST_ANNEX_CALLER_ID: (state, { payload }) => {
            state.filteredListAnnexSIP = payload;
        }
    }
});

export const { GET_LIST_ANNEX_SIP, FILTER_LIST_ANNEX_SIP, FILTER_LIST_ANNEX_CALLER_ID } = filterAnnexSipSlice.actions;
