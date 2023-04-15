import {
    MODAL_OPEN_PREVIEW_IMPORT_EXCEL_BLACKLIST,
    BACKDROP_OPEN_PREVIEW_IMPORT_EXCEL_BLACKLIST,
    SNARCKBAR_OPEN_PREVIEW_IMPORT_EXCEL_BLACKLIST
} from './modalPreviewImportExcelBlackListSlice';

export const modalOpenPreviewImportExcelBlackList = (openModalPreviewImportExcelBlackList) => {
    return async (dispatch) => {
        await dispatch(MODAL_OPEN_PREVIEW_IMPORT_EXCEL_BLACKLIST(openModalPreviewImportExcelBlackList));
    };
};

export const backdropOpenPreviewImportExcelBlackList = (openBackdropPreviewImportExcelBlackList) => {
    return async (dispatch) => {
        await dispatch(BACKDROP_OPEN_PREVIEW_IMPORT_EXCEL_BLACKLIST(openBackdropPreviewImportExcelBlackList));
    };
};

export const snackbarOpenPreviewImportExcelBlackList = (openSnackbarPreviewImportExcelBlackList) => {
    return async (dispatch) => {
        await dispatch(SNARCKBAR_OPEN_PREVIEW_IMPORT_EXCEL_BLACKLIST(openSnackbarPreviewImportExcelBlackList));
    };
};
