import { MODAL_OPEN_BLACKLIST_EDIT, BACKDROP_OPEN_BLACKLIST_EDIT, SNARCKBAR_OPEN_BLACKLIST_EDIT } from './modalEditBlackListSlice';

export const modalOpenBlackListEdit = (openModalBlackListEdit) => {
    return async (dispatch) => {
        await dispatch(MODAL_OPEN_BLACKLIST_EDIT(openModalBlackListEdit));
    };
};

export const backdropOpenBlackListEdit = (openBackdropBlackListEdit) => {
    return async (dispatch) => {
        await dispatch(BACKDROP_OPEN_BLACKLIST_EDIT(openBackdropBlackListEdit));
    };
};

export const snackbarOpenBlackListEdit = (openSnackbarBlackListEdit) => {
    return async (dispatch) => {
        await dispatch(SNARCKBAR_OPEN_BLACKLIST_EDIT(openSnackbarBlackListEdit));
    };
};
