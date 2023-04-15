import { MODAL_OPEN_ANNEX_EDIT, BACKDROP_OPEN_EDIT, SNARCKBAR_OPEN_EDIT } from './modalEditAnnexSlice';

export const modalOpenAnnexEdit = (openModalEdit) => {
    return async (dispatch) => {
        await dispatch(MODAL_OPEN_ANNEX_EDIT(openModalEdit));
    };
};

export const backdropOpenEdit = (openBackdropEdit) => {
    return async (dispatch) => {
        await dispatch(BACKDROP_OPEN_EDIT(openBackdropEdit));
    };
};

export const snackbarOpenEdit = (openSnackbarEdit) => {
    return async (dispatch) => {
        await dispatch(SNARCKBAR_OPEN_EDIT(openSnackbarEdit));
    };
};
