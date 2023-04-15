import { createSlice } from '@reduxjs/toolkit';

export const modalImportExcelErrorAnnexSlice = createSlice({
    name: 'import-error',
    initialState: {
        openModalImportExcelErrorAnnex: false
    },
    reducers: {
        MODAL_OPEN_IMPORT_EXCEL_ERROR_ANNEX: (state, { payload }) => {
            state.openModalImportExcelErrorAnnex = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { MODAL_OPEN_IMPORT_EXCEL_ERROR_ANNEX } = modalImportExcelErrorAnnexSlice.actions;
