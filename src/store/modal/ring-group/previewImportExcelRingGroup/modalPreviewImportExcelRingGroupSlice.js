import { createSlice } from '@reduxjs/toolkit';

export const modalPreviewImportExcelRingGroupSlice = createSlice({
    name: 'preview-import',
    initialState: {
        openModalPreviewImportExcelRingGroup: false,
        openBackdropPreviewImportExcelRingGroup: false,
        openSnackbarPreviewImportExcelRingGroup: false
    },
    reducers: {
        MODAL_OPEN_PREVIEW_IMPORT_EXCEL_RING_GROUP: (state, { payload }) => {
            state.openModalPreviewImportExcelRingGroup = payload;
        },
        BACKDROP_OPEN_PREVIEW_IMPORT_EXCEL_RING_GROUP: (state, { payload }) => {
            state.openBackdropPreviewImportExcelRingGroup = payload;
        },
        SNARCKBAR_OPEN_PREVIEW_IMPORT_EXCEL_RING_GROUP: (state, { payload }) => {
            state.openSnackbarPreviewImportExcelRingGroup = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    MODAL_OPEN_PREVIEW_IMPORT_EXCEL_RING_GROUP,
    BACKDROP_OPEN_PREVIEW_IMPORT_EXCEL_RING_GROUP,
    SNARCKBAR_OPEN_PREVIEW_IMPORT_EXCEL_RING_GROUP
} = modalPreviewImportExcelRingGroupSlice.actions;
