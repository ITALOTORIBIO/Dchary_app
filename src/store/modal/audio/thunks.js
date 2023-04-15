import { MODAL_OPEN_AUDIO } from './modalAudioSlice';

export const modalOpenAudio = (open) => {
    return (dispatch) => {
        dispatch(MODAL_OPEN_AUDIO(open));
    };
};
