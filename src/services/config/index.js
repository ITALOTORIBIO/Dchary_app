const hostname = () => {
    if (document.location.hostname !== 'localhost') return document.location.hostname;
    return;
};

export const HOST_API = hostname() || '144.91.71.204';
export const PORT_API = 3000;

export const DASHBOARD_URL_API = 'dashboard';
export const USER_URL_API = 'usuario';

export const ANNEX_URL_API = 'anexo';

export const BLACKLIST_URL_API = 'black_list';
export const RING_GROUP_URL_API = 'ring_groupp';
export const CONFERENCES_URL_API = 'conferencia';

export const BASE_PATH = `http://${HOST_API}:${PORT_API}`;
