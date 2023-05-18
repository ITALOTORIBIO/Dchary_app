import { callToLogin, callToLogout } from 'services/apis';
import { login, logout, loadUser, validateCredentials } from './authSlice';

export const checkingAuthentication = (username, password) => {
    return async (dispatch) => {
        dispatch(validateCredentials());
        const result = await callToLogin(username, password);
        console.log(result);
        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    };
};

// export const checkingUserLogin = () => {
//     return async (dispatch) => {
//         dispatch(loadUser());
//     };
// };

export const validateUserLogout = (token) => {
    return async (dispatch) => {
        const result = await callToLogout(token);
        console.log(result);
        dispatch(logout(result));
    };
};
