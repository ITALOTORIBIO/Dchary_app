import { MODAL_OPEN_BLACK_LIST, BACKDROP_OPEN_BLACK_LIST, SNARCKBAR_OPEN_BLACK_LIST } from './modalBlackListSlice';

export const modalOpenBlackList = (open) => {
    return (dispatch) => {
        dispatch(MODAL_OPEN_BLACK_LIST(open));
    };
};

export const backdropOpenBlackList = (openBackdropBlackList) => {
    return async (dispatch) => {
        await dispatch(BACKDROP_OPEN_BLACK_LIST(openBackdropBlackList));
    };
};

export const snackbarOpenBlackList = (openSnackbarBlackList) => {
    return async (dispatch) => {
        await dispatch(SNARCKBAR_OPEN_BLACK_LIST(openSnackbarBlackList));
    };
};
