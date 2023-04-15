import * as BlackList from './blackListSlice';

export const setBlackList = (blackList) => {
    return (dispatch) => dispatch(BlackList.SET_BLACK_LIST(blackList));
};
export const setTipo = (tipo) => {
    return (dispatch) => dispatch(BlackList.SET_TIPO(tipo));
};
export const setNumero = (numero) => {
    return (dispatch) => dispatch(BlackList.SET_NUMERO(numero));
};
export const setDescripcion = (descripcion) => {
    return (dispatch) => dispatch(BlackList.SET_DESCRIPCION(descripcion));
};
export const setEstado = (estado) => {
    return (dispatch) => dispatch(BlackList.SET_ESTADO(estado));
};
