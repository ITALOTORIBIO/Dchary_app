import {
    MODAL_OPEN_PREVIEW_IMPORT_EXCEL_RING_GROUP,
    BACKDROP_OPEN_PREVIEW_IMPORT_EXCEL_RING_GROUP,
    SNARCKBAR_OPEN_PREVIEW_IMPORT_EXCEL_RING_GROUP
} from './modalPreviewImportExcelRingGroupSlice';

export const modalOpenPreviewImportExcelRingGroup = (openModalPreviewImportExcelRingGroup) => {
    return async (dispatch) => {
        await dispatch(MODAL_OPEN_PREVIEW_IMPORT_EXCEL_RING_GROUP(openModalPreviewImportExcelRingGroup));
    };
};

export const backdropOpenPreviewImportExcelRingGroup = (openBackdropPreviewImportExcelRingGroup) => {
    return async (dispatch) => {
        await dispatch(BACKDROP_OPEN_PREVIEW_IMPORT_EXCEL_RING_GROUP(openBackdropPreviewImportExcelRingGroup));
    };
};

export const snackbarOpenPreviewImportExcelRingGroup = (openSnackbarPreviewImportExcelRingGroup) => {
    return async (dispatch) => {
        await dispatch(SNARCKBAR_OPEN_PREVIEW_IMPORT_EXCEL_RING_GROUP(openSnackbarPreviewImportExcelRingGroup));
    };
};
