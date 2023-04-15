import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './home/MainRoutes';
import AuthenticationRoutes from './auth/AuthenticationRoutes';

export default function ThemeRoutes() {
    return useRoutes([AuthenticationRoutes, MainRoutes]);
}
