import * as User from './userSlice';

export const setUser = (user) => {
    return (dispatch) => dispatch(User.SET_USER(user));
};

export const setNames = (names) => {
    return (dispatch) => dispatch(User.SET_NAMES(names));
};

export const setFirstLastName = (firstLastName) => {
    return (dispatch) => dispatch(User.SET_FIRST_LASTNAME(firstLastName));
};

export const setSecondLastName = (secondLastName) => {
    return (dispatch) => dispatch(User.SET_SECOND_LASTNAME(secondLastName));
};

export const setPin = (pin) => {
    return (dispatch) => dispatch(User.SET_PIN(pin));
};

export const setRol = (rol) => {
    return (dispatch) => dispatch(User.SET_ROL(rol));
};

export const setCheckTime = (checkTime) => {
    return (dispatch) => dispatch(User.SET_CHECKTIME(checkTime));
};

export const setMaxTime = (maxTime) => {
    return (dispatch) => dispatch(User.SET_MAXTIME(maxTime));
};

export const setArea = (area) => {
    return (dispatch) => dispatch(User.SET_AREA(area));
};

export const setCostCenter = (costCenter) => {
    return (dispatch) => dispatch(User.SET_COSTCENTER(costCenter));
};

export const setExtension = (extension) => {
    return (dispatch) => dispatch(User.SET_EXTENSION(extension));
};

export const setTelephoneLocal = (telephoneLocal) => {
    return (dispatch) => dispatch(User.SET_TELEPHONE_LOCAL(telephoneLocal));
};

export const setTelephoneNational = (telephoneNational) => {
    return (dispatch) => dispatch(User.SET_TELEPHONE_NATIONAL(telephoneNational));
};

export const setTelephoneInternational = (telephoneInternational) => {
    return (dispatch) => dispatch(User.SET_TELEPHONE_INTERNATIONAL(telephoneInternational));
};

export const setPhoneNational = (phoneNational) => {
    return (dispatch) => dispatch(User.SET_PHONE_NATIONAL(phoneNational));
};

export const setPhoneInternational = (phoneInternational) => {
    return (dispatch) => dispatch(User.SET_PHONE_INTERNATIONAL(phoneInternational));
};
