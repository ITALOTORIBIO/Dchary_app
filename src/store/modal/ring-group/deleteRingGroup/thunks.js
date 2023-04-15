import {
    MODAL_OPEN_RING_GROUP_DELETE,
    BACKDROP_OPEN_RING_GROUP_DELETE,
    SNARCKBAR_OPEN_RING_GROUP_DELETE
} from './modalDeleteRingGroupSlice';

export const modalOpenRingGroupDelete = (openModalRingGroupDelete) => {
    return async (dispatch) => {
        await dispatch(MODAL_OPEN_RING_GROUP_DELETE(openModalRingGroupDelete));
    };
};

export const backdropOpenRingGroupDelete = (openBackdropRingGroupDelete) => {
    return async (dispatch) => {
        await dispatch(BACKDROP_OPEN_RING_GROUP_DELETE(openBackdropRingGroupDelete));
    };
};

export const snackbarOpenRingGroupDelete = (openSnackbarRingGroupDelete) => {
    return async (dispatch) => {
        await dispatch(SNARCKBAR_OPEN_RING_GROUP_DELETE(openSnackbarRingGroupDelete));
    };
};
