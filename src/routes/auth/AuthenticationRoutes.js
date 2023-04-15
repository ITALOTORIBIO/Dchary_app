import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login
const AuthLogin = Loadable(lazy(() => import('views/auth/login/Login')));

const AuthenticationRoutes = {
    path: 'auth',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        }
    ]
};

export default AuthenticationRoutes;
