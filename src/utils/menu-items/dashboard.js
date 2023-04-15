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
            id: 'annex',
            title: 'Anexo',
            type: 'collapse',
            icon: icons.IconBrandBackbone,
            children: [
                {
                    id: 'sip',
                    title: 'Anexos SIP',
                    type: 'item',
                    url: '/annex/sip',
                    breadcrumbs: true
                },
                {
                    id: 'pjsip',
                    title: 'Anexos PJSIP',
                    type: 'item',
                    url: '/annex/pjsip',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'user',
            title: 'Usuario',
            type: 'item',
            url: '/user',
            icon: icons.IconUser,
            breadcrumbs: true
        },
        {
            id: 'black-list',
            title: 'Lista Negra',
            type: 'item',
            url: '/black-list',
            icon: icons.IconReceiptOff,
            breadcrumbs: true
        },
        {
            id: 'recordings',
            title: 'Grabaciones',
            type: 'collapse',
            icon: icons.IconFileMusic,
            children: [
                {
                    id: 'general',
                    title: 'Grabación General',
                    type: 'item',
                    url: '/recordings/general',
                    breadcrumbs: true
                },
                {
                    id: 'agents',
                    title: 'Grabación Agentes',
                    type: 'item',
                    url: '/recordings/agents',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'ring-group',
            title: 'Ring Group',
            type: 'item',
            url: '/ring-group',
            icon: icons.IconFriends,
            breadcrumbs: true
        },
        {
            id: 'queue',
            title: 'Cola',
            type: 'collapse',
            icon: icons.IconStack3,
            children: [
                {
                    id: 'management',
                    title: 'Cola',
                    type: 'item',
                    url: '/queue/management',
                    breadcrumbs: true
                },
                {
                    id: 'monitoring',
                    title: 'Monitoreo de Cola',
                    type: 'item',
                    url: '/queue/monitoring',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'conferences',
            title: 'Conferencias',
            type: 'item',
            url: '/conferences',
            icon: icons.IconBrandZoom,
            breadcrumbs: true
        },
        {
            id: 'monitoring',
            title: 'Monitoreo',
            type: 'collapse',
            icon: icons.IconHeartRateMonitor,
            children: [
                {
                    id: 'monitoring-sip',
                    title: 'Monitoreo SIP',
                    type: 'item',
                    url: '/monitoring/sip',
                    breadcrumbs: true
                },
                {
                    id: 'monitoring-pjsip',
                    title: 'Monitoreo PJSIP',
                    type: 'item',
                    url: '/monitoring/pjsip',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'reports',
            title: 'Reportes',
            type: 'collapse',
            icon: icons.IconReport,
            children: [
                {
                    id: 'report-corporate',
                    title: 'Reportes Corporativos',
                    type: 'item',
                    url: '/reports/corporate',
                    breadcrumbs: true
                },
                {
                    id: 'report-call-center',
                    title: 'Reportes Call Center',
                    type: 'item',
                    url: '/reports/call-center',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'voice-mail-box',
            title: 'Voicemail',
            type: 'item',
            url: '/voice-mail',
            icon: icons.IconMailbox,
            breadcrumbs: true
        }
    ]
};

export default dashboard;
