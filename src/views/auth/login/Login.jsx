// material-ui
// import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

// project imports
import AuthWrapper from './AuthWrapper';
import AuthCardWrapper from './AuthCardWrapper';
import AuthLogin from './AuthLogin';
import AuthFooter from 'ui-component/cards/AuthFooter';
import { useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkingUserLogin } from 'store/auth';
import imageDCHary from '../../../assets/images/logo4.png';

const Login = () => {
    // const theme = useTheme();
    // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkingUserLogin());
    }, [dispatch]);

    const isToken = useMemo(() => (token === null ? false : true), [token]);

    if (isToken) return <Navigate to="/dashboard" />;

    return (
        <AuthWrapper>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <Grid container item xs={12} alignItems="center" justifyContent="center">
                                <img src={imageDCHary} alt="Logo" width="150" height="150" className="mi-clase" />
                            </Grid>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <AuthLogin />
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default Login;
