// assets
import {
    IconDashboard,
    IconUsers,
    IconFileMusic,
    IconReceiptOff,
    IconBrandBackbone,
    IconFriends,
    IconStack3,
    IconBrandZoom,
    IconHeartRateMonitor,
    IconReport,
    IconMailbox,
    IconClipboardText,
    IconCheese
} from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconUsers,
    IconFileMusic,
    IconReceiptOff,
    IconBrandBackbone,
    IconFriends,
    IconStack3,
    IconBrandZoom,
    IconHeartRateMonitor,
    IconReport,
    IconMailbox,
    IconClipboardText,
    IconCheese
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
            id: 'black-list',
            title: 'Usuarios',
            type: 'item',
            url: '/black-list',
            icon: icons.IconUsers,
            breadcrumbs: true
        },
        {
            id: 'ring-group',
            title: 'Inventario',
            type: 'item',
            url: '/ring-group',
            icon: icons.IconClipboardText,
            breadcrumbs: true
        },
        {
            id: 'conferences',
            title: 'Productos',
            type: 'item',
            url: '/conferences',
            icon: icons.IconCheese,
            breadcrumbs: true
        }
        // {
        //     id: 'user',
        //     title: '',
        //     type: 'item',
        //     url: '/user',
        //     icon: icons.IconUser,
        //     breadcrumbs: true
        // },
        // {
        //     id: 'annex',
        //     title: 'Reportes',
        //     type: 'collapse',
        //     icon: icons.IconBrandBackbone,
        //     children: [
        //         {
        //             id: 'sip',
        //             title: 'Visualizar Reporte',
        //             type: 'item',
        //             url: '/annex/sip',
        //             breadcrumbs: true
        //         },
        //         {
        //             id: 'pjsip',
        //             title: 'Generar Reporte',
        //             type: 'item',
        //             url: '/annex/pjsip',
        //             breadcrumbs: true
        //         }
        //     ]
    ]
};

export default dashboard;
