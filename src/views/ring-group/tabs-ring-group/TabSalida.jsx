import PropTypes from 'prop-types';
import { Autocomplete, Box, Chip, Grid, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { gridSpacing } from 'store/constant';
import { se } from 'store/ring-group';

const TabSalida = ({ handleBlur, handleChange, touched, values, errors }) => {
    const dispatch = useDispatch();

    const handleChangeCantIngreso = (event) => dispatch(setCantidadSalProducto(event.target.value));

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} direction="row">
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    id="cantidaIngresada"
                                    fullWidth
                                    type="text"
                                    name="cantidaIngresada"
                                    variant="filled"
                                    required
                                    label="Ingresar cantidad de producto de Salida"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeCantIngreso(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.cantidaIngresada}
                                    error={Boolean(errors.cantidaIngresada && touched.cantidaIngresada)}
                                    helperText={Boolean(errors.cantidaIngresada && touched.cantidaIngresada) && errors.cantidaIngresada}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

TabSalida.propTypes = {
    handleBlur: PropTypes.any,
    handleChange: PropTypes.any,
    touched: PropTypes.any,
    values: PropTypes.any,
    errors: PropTypes.any,
    setFieldValue: PropTypes.any
};

export default TabSalida;
