import { createSlice } from '@reduxjs/toolkit';
import config from 'config';

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
        isOpen: [], // for active default menu
        fontFamily: config.fontFamily,
        borderRadius: config.borderRadius,
        opened: true
    },
    reducers: {
        MENU_OPEN: (state, { payload }) => {
            state.isOpen = [payload];
        },
        SET_MENU: (state, { payload }) => {
            state.opened = payload;
        },
        SET_FONT_FAMILY: (state, { payload }) => {
            state.fontFamily = payload;
        },
        SET_BORDER_RADIUS: (state, { payload }) => {
            state.borderRadius = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { MENU_OPEN, SET_MENU, SET_FONT_FAMILY, SET_BORDER_RADIUS } = drawerSlice.actions;
