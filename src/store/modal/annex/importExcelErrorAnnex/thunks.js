import { MODAL_OPEN_IMPORT_EXCEL_ERROR_ANNEX } from './modalImportExcelErrorAnnexSlice';

export const modalOpenImportExcelErrorAnnex = (openModalImportExcelErrorAnnex) => {
    return async (dispatch) => {
        await dispatch(MODAL_OPEN_IMPORT_EXCEL_ERROR_ANNEX(openModalImportExcelErrorAnnex));
    };
};
