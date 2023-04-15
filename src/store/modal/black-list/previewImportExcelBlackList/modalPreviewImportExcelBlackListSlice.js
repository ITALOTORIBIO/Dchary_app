import { createSlice } from '@reduxjs/toolkit';

export const modalPreviewImportExcelBlackListSlice = createSlice({
    name: 'preview-import',
    initialState: {
        openModalPreviewImportExcelBlackList: false,
        openBackdropPreviewImportExcelBlackList: false,
        openSnackbarPreviewImportExcelBlackList: false
    },
    reducers: {
        MODAL_OPEN_PREVIEW_IMPORT_EXCEL_BLACKLIST: (state, { payload }) => {
            state.openModalPreviewImportExcelBlackList = payload;
        },
        BACKDROP_OPEN_PREVIEW_IMPORT_EXCEL_BLACKLIST: (state, { payload }) => {
            state.openBackdropPreviewImportExcelBlackList = payload;
        },
        SNARCKBAR_OPEN_PREVIEW_IMPORT_EXCEL_BLACKLIST: (state, { payload }) => {
            state.openSnackbarPreviewImportExcelBlackList = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    MODAL_OPEN_PREVIEW_IMPORT_EXCEL_BLACKLIST,
    BACKDROP_OPEN_PREVIEW_IMPORT_EXCEL_BLACKLIST,
    SNARCKBAR_OPEN_PREVIEW_IMPORT_EXCEL_BLACKLIST
} = modalPreviewImportExcelBlackListSlice.actions;
