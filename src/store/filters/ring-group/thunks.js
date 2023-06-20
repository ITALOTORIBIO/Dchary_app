import { GET_RING_GROUP, FILTER_RING_GROUP } from './filterRingGroupSlice';

export const getRingGroup = (rows) => {
    return async (dispatch) => {
        await dispatch(GET_RING_GROUP(rows));
    };
};

export const filterRingGroup = (rows, query) => {
    return async (dispatch) => {
        if (query.length !== 0) {
            const result = rows.filter((item) => item.estado_prod.toString().includes(query));
            await dispatch(FILTER_RING_GROUP(result));
        } else await dispatch(GET_RING_GROUP(rows));
    };
};
