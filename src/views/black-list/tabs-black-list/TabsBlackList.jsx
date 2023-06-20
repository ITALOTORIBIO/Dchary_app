import PropTypes from 'prop-types';
import { FormControlLabel, Grid, MenuItem, TextField, Typography, Switch } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setNombre, setCorreo, setRol, setUsername, setPassword } from 'store/black-list';
import { gridSpacing } from 'store/constant';

const TabsBlackList = ({ handleBlur, handleChange, touched, values, errors, openModalBlackListEdit }) => {
    const dispatch = useDispatch();

    const handleChangeNombre = (event) => dispatch(setNombre(event.target.value));
    const handleChangeCorreo = (event) => dispatch(setCorreo(event.target.value));
    const handleChangeRol = (event) => dispatch(setRol(event.target.value));
    const handleChangeUsername = (event) => dispatch(setUsername(event.target.value));
    const handleChangePassword = (event) => dispatch(setPassword(event.target.value));

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} direction="row">
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="nombre"
                                    fullWidth
                                    type="text"
                                    name="nombre"
                                    variant="filled"
                                    required
                                    label="Nombre Completo"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeNombre(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.nombre}
                                    error={Boolean(errors.nombre && touched.nombre)}
                                    helperText={Boolean(errors.nombre && touched.nombre) && errors.nombre}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="rol"
                                    variant="filled"
                                    select
                                    fullWidth
                                    required
                                    label="Tipo de Rol"
                                    name="rol"
                                    value={values.rol}
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeRol(event);
                                    }}
                                >
                                    <MenuItem value="Administrador">Administrador</MenuItem>
                                    <MenuItem value="Usuario">Usuario</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="correo"
                                    fullWidth
                                    type="text"
                                    name="correo"
                                    variant="filled"
                                    required
                                    label="Correo electrónico"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeCorreo(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.correo}
                                    error={Boolean(errors.correo && touched.correo)}
                                    helperText={Boolean(errors.correo && touched.correo) && errors.correo}
                                />
                            </Grid>
                            {/* <Grid item xs={12} sm={6}>
                                <Grid container spacing={gridSpacing} alignItems="center" justifyContent="center" direction="row">
                                    <Grid item xs={6}>
                                        <Typography fontWeight="bold">Estado</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={values.estado}
                                                    onChange={(event) => {
                                                        handleChange(event);
                                                        handleChangeEstado(event);
                                                    }}
                                                />
                                            }
                                            name="estado"
                                        />
                                    </Grid>
                                </Grid> 
                            </Grid>*/}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="username"
                                    fullWidth
                                    type="text"
                                    name="username"
                                    variant="filled"
                                    required
                                    label="Nombre de Usuario"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeUsername(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    error={Boolean(errors.username && touched.username)}
                                    helperText={Boolean(errors.username && touched.username) && errors.username}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="password"
                                    fullWidth
                                    type="password"
                                    name="password"
                                    variant="filled"
                                    required
                                    label="Contraseña"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangePassword(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    error={Boolean(errors.password && touched.password)}
                                    helperText={Boolean(errors.password && touched.password) && errors.password}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

TabsBlackList.propTypes = {
    handleBlur: PropTypes.any,
    handleChange: PropTypes.any,
    touched: PropTypes.any,
    values: PropTypes.any,
    errors: PropTypes.any
};

export default TabsBlackList;
