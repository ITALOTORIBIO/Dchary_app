import { createSlice } from '@reduxjs/toolkit';

export const modalImportExcelErrorBlackListSlice = createSlice({
    name: 'import-error',
    initialState: {
        openModalImportExcelErrorBlackList: false
    },
    reducers: {
        MODAL_OPEN_IMPORT_EXCEL_ERROR_BLACKLIST: (state, { payload }) => {
            state.openModalImportExcelErrorBlackList = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { MODAL_OPEN_IMPORT_EXCEL_ERROR_BLACKLIST } = modalImportExcelErrorBlackListSlice.actions;
