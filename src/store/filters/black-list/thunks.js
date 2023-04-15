import { GET_BLACK_LIST, FILTER_BLACK_LIST } from './filterBlackListSlice';

export const getBlackList = (rows) => {
    return async (dispatch) => {
        await dispatch(GET_BLACK_LIST(rows));
    };
};

export const filterBlackList = (rows, query1, query2, query3) => {
    return async (dispatch) => {
        if (query1.length !== 0 || query2.length !== 0 || query3.length !== 0) {
            let refactorQuery2;
            let refactorQuery3;
            if (query2 === 'Todos') {
                refactorQuery2 = '';
            } else {
                refactorQuery2 = query2;
            }
            if (query3 === 'Activo') {
                refactorQuery3 = true;
            } else if (query3 === 'Inactivo') {
                refactorQuery3 = false;
            } else {
                refactorQuery3 = 'none';
            }
            const result = rows.filter((item) => {
                if (query1.length !== 0 && refactorQuery2.length !== 0 && refactorQuery3 === 'none') {
                    return item.num_tlf.includes(query1) && item.type_call === refactorQuery2;
                } else if (query1.length !== 0 && refactorQuery2.length === 0 && refactorQuery3 != 'none') {
                    return item.num_tlf.includes(query1) && item.status === refactorQuery3;
                } else if (query1.length === 0 && refactorQuery2.length !== 0 && refactorQuery3 != 'none') {
                    return item.type_call === refactorQuery2 && item.status === refactorQuery3;
                } else if (query1.length === 0 && refactorQuery2.length === 0 && refactorQuery3 != 'none') {
                    return item.status === refactorQuery3;
                } else if (query1.length !== 0 && refactorQuery2.length === 0 && refactorQuery3 === 'none') {
                    return item.num_tlf.includes(query1);
                } else if (query1.length === 0 && refactorQuery2.length !== 0 && refactorQuery3 === 'none') {
                    return item.type_call.includes(refactorQuery2);
                } else if (query1.length !== 0 && refactorQuery2.length !== 0 && refactorQuery3 !== 'none') {
                    return item.num_tlf.includes(query1) && item.type_call === refactorQuery2 && item.status === refactorQuery3;
                } else {
                    return item;
                }
            });
            await dispatch(FILTER_BLACK_LIST(result));
        } else await dispatch(GET_BLACK_LIST(rows));
    };
};
