import { MODAL_OPEN_QUEUE } from './modalQueueSlice';

export const modalOpenQueue = (open) => {
    return (dispatch) => {
        dispatch(MODAL_OPEN_QUEUE(open));
    };
};
