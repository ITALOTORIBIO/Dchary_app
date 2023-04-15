import { MODAL_OPEN_IMPORT_EXCEL_ERROR_RING_GROUP } from './modalImportExcelErrorRingGroupSlice';

export const modalOpenImportExcelErrorRingGroup = (openModalImportExcelErrorRingGroup) => {
    return async (dispatch) => {
        await dispatch(MODAL_OPEN_IMPORT_EXCEL_ERROR_RING_GROUP(openModalImportExcelErrorRingGroup));
    };
};
