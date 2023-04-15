import { MODAL_OPEN_RING_GROUP_EDIT, BACKDROP_OPEN_RING_GROUP_EDIT, SNARCKBAR_OPEN_RING_GROUP_EDIT } from './modalEditRingGroupSlice';

export const modalOpenRingGroupEdit = (openModalRingGroupEdit) => {
    return async (dispatch) => {
        await dispatch(MODAL_OPEN_RING_GROUP_EDIT(openModalRingGroupEdit));
    };
};

export const backdropOpenRingGroupEdit = (openBackdropRingGroupEdit) => {
    return async (dispatch) => {
        await dispatch(BACKDROP_OPEN_RING_GROUP_EDIT(openBackdropRingGroupEdit));
    };
};

export const snackbarOpenRingGroupEdit = (openSnackbarRingGroupEdit) => {
    return async (dispatch) => {
        await dispatch(SNARCKBAR_OPEN_RING_GROUP_EDIT(openSnackbarRingGroupEdit));
    };
};
