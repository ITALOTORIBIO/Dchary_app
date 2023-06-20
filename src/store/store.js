import { configureStore } from '@reduxjs/toolkit';
import { advancedAnnexSlice, basicAnnexSlice, provisioningAnnexSlice } from './annex';
import { authSlice } from './auth';
import { drawerSlice } from './drawer';
import { userSlice } from './user';
import {
    modalAnnexSlice,
    modalEditAnnexSlice,
    modalDeleteAnnexSlice,
    modalPreviewImportExcelAnnexSlice,
    modalImportExcelErrorAnnexSlice,
    modalUserSlice,
    modalBlackListSlice,
    modalEditBlackListSlice,
    modalDeleteBlackListSlice,
    modalPreviewImportExcelBlackListSlice,
    modalImportExcelErrorBlackListSlice,
    modalRingGroupSlice,
    modalEditRingGroupSlice,
    modalDeleteRingGroupSlice,
    modalPreviewImportExcelRingGroupSlice,
    modalImportExcelErrorRingGroupSlice,
    modalQueueSlice,
    modalConferenciasSlice,
    modalAudioSlice
} from './modal';
import { blackListSlice } from './black-list';
import { ringGroupSlice } from './ring-group';
import { configurationQueueSlice, otherOptionsQueueSlice, tabsQueueSlice, monitoringQueueSlice } from './queue';
import { conferenciasSlice } from './conferencias';
import { filterAnnexSipSlice, filterBlackListSlice, filterConferencesSlice, filterRingGroupSlice } from './filters';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        toogle: drawerSlice.reducer,
        modalAnnex: modalAnnexSlice.reducer,
        modalEditAnnex: modalEditAnnexSlice.reducer,
        modalDeleteAnnex: modalDeleteAnnexSlice.reducer,
        modalPreviewImportExcelAnnex: modalPreviewImportExcelAnnexSlice.reducer,
        modalImportExcelErrorAnnex: modalImportExcelErrorAnnexSlice.reducer,
        modalRingGroup: modalRingGroupSlice.reducer,
        modalEditRingGroup: modalEditRingGroupSlice.reducer,
        modalDeleteRingGroup: modalDeleteRingGroupSlice.reducer,
        modalPreviewImportExcelRingGroup: modalPreviewImportExcelRingGroupSlice.reducer,
        modalImportExcelErrorRingGroup: modalImportExcelErrorRingGroupSlice.reducer,
        modalUser: modalUserSlice.reducer,
        modalBlackList: modalBlackListSlice.reducer,
        modalEditBlackList: modalEditBlackListSlice.reducer,
        modalDeleteBlackList: modalDeleteBlackListSlice.reducer,
        modalPreviewImportExcelBlackList: modalPreviewImportExcelBlackListSlice.reducer,
        modalImportExcelErrorBlackList: modalImportExcelErrorBlackListSlice.reducer,
        modalConferencias: modalConferenciasSlice.reducer,
        modalQueue: modalQueueSlice.reducer,
        modalAudio: modalAudioSlice.reducer,
        advancedAnnex: advancedAnnexSlice.reducer,
        basicAnnex: basicAnnexSlice.reducer,
        provisioningAnnex: provisioningAnnexSlice.reducer,
        informationUser: userSlice.reducer,
        blackList: blackListSlice.reducer,
        ringGroup: ringGroupSlice.reducer,
        configurationQueue: configurationQueueSlice.reducer,
        otherOptionsQueue: otherOptionsQueueSlice.reducer,
        tabsQueue: tabsQueueSlice.reducer,
        monitoringQueue: monitoringQueueSlice.reducer,
        conferencias: conferenciasSlice.reducer,
        filterAnnexSip: filterAnnexSipSlice.reducer,
        filterBlackList: filterBlackListSlice.reducer,
        filterRingGroup: filterRingGroupSlice.reducer,
        filterConferences: filterConferencesSlice.reducer
    }
});
