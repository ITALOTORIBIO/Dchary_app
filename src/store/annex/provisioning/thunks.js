import { SET_PROVISIONING, SET_TELEFONO, SET_BRAND, SET_MODEL, SET_MAC, SET_CHECKVLAN, SET_VLAN } from './provisioningAnnexSlice';

export const setProvisioning = (provisioningAnnex) => {
    return (dispatch) => dispatch(SET_PROVISIONING(provisioningAnnex));
};

export const setBrand = (brand) => {
    return (dispatch) => dispatch(SET_BRAND(brand));
};

export const setModel = (model) => {
    return (dispatch) => dispatch(SET_MODEL(model));
};

export const setMac = (mac) => {
    return (dispatch) => dispatch(SET_MAC(mac));
};

export const setCheckVLAN = (checkVLAN) => {
    return (dispatch) => dispatch(SET_CHECKVLAN(checkVLAN));
};

export const setVLAN = (vlan) => {
    return (dispatch) => dispatch(SET_VLAN(vlan));
};
