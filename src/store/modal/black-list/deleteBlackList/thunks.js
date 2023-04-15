import { MODAL_OPEN_BLACKLIST_DELETE, BACKDROP_OPEN_BLACKLIST_DELETE, SNARCKBAR_OPEN_BLACKLIST_DELETE } from './modalDeleteBlackListSlice';

export const modalOpenBlackListDelete = (openModalBlackListDelete) => {
    return async (dispatch) => {
        await dispatch(MODAL_OPEN_BLACKLIST_DELETE(openModalBlackListDelete));
    };
};

export const backdropOpenBlackListDelete = (openBackdropBlackListDelete) => {
    return async (dispatch) => {
        await dispatch(BACKDROP_OPEN_BLACKLIST_DELETE(openBackdropBlackListDelete));
    };
};

export const snackbarOpenBlackListDelete = (openSnackbarBlackListDelete) => {
    return async (dispatch) => {
        await dispatch(SNARCKBAR_OPEN_BLACKLIST_DELETE(openSnackbarBlackListDelete));
    };
};
