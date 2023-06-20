import PropTypes from 'prop-types';
import { Autocomplete, Box, Chip, Grid, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { gridSpacing } from 'store/constant';
import { setNombreProducto, setCantidadMinProducto, setCantidadProducto, setPrecioProducto, setUnidadProducto } from 'store/ring-group';

// api service
// import { callToAnnexList } from 'services/apis';

const TabsRingGroup = ({ handleBlur, handleChange, touched, values, errors }) => {
    // const [valueAnnex, setValueAnnex] = useState([]);
    // let annexListTemporal = [];
    // let annexListNames = [];
    // const [annexList, setAnnexList] = useState([]);
    const dispatch = useDispatch();

    const handleChangeNombreProducto = (event) => dispatch(setNombreProducto(event.target.value));
    const handleChangePrecioProducto = (event) => dispatch(setPrecioProducto(event.target.value));
    const handleChangeCantidadProducto = (event) => dispatch(setCantidadProducto(event.target.value));
    const handleChangeCantidadMinProducto = (event) => dispatch(setCantidadMinProducto(event.target.value));
    const handleChangeUnidadProducto = (event) => dispatch(setUnidadProducto(event.target.value));

    // const handleChangeSelectedAnnexAdd = (action, value, name) => {
    //     if (action === 'add') {
    //         value.map((row) => {
    //             annexListNames.push(row.name);
    //         });
    //         setFieldValue('selectAnexo', annexListNames.join());
    //         dispatch(setSelectAnexo(annexListNames.join()));
    //     } else {
    //         let objectsAnnex = value.filter(function (item) {
    //             return item.name !== name;
    //         });
    //         objectsAnnex.map((row) => {
    //             annexListNames.push(row.name);
    //         });
    //         setFieldValue('selectAnexo', annexListNames.join());
    //         dispatch(setSelectAnexo(annexListNames.join()));
    //     }
    // };

    // const handleChangeSelectedAnnexEdit = (action, value, variable, deleted) => {
    //     if (action === 'add') {
    //         if (value.split(',').includes(deleted)) {
    //             onDelete(deleted);
    //             let objectsAnnex = value.split(',').filter(function (item) {
    //                 return item !== deleted;
    //             });
    //             objectsAnnex.map((row) => {
    //                 annexListNames.push(row);
    //             });
    //             setFieldValue('selectAnexo', annexListNames.join());
    //             dispatch(setSelectAnexo(annexListNames.join()));
    //         } else {
    //             annexListNames.push(variable.name);
    //             let x = value + ',' + annexListNames.join();
    //             setFieldValue('selectAnexo', x);
    //             dispatch(setSelectAnexo(x));
    //         }
    //     } else if (action === 'delete') {
    //         let objectsAnnex = value.filter(function (item) {
    //             return item !== variable;
    //         });
    //         objectsAnnex.map((row) => {
    //             annexListNames.push(row);
    //         });
    //         setFieldValue('selectAnexo', annexListNames.join());
    //         dispatch(setSelectAnexo(annexListNames.join()));
    //     } else {
    //         setFieldValue('selectAnexo', '');
    //         dispatch(setSelectAnexo(''));
    //     }
    // };

    // useEffect(() => {
    //     getDataListAnnex();
    // }, []);

    // const onDelete = (name) => {
    //     setValueAnnex((value) => value.filter((v) => v.name !== name));
    // };

    // const getDataListAnnex = async () => {
    //     const result = await callToAnnexList();
    //     result.data.map((row) => {
    //         annexListTemporal.push(row);
    //     });
    //     setAnnexList(annexListTemporal);
    // };

    // useEffect(() => {
    //     setValueAnnex([]);
    // }, [statusClose]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} direction="row">
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="nombreProducto"
                                    fullWidth
                                    type="text"
                                    name="nombreProducto"
                                    variant="filled"
                                    required
                                    label="Nombre de Producto"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeNombreProducto(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.nombreProducto}
                                    error={Boolean(errors.nombreProducto && touched.nombreProducto)}
                                    helperText={Boolean(errors.nombreProducto && touched.nombreProducto) && errors.nombreProducto}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="precioProducto"
                                    fullWidth
                                    type="text"
                                    name="precioProducto"
                                    variant="filled"
                                    required
                                    label="Precio Unitario (S/.)"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangePrecioProducto(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.precioProducto}
                                    error={Boolean(errors.precioProducto && touched.precioProducto)}
                                    helperText={Boolean(errors.precioProducto && touched.precioProducto) && errors.precioProducto}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="cantidadProducto"
                                    fullWidth
                                    type="text"
                                    name="cantidadProducto"
                                    variant="filled"
                                    required
                                    label="Cantidad de Producto"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeCantidadProducto(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.cantidadProducto}
                                    error={Boolean(errors.cantidadProducto && touched.cantidadProducto)}
                                    helperText={Boolean(errors.cantidadProducto && touched.cantidadProducto) && errors.cantidadProducto}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="cantidadMinProducto"
                                    fullWidth
                                    type="text"
                                    name="cantidadMinProducto"
                                    variant="filled"
                                    required
                                    label="CantidadMinima"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeCantidadMinProducto(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.cantidadMinProducto}
                                    error={Boolean(errors.cantidadMinProducto && touched.cantidadMinProducto)}
                                    helperText={
                                        Boolean(errors.cantidadMinProducto && touched.cantidadMinProducto) && errors.cantidadMinProducto
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="unidadProducto"
                                    fullWidth
                                    type="text"
                                    name="unidadProducto"
                                    required
                                    variant="filled"
                                    label="Unidad (kg, lts, u)"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeUnidadProducto(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.unidadProducto}
                                    error={Boolean(errors.unidadProducto && touched.unidadProducto)}
                                    helperText={Boolean(errors.unidadProducto && touched.unidadProducto) && errors.unidadProducto}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    id="selectAnexo"
                                    name="selectAnexo"
                                    multiple
                                    getOptionLabel={(option) => option.name}
                                    value={valueAnnex}
                                    options={annexList}
                                    onChange={(e, newValue, reason) => {
                                        setValueAnnex(newValue);
                                        reason === 'clear'
                                            ? handleChangeSelectedAnnexEdit('delete all', '', '', '')
                                            : values.selectAnexo
                                            ? handleChangeSelectedAnnexEdit(
                                                  'add',
                                                  values.selectAnexo,
                                                  newValue[newValue.length - 1],
                                                  e.target.innerText
                                              )
                                            : handleChangeSelectedAnnexAdd('add', newValue, '');
                                    }}
                                    renderTags={() => null}
                                    renderInput={(params) => <TextField {...params} variant="filled" required label="Seleccionar Anexo" />}
                                />
                                <Box
                                    mt={3}
                                    sx={{
                                        '& > :not(:last-child)': { marginRight: 1 },
                                        '& div': { marginBottom: 0.5 }
                                    }}
                                >
                                    {values.selectAnexo
                                        ? values.selectAnexo.split(',').map((v) => (
                                              <Chip
                                                  key={v}
                                                  label={v}
                                                  color="primary"
                                                  onDelete={() => {
                                                      onDelete(v);
                                                      handleChangeSelectedAnnexEdit('delete', values.selectAnexo.split(','), v);
                                                  }}
                                              />
                                          ))
                                        : valueAnnex.map((v) => (
                                              <Chip
                                                  key={v.name}
                                                  label={v.name}
                                                  color="primary"
                                                  onDelete={() => {
                                                      onDelete(v.name);
                                                      handleChangeSelectedAnnexAdd('delete', valueAnnex, v.name);
                                                  }}
                                              />
                                          ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Grid>
            </Grid>
        </Grid>
    );
};

TabsRingGroup.propTypes = {
    handleBlur: PropTypes.any,
    handleChange: PropTypes.any,
    touched: PropTypes.any,
    values: PropTypes.any,
    errors: PropTypes.any,
    setFieldValue: PropTypes.any
};

export default TabsRingGroup;
