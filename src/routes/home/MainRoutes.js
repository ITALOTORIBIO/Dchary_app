import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const AnnexSIP = Loadable(lazy(() => import('views/annex/sip')));
const AnnexPJSIP = Loadable(lazy(() => import('views/annex/pjsip')));
const User = Loadable(lazy(() => import('views/user')));
const BlackList = Loadable(lazy(() => import('views/black-list')));
const RecordingsGeneral = Loadable(lazy(() => import('views/recordings/general')));
const RecordingsAgents = Loadable(lazy(() => import('views/recordings/agents')));
const RingGroup = Loadable(lazy(() => import('views/ring-group')));
const Conferences = Loadable(lazy(() => import('views/conferences')));
const QueueManagement = Loadable(lazy(() => import('views/queue/queue-management')));
const QueueMonitoring = Loadable(lazy(() => import('views/queue/queue-monitoring')));
const MonitoringSIP = Loadable(lazy(() => import('views/monitoring/sip')));
const MonitoringPJSIP = Loadable(lazy(() => import('views/monitoring/pjsip')));
const ReportCorporate = Loadable(lazy(() => import('views/reports/corporate')));
const ReportCallCenter = Loadable(lazy(() => import('views/reports/call-center')));
const CallGeneral = Loadable(lazy(() => import('views/reports/corporate/call-general')));
const CallUser = Loadable(lazy(() => import('views/reports/corporate/call-user')));
const ReportAbandonment = Loadable(lazy(() => import('views/reports/call-center/report-abandonment')));
const CustomerCare = Loadable(lazy(() => import('views/reports/call-center/customer-care')));
const CallAnsweredAndAbandonment = Loadable(lazy(() => import('views/reports/call-center/answered-and-abandonment')));
const CallAnswered = Loadable(lazy(() => import('views/reports/call-center/answered')));
const CallListDate = Loadable(lazy(() => import('views/reports/call-center/date')));
const CallConsolidate = Loadable(lazy(() => import('views/reports/call-center/consolidate')));
const CallAgent = Loadable(lazy(() => import('views/reports/call-center/agent')));
const CallRanking = Loadable(lazy(() => import('views/reports/corporate/call-ranking')));
const CallArea = Loadable(lazy(() => import('views/reports/corporate/call-area')));
const CallCostCenter = Loadable(lazy(() => import('views/reports/corporate/call-cost-center')));
const CallDestiny = Loadable(lazy(() => import('views/reports/corporate/call-destiny')));
const VoiceMail = Loadable(lazy(() => import('views/voice-mail')));

const MainRoutes = {
    path: '',
    element: <MainLayout />,
    children: [
        {
            path: 'dashboard',
            element: <Dashboard />
        },
        {
            path: 'user',
            element: <User />
        },
        {
            path: 'black-list',
            element: <BlackList />
        },
        {
            path: 'recordings',
            children: [
                {
                    path: 'general',
                    element: <RecordingsGeneral />
                },
                {
                    path: 'agents',
                    element: <RecordingsAgents />
                }
            ]
        },
        {
            path: 'ring-group',
            element: <RingGroup />
        },
        {
            path: 'queue',
            children: [
                {
                    path: 'management',
                    element: <QueueManagement />
                },
                {
                    path: 'monitoring',
                    element: <QueueMonitoring />
                }
            ]
        },
        {
            path: 'conferences',
            element: <Conferences />
        },
        {
            path: 'monitoring',
            children: [
                {
                    path: 'sip',
                    element: <MonitoringSIP />
                },
                {
                    path: 'pjsip',
                    element: <MonitoringPJSIP />
                }
            ]
        },
        {
            path: 'reports',
            children: [
                {
                    path: 'corporate',
                    element: <ReportCorporate />,
                    children: [
                        {
                            path: 'general',
                            element: <CallGeneral />
                        },
                        {
                            path: 'user',
                            element: <CallUser />
                        },
                        {
                            path: 'ranking',
                            element: <CallRanking />
                        },
                        {
                            path: 'area',
                            element: <CallArea />
                        },
                        {
                            path: 'cost-center',
                            element: <CallCostCenter />
                        },
                        {
                            path: 'destiny',
                            element: <CallDestiny />
                        }
                    ]
                },
                {
                    path: 'call-center',
                    element: <ReportCallCenter />,
                    children: [
                        {
                            path: 'abandoned-report',
                            element: <ReportAbandonment />
                        },
                        {
                            path: 'customer-care',
                            element: <CustomerCare />
                        },
                        {
                            path: 'answered-and-abandonment',
                            element: <CallAnsweredAndAbandonment />
                        },
                        {
                            path: 'answered',
                            element: <CallAnswered />
                        },
                        {
                            path: 'date',
                            element: <CallListDate />
                        },
                        {
                            path: 'consolidate',
                            element: <CallConsolidate />
                        },
                        {
                            path: 'agent',
                            element: <CallAgent />
                        }
                    ]
                }
            ]
        },
        {
            path: 'voice-mail',
            element: <VoiceMail />
        }
    ]
};

export default MainRoutes;
