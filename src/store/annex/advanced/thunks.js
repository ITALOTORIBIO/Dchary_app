import {
    SET_ADVANCED,
    SET_DHCP,
    SET_RECORD,
    SET_CALLGROUP,
    SET_PICKGROUP,
    SET_TLS_SRTP,
    SET_OPEN_VPN,
    SET_CODEC_AVAILABLE,
    SET_CODEC_SELECTED
} from './advancedAnnexSlice';

export const setAdvancedAnnex = (advancedAnnex) => {
    return (dispatch) => {
        dispatch(SET_ADVANCED(advancedAnnex));
    };
};

export const setDHCP = (dhcp) => {
    return (dispatch) => dispatch(SET_DHCP(dhcp));
};

export const setRecord = (record) => {
    return (dispatch) => dispatch(SET_RECORD(record));
};

export const setCallGroup = (callGroup) => {
    return (dispatch) => dispatch(SET_CALLGROUP(callGroup));
};

export const setPickGroup = (pickGroup) => {
    return (dispatch) => dispatch(SET_PICKGROUP(pickGroup));
};

export const setCodecAvailable = (available) => {
    return async (dispatch) => dispatch(SET_CODEC_AVAILABLE(available));
};

export const setCodecSelected = (selected) => {
    return async (dispatch) => dispatch(SET_CODEC_SELECTED(selected));
};

export const setTLS = (tlsSrtp) => {
    return (dispatch) => dispatch(SET_TLS_SRTP(tlsSrtp));
};

export const setOpenVPN = (openVPN) => {
    return (dispatch) => dispatch(SET_OPEN_VPN(openVPN));
};
