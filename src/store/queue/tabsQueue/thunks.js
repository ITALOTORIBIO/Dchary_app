import { SET_QUEUE, SET_NAME } from './tabsQueueSlice';

export const setTabsQueue = (tabsQueue) => {
    return (dispatch) => {
        dispatch(SET_QUEUE(tabsQueue));
    };
};

export const setName = (name) => {
    return (dispatch) => dispatch(SET_NAME(name));
};
