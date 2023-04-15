import { FILTER_LIST_ANNEX_SIP, GET_LIST_ANNEX_SIP, FILTER_LIST_ANNEX_CALLER_ID } from './filterSipSlice';

export const getListAnnexSIP = (rows) => {
    return async (dispatch) => {
        await dispatch(GET_LIST_ANNEX_SIP(rows));
    };
};

export const filterListAnnexSIP = (rows, query) => {
    return async (dispatch) => {
        if (query.length !== 0) {
            const result = rows.filter((item) => item.name.includes(query));
            await dispatch(FILTER_LIST_ANNEX_SIP(result));
        } else await dispatch(GET_LIST_ANNEX_SIP(rows));
    };
};

export const filterListAnnexCallerID = (rows, query) => {
    return async (dispatch) => {
        if (query.length !== 0) {
            const result = rows.filter((item) => item.callerid.includes(query));
            await dispatch(FILTER_LIST_ANNEX_CALLER_ID(result));
        } else await dispatch(GET_LIST_ANNEX_SIP(rows));
    };
};
