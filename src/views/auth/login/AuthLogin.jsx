import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// redux
import { checkingAuthentication } from 'store/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

// username: 'rpareja',
// password: 'tc0nt4cta_'

const initialValues = {
    username: '',
    password: ''
};

const FirebaseLogin = () => {
    const theme = useTheme();
    const [checked, setChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const { status, message } = useSelector((state) => state.auth);

    const isAuthenticated = useMemo(() => status === 'checking', [status]);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (e) => e.preventDefault();

    const onSubmit = async (values, { resetForm, setSubmitting }) => {
        setSubmitting(false);
        resetForm();
        dispatch(checkingAuthentication(values.username, values.password));
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
                username: Yup.string()
                    .min(5, 'Usuario debe tener 5 caracteres como mínimo')
                    .max(10, 'Usuario no debe tener más de 10 caracteres')
                    .required('Usuario es obligatorio'),
                password: Yup.string()
                    .min(5, 'Contraseña debe tener mínimo 5 caracteres')
                    .max(15, 'Contraseña no debe tener más de 15 caracteres')
                    .required('Contraseña es obligatorio')
            })}
            onSubmit={onSubmit}
        >
            {({ errors, handleBlur, handleSubmit, handleChange, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="username">Usuario</InputLabel>
                        <OutlinedInput
                            id="username"
                            type="text"
                            value={values.username}
                            name="username"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Usuario"
                        />
                        {touched.username && errors.username && (
                            <FormHelperText error id="error-username">
                                {errors.username}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="password">Contraseña</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Contraseña"
                        />
                        {touched.password && errors.password && (
                            <FormHelperText error id="error-password">
                                {errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>
                    {!!message && (
                        <Alert variant="filled" severity="error">
                            {message}
                        </Alert>
                    )}
                    <Box sx={{ ml: 13, mt: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <AnimateButton>
                            <Button
                                justifyContent="center"
                                alignItems="center"
                                disableElevation
                                disabled={isAuthenticated}
                                size="large"
                                type="submit"
                                variant="contained"
                                color="success"
                            >
                                Iniciar Sesión
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default FirebaseLogin;
