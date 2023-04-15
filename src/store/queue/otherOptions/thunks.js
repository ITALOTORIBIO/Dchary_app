import {
    SET_OTHER_OPTIONS,
    SET_TIMBRAR,
    SET_REINICIAR,
    SET_UNIRSE,
    SET_DEJAR,
    SET_MUSICA,
    SET_ANUNCIAR_ESPERA,
    SET_ANUNCIAR_TIEMPO,
    SET_ANUNCIAR_POSICION,
    SET_PAUSADO,
    SET_POSICION,
    SET_FORMATOGRABACIONMUSICA
} from './otherOptionsQueueSlice';

export const setOtherOptionsQueue = (otherOptionsQueue) => {
    return (dispatch) => {
        dispatch(SET_OTHER_OPTIONS(otherOptionsQueue));
    };
};

export const setTimbrar = (timbrar) => {
    return (dispatch) => dispatch(SET_TIMBRAR(timbrar));
};

export const setReiniciar = (reiniciar) => {
    return (dispatch) => dispatch(SET_REINICIAR(reiniciar));
};

export const setUnirse = (unirse) => {
    return (dispatch) => dispatch(SET_UNIRSE(unirse));
};

export const setDejar = (dejar) => {
    return (dispatch) => dispatch(SET_DEJAR(dejar));
};

export const setMusica = (musica) => {
    return (dispatch) => dispatch(SET_MUSICA(musica));
};

export const setAnunciarEspera = (anunciarEspera) => {
    return (dispatch) => dispatch(SET_ANUNCIAR_ESPERA(anunciarEspera));
};

export const setAnunciarTiempo = (anunciarTiempo) => {
    return (dispatch) => dispatch(SET_ANUNCIAR_TIEMPO(anunciarTiempo));
};

export const setAnunciarPosicion = (anunciarPosicion) => {
    return (dispatch) => dispatch(SET_ANUNCIAR_POSICION(anunciarPosicion));
};

export const setPausado = (pausado) => {
    return (dispatch) => dispatch(SET_PAUSADO(pausado));
};

export const setPosicion = (posicion) => {
    return (dispatch) => dispatch(SET_POSICION(posicion));
};

export const setFormatoGrabacionMusica = (formatoGrabacionMusica) => {
    return (dispatch) => dispatch(SET_FORMATOGRABACIONMUSICA(formatoGrabacionMusica));
};
