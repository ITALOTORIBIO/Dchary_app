import PropTypes from 'prop-types';
import { Autocomplete, Box, Chip, Grid, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { gridSpacing } from 'store/constant';
import { setCantidadIngProducto } from 'store/ring-group';

const TabIngreso = ({ handleBlur, handleChange, touched, values, errors }) => {
    const dispatch = useDispatch();

    const handleChangeCantIngreso = (event) => dispatch(setCantidadIngProducto(event.target.value));

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} direction="row">
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    id="cantidadIngresada"
                                    fullWidth
                                    type="text"
                                    name="cantidadIngresada"
                                    variant="filled"
                                    required
                                    label="Ingresar cantidad de producto de ingreso"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeCantIngreso(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.cantidadIngresada}
                                    error={Boolean(errors.cantidadIngresada && touched.cantidadIngresada)}
                                    helperText={Boolean(errors.cantidadIngresada && touched.cantidadIngresada) && errors.cantidadIngresada}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

TabIngreso.propTypes = {
    handleBlur: PropTypes.any,
    handleChange: PropTypes.any,
    touched: PropTypes.any,
    values: PropTypes.any,
    errors: PropTypes.any,
    setFieldValue: PropTypes.any
};

export default TabIngreso;
