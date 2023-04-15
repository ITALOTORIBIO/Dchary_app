import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        names: '',
        firstLastName: '',
        secondLastName: '',
        pin: '',
        rol: '',
        checkTime: false,
        maxTime: '',
        area: 'General',
        costCenter: 'General',
        extension: '',
        telephone: {
            local: false,
            national: false,
            international: false
        },
        phone: {
            national: false,
            international: false
        }
    },
    reducers: {
        SET_USER: (state, { payload }) => {
            state.names = payload.names;
            state.firstLastName = payload.firstLastName;
            state.secondLastName = payload.secondLastName;
            state.pin = payload.pin;
            state.rol = payload.rol;
            state.area = payload.area;
            state.costCenter = payload.costCenter;
            state.extension = payload.extension;
            state.telephone.local = payload.telephone.local;
            state.telephone.national = payload.telephone.national;
            state.telephone.international = payload.telephone.international;
            state.phone.national = payload.telephone.national;
            state.phone.international = payload.phone.international;
        },
        SET_NAMES: (state, { payload }) => void (state.names = payload),
        SET_FIRST_LASTNAME: (state, { payload }) => void (state.firstLastName = payload),
        SET_SECOND_LASTNAME: (state, { payload }) => void (state.secondLastName = payload),
        SET_PIN: (state, { payload }) => void (state.pin = payload),
        SET_ROL: (state, { payload }) => void (state.rol = payload),
        SET_CHECKTIME: (state, { payload }) => void (state.checkTime = payload),
        SET_MAXTIME: (state, { payload }) => void (state.maxTime = payload),
        SET_AREA: (state, { payload }) => void (state.area = payload),
        SET_COSTCENTER: (state, { payload }) => void (state.costCenter = payload),
        SET_EXTENSION: (state, { payload }) => void (state.extension = payload),
        SET_TELEPHONE_LOCAL: (state, { payload }) => void (state.telephone.local = payload),
        SET_TELEPHONE_NATIONAL: (state, { payload }) => void (state.telephone.national = payload),
        SET_TELEPHONE_INTERNATIONAL: (state, { payload }) => void (state.telephone.international = payload),
        SET_PHONE_NATIONAL: (state, { payload }) => void (state.phone.national = payload),
        SET_PHONE_INTERNATIONAL: (state, { payload }) => void (state.phone.international = payload)
    }
});

export const {
    SET_USER,
    SET_NAMES,
    SET_FIRST_LASTNAME,
    SET_SECOND_LASTNAME,
    SET_PIN,
    SET_ROL,
    SET_CHECKTIME,
    SET_MAXTIME,
    SET_AREA,
    SET_COSTCENTER,
    SET_EXTENSION,
    SET_TELEPHONE_LOCAL,
    SET_TELEPHONE_NATIONAL,
    SET_TELEPHONE_INTERNATIONAL,
    SET_PHONE_NATIONAL,
    SET_PHONE_INTERNATIONAL
} = userSlice.actions;
