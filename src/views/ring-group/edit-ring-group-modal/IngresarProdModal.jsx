import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import { Alert, Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, Slide, Snackbar, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpenRingGroupEdit, backdropOpenRingGroupEdit, snackbarOpenRingGroupEdit } from 'store/modal';
import { callToRingGroupList, callToEditRingGroupItem } from 'services/apis';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setUnidadProducto, setNombreProducto, setCantidadIngProducto } from 'store/ring-group';
import { useEffect } from 'react';
import { getRingGroup } from 'store/filters';
import TabIngreso from '../tabs-ring-group/TabIngreso';

const schema = Yup.object().shape({
    cantidadIngProducto: Yup.string().required('Cantidad de producto obligatorio')
});

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const IngresarProdModal = ({ openModalRingGroupEdit, openBackdropRingGroupEdit, openSnackbarRingGroupEdit, resultItemRingGroup }) => {
    const [value, setValue] = useState('1');
    const [snackbar, setSnackbar] = useState({
        message: '',
        severity: 'success',
        color: 'success'
    });
    const dispatch = useDispatch();

    const { nombreProducto, unidadProducto, cantidadIngProducto } = useSelector((state) => state.ringGroup);

    const initialValues = {
        nombreProducto: resultItemRingGroup.nom_prod,
        cantidadIngProducto: resultItemRingGroup.cant_ing_prod,
        unidadProducto: resultItemRingGroup.unidad_prod
    };

    console.log(nombreProducto);
    console.log(resultItemRingGroup);
    console.log(cantidadIngProducto);

    useEffect(() => {
        dispatch(setNombreProducto(initialValues.nombreProducto));
        dispatch(setCantidadIngProducto(initialValues.cantidadIngProducto));
        dispatch(setUnidadProducto(initialValues.unidadProducto));
    }, [initialValues.nombreProducto, modalOpenRingGroupEdit]);

    const getDataRingGroup = async () => {
        const result = await callToRingGroupList();
        if (result.ok) dispatch(getRingGroup(result.data));
        else dispatch(getRingGroup([]));
    };

    const handleClose = () => {
        dispatch(setNombreProducto(initialValues.nombreProducto));
        dispatch(setCantidadIngProducto(initialValues.cantidadIngProducto));
        dispatch(setUnidadProducto(initialValues.unidadProducto));
    };

    const handleCloseModal = () => {
        dispatch(modalOpenRingGroupEdit(!openModalRingGroupEdit));
        setValue('1');
    };

    const handleChangeTab = (event, newValue) => setValue(newValue);
    const handleOpenBackdropEdit = () => dispatch(backdropOpenRingGroupEdit(true));
    const handleCloseBackdropEdit = () => dispatch(backdropOpenRingGroupEdit(false));

    const onSubmit = async () => {
        handleOpenBackdropEdit();
        console.log(cantidadIngProducto);
        const data = {
            nom_prod: nombreProducto,
            unidad_prod: unidadProducto,
            cant_ing_prod: cantidadIngProducto
        };
        console.log(data);
        const result = await callToEditRingGroupItem(data.nom_prod, data);
        console.log(result);
        if (result.isCreated) {
            getDataRingGroup();
            handleCloseBackdropEdit();
            handleCloseModal();
            setSnackbar({ message: 'Registro actualizado correctamente', severity: 'success', color: 'success' });
        } else {
            if (result.status) {
                setSnackbar({ message: 'Registro actualizado correctamente', severity: 'success', color: 'success' });
            } else {
                setSnackbar({ message: 'Registro actualizado correctamente', severity: 'success', color: 'success' });
            }
            console.log(result.message);
            handleCloseBackdropEdit();
        }
        handleOpenSnackbarEdit();
        setTimeout(() => {
            handleCloseSnackbarEdit();
        }, 6000);
    };

    const handleOpenSnackbarEdit = () => dispatch(snackbarOpenRingGroupEdit(true));
    const handleCloseSnackbarEdit = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(snackbarOpenRingGroupEdit(false));
    };

    return (
        <div>
            <Dialog
                open={openModalRingGroupEdit}
                fullWidth
                maxWidth="xs"
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseModal}
                aria-describedby="modal-edit-ring-group"
            >
                <Formik enableReinitialize initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
                    {({ errors, handleBlur, handleSubmit, handleChange, touched, values, isValid, resetForm, setFieldValue }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <DialogContent sx={{ position: 'relative' }}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChangeTab}>
                                            <Tab label="Ingresar Producto" sx={{ textTransform: 'uppercase', width: '20%' }} value="1" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <TabIngreso
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            touched={touched}
                                            values={values}
                                            errors={errors}
                                            statusClose={openModalRingGroupEdit}
                                            setFieldValue={setFieldValue}
                                        />
                                    </TabPanel>
                                </TabContext>
                            </DialogContent>
                            <DialogActions sx={{ position: 'relative' }}>
                                <Box marginRight="0.5rem" marginBottom="1rem" gap={4}>
                                    <Button
                                        variant="contained"
                                        sx={{ textTransform: 'uppercase' }}
                                        color="error"
                                        onClick={() => {
                                            handleClose();
                                            handleCloseModal();
                                            resetForm();
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Box>
                                <Box marginRight="2.5rem" marginBottom="1rem" gap={4}>
                                    <Button variant="contained" disabled={!isValid} type="submit" sx={{ textTransform: 'uppercase' }}>
                                        Ingresar Producto
                                    </Button>
                                </Box>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </Dialog>
            <Backdrop sx={{ color: '#fff', zIndex: 12000, position: '' }} open={openBackdropRingGroupEdit}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={openSnackbarRingGroupEdit}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={handleCloseSnackbarEdit}
            >
                <Alert
                    onClose={handleCloseSnackbarEdit}
                    severity={snackbar.severity}
                    color={snackbar.color}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

IngresarProdModal.propTypes = {
    openModalRingGroupEdit: PropTypes.bool,
    openBackdropRingGroupEdit: PropTypes.bool,
    openSnackbarRingGroupEdit: PropTypes.bool,
    resultItemRingGroup: PropTypes.object
};

export default IngresarProdModal;
