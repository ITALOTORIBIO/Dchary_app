import {
    SET_MONITORING,
    SET_COLA,
    SET_NUMERO_ANEXO,
    SET_CORREO,
    SET_MINIMO_TIEMPO,
    SET_MEDIA_TIEMPO,
    SET_MAXIMO_TIEMPO
} from './monitoringQueueSlice';

export const setMonitoring = (otherOptionsQueue) => {
    return (dispatch) => {
        dispatch(SET_MONITORING(otherOptionsQueue));
    };
};

export const setCola = (cola) => {
    return (dispatch) => dispatch(SET_COLA(cola));
};

export const setNumAnexo = (numAnexo) => {
    return (dispatch) => dispatch(SET_NUMERO_ANEXO(numAnexo));
};

export const setCorreo = (correo) => {
    return (dispatch) => dispatch(SET_CORREO(correo));
};

export const setMinTiempo = (minTiempo) => {
    return (dispatch) => dispatch(SET_MINIMO_TIEMPO(minTiempo));
};

export const setMedTiempo = (medTiempo) => {
    return (dispatch) => dispatch(SET_MEDIA_TIEMPO(medTiempo));
};

export const setMaxTiempo = (maxTiempo) => {
    return (dispatch) => dispatch(SET_MAXIMO_TIEMPO(maxTiempo));
};
