import { BASE_PATH, ANNEX_URL_API } from '../config';
import axios from 'axios';

// APIs para vista de Anexo
export const callToAnnexList = async () => {
    const URL = `${BASE_PATH}/${ANNEX_URL_API}/lista`;

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

export const callToAnnexItem = async (data) => {
    const URL = `${BASE_PATH}/${ANNEX_URL_API}/registro/`;
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

export const callToElementAnnexList = async (nameAnnex) => {
    const URL = `${BASE_PATH}/${ANNEX_URL_API}/lista/${nameAnnex}/`;

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

export const callToEditAnnexItem = async (nameAnnex, data) => {
    const URL = `${BASE_PATH}/${ANNEX_URL_API}/lista/${nameAnnex}/`;
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

export const callToDeleteAnnexItem = async (nameAnnex) => {
    const URL = `${BASE_PATH}/${ANNEX_URL_API}/eliminar/${nameAnnex}/`;
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
