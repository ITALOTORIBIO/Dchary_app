import { BASE_PATH, BLACKLIST_URL_API } from '../config';
import axios from 'axios';

// APIs para vista de Black List
export const callToBlackList = async () => {
    const URL = `${BASE_PATH}/${BLACKLIST_URL_API}`;

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

export const callToBlackListItem = async (data) => {
    const URL = `${BASE_PATH}/${BLACKLIST_URL_API}/`;
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

export const callToElementBlackList = async (number) => {
    const URL = `${BASE_PATH}/${BLACKLIST_URL_API}/${number}/`;

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

export const callToEditBlackListItem = async (number, data) => {
    const URL = `${BASE_PATH}/${BLACKLIST_URL_API}/${number}/`;
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

export const callToDeleteBlackListItem = async (number) => {
    const URL = `${BASE_PATH}/${BLACKLIST_URL_API}/${number}/`;
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
