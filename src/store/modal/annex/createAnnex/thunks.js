import { MODAL_OPEN_ANNEX, BACKDROP_OPEN, SNARCKBAR_OPEN } from './modalAnnexSlice';

export const modalOpenAnnex = (openModal) => {
    return async (dispatch) => {
        await dispatch(MODAL_OPEN_ANNEX(openModal));
    };
};

export const backdropOpen = (openBackdrop) => {
    return async (dispatch) => {
        await dispatch(BACKDROP_OPEN(openBackdrop));
    };
};

export const snackbarOpen = (openSnackbar) => {
    return async (dispatch) => {
        await dispatch(SNARCKBAR_OPEN(openSnackbar));
    };
};
