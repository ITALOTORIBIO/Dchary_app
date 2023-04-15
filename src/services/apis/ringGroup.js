import { BASE_PATH, RING_GROUP_URL_API } from '../config';
import axios from 'axios';

export const callToRingGroupList = async () => {
    const URL = `${BASE_PATH}/${RING_GROUP_URL_API}/lista`;

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

export const callToRingGroupItem = async (data) => {
    const URL = `${BASE_PATH}/${RING_GROUP_URL_API}/registro/`;
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

export const callToElementRingGroup = async (name) => {
    const URL = `${BASE_PATH}/${RING_GROUP_URL_API}/lista/${name}/`;

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

export const callToEditRingGroupItem = async (name, data) => {
    const URL = `${BASE_PATH}/${RING_GROUP_URL_API}/lista/${name}/`;
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

export const callToDeleteRingGroupItem = async (name) => {
    const URL = `${BASE_PATH}/${RING_GROUP_URL_API}/eliminar/${name}/`;
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
