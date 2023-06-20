import { BASE_PATH, DASHBOARD_URL_API } from '../config';
import axios from 'axios';

// APIs para impresión de data en dashboard
export const callToSystemResources = async () => {
    const URL = `http://127.0.0.1:8000/dashboard/listar`;

    return await axios({
        method: 'get',
        url: URL
    })
        .then((res) => {
            if (res.status === 200) {
                return { ok: true, data: res.data[0], message: null };
            } else {
                return { ok: false, data: null, message: 'Errro!' };
            }
        })
        .catch((err) => {
            return { ok: false, data: null, message: err };
        });
};

export const callToHardDrives = async () => {
    const URL = `http://127.0.0.1:8000/dashboard/listar`;

    return await axios({
        method: 'get',
        url: URL
    })
        .then((res) => {
            if (res.status === 200) {
                return { ok: true, data: res.data[0], message: null };
            } else {
                return { ok: false, data: null, message: 'Errro!' };
            }
        })
        .catch((err) => {
            return { ok: false, data: null, message: err };
        });
};

export const callToServiceStatus = async () => {
    const URL = `http://127.0.0.1:8000/dashboard/listar`;

    return await axios({
        method: 'get',
        url: URL
    })
        .then((res) => {
            if (res.status === 200) {
                return { ok: true, data: res.data, message: null };
            } else {
                return { ok: false, data: null, message: 'Error!' };
            }
        })
        .catch((err) => {
            return { ok: false, data: null, message: err };
        });
};
