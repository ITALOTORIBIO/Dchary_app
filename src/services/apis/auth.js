import { BASE_PATH } from '../config';
import axios from 'axios';

// APIs para logueo de usuario
export const callToLogin = async (username, password) => {
    const URL = `${BASE_PATH}`;

    return await axios({
        method: 'post',
        url: URL,
        data: { username: username, password: password },
        headers: { 'Content-Type': 'application/json' }
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                console.log(res);
                localStorage.setItem('username', res.data.user.username);
                localStorage.setItem('name', res.data.user.name);
                localStorage.setItem('token', res.data.token);
                return {
                    ok: true,
                    username: res.data.user.username,
                    name: res.data.user.name,
                    token: res.data.token,
                    message: res.data.message
                };
            } else {
                return {
                    ok: false,
                    message: "Couldn't authenticate"
                };
            }
        })
        .catch((err) => {
            return {
                ok: false,
                message: err.response.data?.error || err.message
            };
        });
};

export const callToLogout = async (token) => {
    const URL = `${BASE_PATH}/logout/?token=${token}`;

    return await axios({
        method: 'GET',
        url: URL
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                localStorage.clear();
                return {
                    ok: true,
                    message: res.data.token_message
                };
            } else {
                return {
                    ok: false,
                    message: "Couldn't close session"
                };
            }
        })
        .catch((err) => {
            return {
                ok: false,
                message: err.response.data?.error || err.message
            };
        });
};
