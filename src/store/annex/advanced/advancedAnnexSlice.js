import { createSlice } from '@reduxjs/toolkit';

export const advancedAnnexSlice = createSlice({
    name: 'advancedAnnex',
    initialState: {
        dhcp: 'dynamic',
        record: 'Ninguna',
        callGroup: '',
        pickGroup: '',
        codec: {
            available: ['ILBC', 'g723', 'g723.1', 'g726', 'g726.1', 'g729'],
            selected: ['alaw', 'ulaw', 'gsm']
        },
        tlsSrtp: false,
        openVPN: false
    },
    reducers: {
        SET_ADVANCED: (state, { payload }) => {
            state.dhcp = payload.dhcp;
            state.record = payload.record;
            state.callGroup = payload.callGroup;
            state.pickGroup = payload.pickGroup;
            state.codec.available = payload.codec.available;
            state.codec.selected = payload.codec.selected;
            state.tlsSrtp = payload.tlsSrtp;
            state.openVPN = payload.openVPN;
        },
        SET_DHCP: (state, { payload }) => {
            state.dhcp = payload;
        },
        SET_RECORD: (state, { payload }) => {
            state.record = payload;
        },
        SET_CALLGROUP: (state, { payload }) => {
            state.callGroup = payload;
        },
        SET_PICKGROUP: (state, { payload }) => {
            state.pickGroup = payload;
        },
        SET_CODEC_AVAILABLE: (state, { payload }) => {
            state.codec.available = payload;
        },
        SET_CODEC_SELECTED: (state, { payload }) => {
            state.codec.selected = payload;
        },
        SET_TLS_SRTP: (state, { payload }) => {
            state.tlsSrtp = payload;
        },
        SET_OPEN_VPN: (state, { payload }) => {
            state.openVPN = payload;
        }
    }
});

export const {
    SET_ADVANCED,
    SET_DHCP,
    SET_RECORD,
    SET_CALLGROUP,
    SET_CODEC_AVAILABLE,
    SET_CODEC_SELECTED,
    SET_PICKGROUP,
    SET_TLS_SRTP,
    SET_OPEN_VPN
} = advancedAnnexSlice.actions;
