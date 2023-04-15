import * as RingGroup from './ringGroupSlice';

export const setRingGroup = (ringGroup) => {
    return (dispatch) => dispatch(RingGroup.SET_RING_GROUP(ringGroup));
};
export const setNombreGrupo = (nombreGrupo) => {
    return (dispatch) => dispatch(RingGroup.SET_NOMBRE_GRUPO(nombreGrupo));
};
export const setNumeroGrupo = (numeroGrupo) => {
    return (dispatch) => dispatch(RingGroup.SET_NUMERO_GRUPO(numeroGrupo));
};
export const setSelectAnexo = (selectAnexo) => {
    return (dispatch) => dispatch(RingGroup.SET_SELECT_ANEXO(selectAnexo));
};
