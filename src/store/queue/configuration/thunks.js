import {
    SET_CONFIGURATION,
    SET_ESTRATEGIA,
    SET_NIVELSERVICIO,
    SET_PESO,
    SET_MAXUSUARIOSCOLA,
    SET_FORMATOGRABACION,
    SET_CONTEXTO,
    SET_TIEMPOESPERACONEXIONAGENTE,
    SET_TIEMPOTIMBRADOAGENTE,
    SET_TIEMPODESCANSOENTRELLAMADA,
    SET_TIEMPOESPERATIMBRADO,
    SET_FRECUENCIAANUNCIOCOLA
} from './configurationQueueSlice';

export const setconfigurationQueue = (configurationQueue) => {
    return (dispatch) => {
        dispatch(SET_CONFIGURATION(configurationQueue));
    };
};

export const setEstrategia = (estrategia) => {
    return (dispatch) => dispatch(SET_ESTRATEGIA(estrategia));
};

export const setNivelServicio = (nivelServicio) => {
    return (dispatch) => dispatch(SET_NIVELSERVICIO(nivelServicio));
};

export const setPeso = (peso) => {
    return (dispatch) => dispatch(SET_PESO(peso));
};

export const setMaxUsuariosCola = (maxUsuariosCola) => {
    return (dispatch) => dispatch(SET_MAXUSUARIOSCOLA(maxUsuariosCola));
};

export const setFormatoGrabacion = (formatoGrabacion) => {
    return async (dispatch) => dispatch(SET_FORMATOGRABACION(formatoGrabacion));
};

export const setContexto = (contexto) => {
    return async (dispatch) => dispatch(SET_CONTEXTO(contexto));
};

export const setTiempoEsperaConexionAgente = (tiempoEsperaConexionAgente) => {
    return (dispatch) => dispatch(SET_TIEMPOESPERACONEXIONAGENTE(tiempoEsperaConexionAgente));
};

export const setTiempoTimbradoAgente = (tiempoTimbradoAgente) => {
    return (dispatch) => dispatch(SET_TIEMPOTIMBRADOAGENTE(tiempoTimbradoAgente));
};

export const setTiempoDescansoEntreLlamada = (tiempoDescansoEntreLlamada) => {
    return (dispatch) => dispatch(SET_TIEMPODESCANSOENTRELLAMADA(tiempoDescansoEntreLlamada));
};

export const setTiempoEsperaTimbrado = (tiempoEsperaTimbrado) => {
    return (dispatch) => dispatch(SET_TIEMPOESPERATIMBRADO(tiempoEsperaTimbrado));
};

export const setFrecuenciaAnuncioCola = (frecuenciaAnuncioCola) => {
    return (dispatch) => dispatch(SET_FRECUENCIAANUNCIOCOLA(frecuenciaAnuncioCola));
};
