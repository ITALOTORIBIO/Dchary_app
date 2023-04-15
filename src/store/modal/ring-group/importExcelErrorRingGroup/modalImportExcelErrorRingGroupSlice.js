import { createSlice } from '@reduxjs/toolkit';

export const modalImportExcelErrorRingGroupSlice = createSlice({
    name: 'import-error',
    initialState: {
        openModalImportExcelErrorRingGroup: false
    },
    reducers: {
        MODAL_OPEN_IMPORT_EXCEL_ERROR_RING_GROUP: (state, { payload }) => {
            state.openModalImportExcelErrorRingGroup = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { MODAL_OPEN_IMPORT_EXCEL_ERROR_RING_GROUP } = modalImportExcelErrorRingGroupSlice.actions;
