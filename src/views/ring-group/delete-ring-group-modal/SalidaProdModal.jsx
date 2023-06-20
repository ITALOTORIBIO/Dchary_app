import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import { Alert, Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, Slide, Snackbar, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { callToRingGroupList, callToEditRingGroupItem } from 'services/apis';
import { modalOpenRingGroupDelete, backdropOpenRingGroupDelete, snackbarOpenRingGroupDelete } from 'store/modal';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setUnidadProducto, setNombreProducto, setCantidadSalProducto } from 'store/ring-group';
import { useEffect } from 'react';
import { getRingGroup } from 'store/filters';
import TabSalida from '../tabs-ring-group/TabSalida';

const schema = Yup.object().shape({
    cantidadSalProducto: Yup.string().required('Cantidad de producto obligatorio')
});

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const SalidaProdModal = ({ openModalRingGroupDelete, openBackdropRingGroupDelete, openSnackbarRingGroupDelete, resultItemRingGroup }) => {
    const [value, setValue] = useState('1');
    const [snackbar, setSnackbar] = useState({
        message: '',
        severity: 'success',
        color: 'success'
    });
    const dispatch = useDispatch();

    const { nombreProducto, unidadProducto, cantidadSalProducto } = useSelector((state) => state.ringGroup);

    const initialValues = {
        nombreProducto: resultItemRingGroup.nom_prod,
        cantidadSalProducto: resultItemRingGroup.cant_sal_prod,
        unidadProducto: resultItemRingGroup.unidad_prod
    };

    useEffect(() => {
        dispatch(setNombreProducto(initialValues.nombreProducto));
        dispatch(setCantidadSalProducto(initialValues.cantidadSalProducto));
        dispatch(setUnidadProducto(initialValues.unidadProducto));
    }, [initialValues.nombreProducto, modalOpenRingGroupDelete]);

    const getDataRingGroup = async () => {
        const result = await callToRingGroupList();
        if (result.ok) dispatch(getRingGroup(result.data));
        else dispatch(getRingGroup([]));
    };

    const handleClose = () => {
        dispatch(setNombreProducto(initialValues.nombreProducto));
        dispatch(setCantidadSalProducto(initialValues.cantidadSalProducto));
        dispatch(setUnidadProducto(initialValues.unidadProducto));
    };

    const handleCloseModal = () => {
        dispatch(modalOpenRingGroupDelete(!openModalRingGroupDelete));
        setValue('1');
    };

    const handleChangeTab = (event, newValue) => setValue(newValue);
    const handleOpenBackdropDelete = () => dispatch(backdropOpenRingGroupDelete(true));
    const handleCloseBackdropDelete = () => dispatch(backdropOpenRingGroupDelete(false));

    const onSubmit = async () => {
        handleOpenBackdropDelete();
        const data = {
            nom_prod: nombreProducto,
            unidad_prod: unidadProducto,
            cant_sal_prod: cantidadSalProducto
        };
        console.log(data);
        const result = await callToEditRingGroupItem(data.nom_prod, data);
        console.log(result);
        if (result.isCreated) {
            getDataRingGroup();
            handleCloseBackdropDelete();
            handleCloseModal();
            setSnackbar({ message: 'Registro actualizado correctamente', severity: 'success', color: 'success' });
        } else {
            if (result.status) {
                setSnackbar({ message: 'Registro actualizado correctamente', severity: 'success', color: 'success' });
            } else {
                setSnackbar({ message: 'Registro actualizado correctamente', severity: 'success', color: 'success' });
            }
            console.log(result.message);
            handleCloseBackdropDelete();
        }
        handleOpenSnackbarDelete();
        setTimeout(() => {
            handleCloseSnackbarDelete();
        }, 6000);
    };

    const handleOpenSnackbarDelete = () => dispatch(snackbarOpenRingGroupDelete(true));
    const handleCloseSnackbarDelete = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(snackbarOpenRingGroupDelete(false));
    };

    return (
        <div>
            <Dialog
                open={openModalRingGroupDelete}
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
                                            <Tab label="Salida de Producto" sx={{ textTransform: 'uppercase', width: '20%' }} value="1" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <TabSalida
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            touched={touched}
                                            values={values}
                                            errors={errors}
                                            statusClose={openModalRingGroupDelete}
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
                                        Salida Producto
                                    </Button>
                                </Box>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </Dialog>
            <Backdrop sx={{ color: '#fff', zIndex: 12000, position: '' }} open={openBackdropRingGroupDelete}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={openSnackbarRingGroupDelete}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={handleCloseSnackbarDelete}
            >
                <Alert
                    onClose={handleCloseSnackbarDelete}
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

SalidaProdModal.propTypes = {
    openModalRingGroupDelete: PropTypes.bool,
    openBackdropRingGroupDelete: PropTypes.bool,
    openSnackbarRingGroupDelete: PropTypes.bool,
    resultItemRingGroup: PropTypes.object
};

export default SalidaProdModal;
