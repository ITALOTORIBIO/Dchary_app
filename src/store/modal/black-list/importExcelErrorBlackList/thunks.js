import { MODAL_OPEN_IMPORT_EXCEL_ERROR_BLACKLIST } from './modalImportExcelErrorBlackListSlice';

export const modalOpenImportExcelErrorBlackList = (openModalImportExcelErrorBlackList) => {
    return async (dispatch) => {
        await dispatch(MODAL_OPEN_IMPORT_EXCEL_ERROR_BLACKLIST(openModalImportExcelErrorBlackList));
    };
};
