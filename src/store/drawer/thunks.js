import { MENU_OPEN, SET_MENU } from './drawerSlice';

export const setMenu = (opened) => {
    return (dispatch) => {
        dispatch(SET_MENU(opened));
    };
};

export const menuOpen = (isOpen) => {
    return (dispatch) => {
        dispatch(MENU_OPEN(isOpen));
    };
};
