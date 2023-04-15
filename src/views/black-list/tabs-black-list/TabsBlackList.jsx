import PropTypes from 'prop-types';
import { FormControlLabel, Grid, MenuItem, TextField, Typography, Switch } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setDescripcion, setEstado, setNumero, setTipo } from 'store/black-list';
import { gridSpacing } from 'store/constant';

const TabsBlackList = ({ handleBlur, handleChange, touched, values, errors, openModalBlackListEdit }) => {
    const dispatch = useDispatch();

    const handleChangeTipo = (event) => dispatch(setTipo(event.target.value));
    const handleChangeNumero = (event) => dispatch(setNumero(event.target.value));
    const handleChangeDescripcion = (event) => dispatch(setDescripcion(event.target.value));
    const handleChangeEstado = (event) => dispatch(setEstado(event.target.checked));

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} direction="row">
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="tipo"
                                    variant="filled"
                                    select
                                    fullWidth
                                    required
                                    label="Tipo de llamada"
                                    name="tipo"
                                    value={values.tipo}
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeTipo(event);
                                    }}
                                >
                                    <MenuItem value="Entrantes">Entrantes</MenuItem>
                                    <MenuItem value="Salientes">Salientes</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="numero"
                                    fullWidth
                                    type="text"
                                    name="numero"
                                    disabled={openModalBlackListEdit}
                                    variant="filled"
                                    required
                                    label="Número Telefónico"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeNumero(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.numero}
                                    error={Boolean(errors.numero && touched.numero)}
                                    helperText={Boolean(errors.numero && touched.numero) && errors.numero}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="descripcion"
                                    fullWidth
                                    type="text"
                                    name="descripcion"
                                    variant="filled"
                                    label="Descripción"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeDescripcion(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.descripcion}
                                    error={Boolean(errors.descripcion && touched.descripcion)}
                                    helperText={Boolean(errors.descripcion && touched.descripcion) && errors.descripcion}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
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
