import { MODAL_OPEN_CONFERENCIAS } from './modalConferenciasSlice';

export const modalOpenConferencias = (open) => {
    return (dispatch) => {
        dispatch(MODAL_OPEN_CONFERENCIAS(open));
    };
};
