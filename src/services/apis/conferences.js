import { BASE_PATH, CONFERENCES_URL_API } from '../config';
import axios from 'axios';

export const callToConferencesList = async () => {
    const URL = `${BASE_PATH}/${CONFERENCES_URL_API}/lista`;

    return await axios({
        method: 'get',
        url: URL
    })
        .then((res) => {
            if (res.status === 200) {
                return { ok: true, data: res.data };
            } else {
                return { ok: false, data: null };
            }
        })
        .catch((err) => {
            return { ok: false, message: err };
        });
};

export const callToConferencesItem = async (data) => {
    const URL = `${BASE_PATH}/${CONFERENCES_URL_API}/registro/`;
    return await axios({
        method: 'post',
        url: URL,
        data: data,
        headers: { 'Content-Type': 'application/json' }
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.data;
            } else {
                return res.data;
            }
        })
        .catch((err) => {
            return { ok: false, status: err.response.status, message: err.response.data };
        });
};

export const callToElementConferences = async (name) => {
    const URL = `${BASE_PATH}/${CONFERENCES_URL_API}/lista/${name}/`;

    return await axios({
        method: 'get',
        url: URL
    })
        .then((res) => {
            if (res.status === 200) {
                return { data: res.data };
            } else {
                return { data: null };
            }
        })
        .catch((err) => {
            return { message: err };
        });
};

export const callToEditConferencesItem = async (name, data) => {
    const URL = `${BASE_PATH}/${CONFERENCES_URL_API}/lista/${name}/`;
    return await axios({
        method: 'put',
        url: URL,
        data: data,
        headers: { 'Content-Type': 'application/json' }
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.data;
            } else {
                return res.data;
            }
        })
        .catch((err) => {
            return { ok: false, status: err.response.status, message: err.response.data };
        });
};

export const callToDeleteConferencesItem = async (name) => {
    const URL = `${BASE_PATH}/${CONFERENCES_URL_API}/eliminar/${name}/`;
    return await axios({
        method: 'delete',
        url: URL
    })
        .then((res) => {
            if (res.status === 200) {
                return { data: res.data };
            } else {
                return { data: null };
            }
        })
        .catch((err) => {
            return { ok: false, status: err.response.status, message: err.response.data };
        });
};
