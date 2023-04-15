import { SET_BASIC, SET_INPUT_VALUE } from './basicAnnexSlice';

export const setInputValue = (key, value) => {
    return (dispatch) => dispatch(SET_INPUT_VALUE({ key, value }));
};

export const setBasic = (basicAnnex) => {
    return (dispatch) => dispatch(SET_BASIC(basicAnnex));
};
