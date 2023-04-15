import { MODAL_OPEN_RING_GROUP, BACKDROP_OPEN_RING_GROUP, SNARCKBAR_OPEN_RING_GROUP } from './modalRingGroupSlice';

export const modalOpenRingGroup = (open) => {
    return (dispatch) => {
        dispatch(MODAL_OPEN_RING_GROUP(open));
    };
};

export const backdropOpenRingGroup = (openBackdropRingGroup) => {
    return async (dispatch) => {
        await dispatch(BACKDROP_OPEN_RING_GROUP(openBackdropRingGroup));
    };
};

export const snackbarOpenRingGroup = (openSnackbarRingGroup) => {
    return async (dispatch) => {
        await dispatch(SNARCKBAR_OPEN_RING_GROUP(openSnackbarRingGroup));
    };
};
