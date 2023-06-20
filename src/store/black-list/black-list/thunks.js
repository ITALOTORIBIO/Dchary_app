import * as BlackList from './blackListSlice';

export const setBlackList = (blackList) => {
    return (dispatch) => dispatch(BlackList.SET_BLACK_LIST(blackList));
};
export const setNombre = (nombre) => {
    return (dispatch) => dispatch(BlackList.SET_NOMBRE(nombre));
};
export const setCorreo = (correo) => {
    return (dispatch) => dispatch(BlackList.SET_CORREO(correo));
};
export const setRol = (rol) => {
    return (dispatch) => dispatch(BlackList.SET_ROL(rol));
};
export const setUsername = (username) => {
    return (dispatch) => dispatch(BlackList.SET_USERNAME(username));
};
export const setPassword = (password) => {
    return (dispatch) => dispatch(BlackList.SET_PASSWORD(password));
};
