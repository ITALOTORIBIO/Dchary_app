import { GET_CONFERENCES, FILTER_CONFERENCES } from './filterConferencesSlice';

export const getConferences = (rows) => {
    return async (dispatch) => {
        await dispatch(GET_CONFERENCES(rows));
    };
};

export const filterConferences = (rows, query) => {
    return async (dispatch) => {
        if (query.length !== 0) {
            const result = rows.filter((item) => item.num_meet.toString().includes(query));
            await dispatch(FILTER_CONFERENCES(result));
        } else await dispatch(GET_CONFERENCES(rows));
    };
};
