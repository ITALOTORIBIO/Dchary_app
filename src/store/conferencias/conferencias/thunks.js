import * as Conferencias from './conferenciasSlice';

export const setConferencias = (conferencias) => {
    return (dispatch) => dispatch(Conferencias.SET_CONFERENCIAS(conferencias));
};
export const setNombre = (nombre) => {
    return (dispatch) => dispatch(Conferencias.SET_NOMBRE(nombre));
};
export const setNumero = (numero) => {
    return (dispatch) => dispatch(Conferencias.SET_NUMERO(numero));
};
export const setPassAdmin = (passAdmin) => {
    return (dispatch) => dispatch(Conferencias.SET_PASS_ADMIN(passAdmin));
};
export const setPassUsu = (passUsu) => {
    return (dispatch) => dispatch(Conferencias.SET_PASS_USU(passUsu));
};
export const setFecha = (fecha) => {
    return (dispatch) => dispatch(Conferencias.SET_FECHA(fecha));
};
export const setHora = (hora) => {
    return (dispatch) => dispatch(Conferencias.SET_HORA(hora));
};
export const setCantPart = (cantPart) => {
    return (dispatch) => dispatch(Conferencias.SET_CANT_PART(cantPart));
};
export const setMusicBienv = (musicBienv) => {
    return (dispatch) => dispatch(Conferencias.SET_MUSIC_BIENV(musicBienv));
};
export const setMusicEspera = (musicEspera) => {
    return (dispatch) => dispatch(Conferencias.SET_MUSIC_ESPERA(musicEspera));
};
export const setCantidad = (cantidad) => {
    return (dispatch) => dispatch(Conferencias.SET_CANTIDAD(cantidad));
};
