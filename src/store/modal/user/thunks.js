import { MODAL_OPEN_USER } from './modalUserSlice';

export const modalOpenUser = (open) => {
    return (dispatch) => {
        dispatch(MODAL_OPEN_USER(open));
    };
};
