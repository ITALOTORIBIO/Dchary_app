import { createSlice } from '@reduxjs/toolkit';

export const provisioningAnnexSlice = createSlice({
    name: 'provisioningAnnex',
    initialState: {
        telefono: {
            brand: '',
            model: '',
            mac: ''
        },
        checkVLAN: false,
        vlan: ''
    },
    reducers: {
        SET_PROVISIONING: (state, { payload }) => {
            state.telefono.brand = payload.telefono.brand;
            state.telefono.model = payload.telefono.model;
            state.telefono.mac = payload.telefono.mac;
            state.checkVLAN = payload.checkVLAN;
            state.vlan = payload.vlan;
        },
        SET_BRAND: (state, { payload }) => {
            state.telefono.brand = payload;
        },
        SET_MODEL: (state, { payload }) => {
            state.telefono.model = payload;
        },
        SET_MAC: (state, { payload }) => {
            state.telefono.mac = payload;
        },
        SET_CHECKVLAN: (state, { payload }) => {
            state.checkVLAN = payload;
        },
        SET_VLAN: (state, { payload }) => {
            state.vlan = payload;
        }
    }
});

export const { SET_PROVISIONING, SET_BRAND, SET_MODEL, SET_MAC, SET_CHECKVLAN, SET_VLAN } = provisioningAnnexSlice.actions;
