// assets
import {
    IconDashboard,
    IconUser,
    IconFileMusic,
    IconReceiptOff,
    IconBrandBackbone,
    IconFriends,
    IconStack3,
    IconBrandZoom,
    IconHeartRateMonitor,
    IconReport,
    IconMailbox
} from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconUser,
    IconFileMusic,
    IconReceiptOff,
    IconBrandBackbone,
    IconFriends,
    IconStack3,
    IconBrandZoom,
    IconHeartRateMonitor,
    IconReport,
    IconMailbox
};

const dashboard = {
    id: '',
    title: 'Admin',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: true
        },
        {
            id: 'user',
            title: 'Perfil',
            type: 'item',
            url: '/user',
            icon: icons.IconUser,
            breadcrumbs: true
        },
        {
            id: 'black-list',
            title: 'Usuarios',
            type: 'item',
            url: '/black-list',
            icon: icons.IconReceiptOff,
            breadcrumbs: true
        },
        {
            id: 'ring-group',
            title: 'Ingresar Producto',
            type: 'item',
            url: '/ring-group',
            icon: icons.IconFriends,
            breadcrumbs: true
        },
        {
            id: 'conferences',
            title: 'Salida de Producto',
            type: 'item',
            url: '/conferences',
            icon: icons.IconBrandZoom,
            breadcrumbs: true
        },
        {
            id: 'annex',
            title: 'Reportes',
            type: 'collapse',
            icon: icons.IconBrandBackbone,
            children: [
                {
                    id: 'sip',
                    title: 'Visualizar Reporte',
                    type: 'item',
                    url: '/annex/sip',
                    breadcrumbs: true
                },
                {
                    id: 'pjsip',
                    title: 'Generar Reporte',
                    type: 'item',
                    url: '/annex/pjsip',
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default dashboard;
