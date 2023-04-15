import {
    MODAL_OPEN_PREVIEW_IMPORT_EXCEL_ANNEX,
    BACKDROP_OPEN_PREVIEW_IMPORT_EXCEL_ANNEX,
    SNARCKBAR_OPEN_PREVIEW_IMPORT_EXCEL_ANNEX
} from './modalPreviewImportExcelAnnexSlice';

export const modalOpenPreviewImportExcelAnnex = (openModalPreviewImportExcelAnnex) => {
    return async (dispatch) => {
        await dispatch(MODAL_OPEN_PREVIEW_IMPORT_EXCEL_ANNEX(openModalPreviewImportExcelAnnex));
    };
};

export const backdropOpenPreviewImportExcelAnnex = (openBackdropPreviewImportExcelAnnex) => {
    return async (dispatch) => {
        await dispatch(BACKDROP_OPEN_PREVIEW_IMPORT_EXCEL_ANNEX(openBackdropPreviewImportExcelAnnex));
    };
};

export const snackbarOpenPreviewImportExcelAnnex = (openSnackbarPreviewImportExcelAnnex) => {
    return async (dispatch) => {
        await dispatch(SNARCKBAR_OPEN_PREVIEW_IMPORT_EXCEL_ANNEX(openSnackbarPreviewImportExcelAnnex));
    };
};
