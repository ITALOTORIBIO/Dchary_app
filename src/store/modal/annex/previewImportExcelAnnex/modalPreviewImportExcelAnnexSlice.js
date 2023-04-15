import { createSlice } from '@reduxjs/toolkit';

export const modalPreviewImportExcelAnnexSlice = createSlice({
    name: 'preview-import',
    initialState: {
        openModalPreviewImportExcelAnnex: false,
        openBackdropPreviewImportExcelAnnex: false,
        openSnackbarPreviewImportExcelAnnex: false
    },
    reducers: {
        MODAL_OPEN_PREVIEW_IMPORT_EXCEL_ANNEX: (state, { payload }) => {
            state.openModalPreviewImportExcelAnnex = payload;
        },
        BACKDROP_OPEN_PREVIEW_IMPORT_EXCEL_ANNEX: (state, { payload }) => {
            state.openBackdropPreviewImportExcelAnnex = payload;
        },
        SNARCKBAR_OPEN_PREVIEW_IMPORT_EXCEL_ANNEX: (state, { payload }) => {
            state.openSnackbarPreviewImportExcelAnnex = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    MODAL_OPEN_PREVIEW_IMPORT_EXCEL_ANNEX,
    BACKDROP_OPEN_PREVIEW_IMPORT_EXCEL_ANNEX,
    SNARCKBAR_OPEN_PREVIEW_IMPORT_EXCEL_ANNEX
} = modalPreviewImportExcelAnnexSlice.actions;
