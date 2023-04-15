import { MODAL_OPEN_ANNEX_DELETE, BACKDROP_OPEN_DELETE, SNARCKBAR_OPEN_DELETE } from './modalDeleteAnnexSlice';

export const modalOpenAnnexDelete = (openModalDelete) => {
    return async (dispatch) => {
        await dispatch(MODAL_OPEN_ANNEX_DELETE(openModalDelete));
    };
};

export const backdropOpenDelete = (openBackdropDelete) => {
    return async (dispatch) => {
        await dispatch(BACKDROP_OPEN_DELETE(openBackdropDelete));
    };
};

export const snackbarOpenDelete = (openSnackbarDelete) => {
    return async (dispatch) => {
        await dispatch(SNARCKBAR_OPEN_DELETE(openSnackbarDelete));
    };
};
