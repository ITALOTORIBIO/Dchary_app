import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import { Alert, Box, Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, Slide, Snackbar, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpenRingGroup, backdropOpenRingGroup, snackbarOpenRingGroup } from 'store/modal';
import TabsRingGroup from '../tabs-ring-group/TabsRingGroup';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getRingGroup } from 'store/filters';
import { callToRingGroupList, callToRingGroupItem } from 'services/apis';
import { setNombreProducto, setCantidadProducto, setCantidadMinProducto, setPrecioProducto, setUnidadProducto } from 'store/ring-group';

const schema = Yup.object().shape({
    nombreProducto: Yup.string().required('Nombre de producto obligatorio'),
    precioProducto: Yup.string().required('Precio del producto obligatorio'),
    cantidadProducto: Yup.string().required('Cantidad de producto obligatoria'),
    cantidadMinProducto: Yup.string().required('Cantidad Minima es requerida'),
    unidadProducto: Yup.string().required('Unidad de producto obligatoria')
});

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const AddRingGroupModal = ({ open, statusClose, setStatusClose, openBackdropRingGroup, openSnackbarRingGroup }) => {
    const [value, setValue] = useState('1');
    const [snackbar, setSnackbar] = useState({
        message: '',
        severity: 'success',
        color: 'success'
    });
    const { nombreProducto, precioProducto, cantidadProducto, cantidadMinProducto, unidadProducto } = useSelector(
        (state) => state.ringGroup
    );
    const dispatch = useDispatch();

    const initialValues = {
        nombreProducto: nombreProducto,
        precioProducto: precioProducto,
        cantidadProducto: cantidadProducto,
        cantidadMinProducto: cantidadMinProducto,
        unidadProducto: unidadProducto
    };

    const handleChangeTab = (event, newValue) => setValue(newValue);
    const handleOpenBackdrop = () => dispatch(backdropOpenRingGroup(true));
    const handleCloseBackdrop = () => dispatch(backdropOpenRingGroup(false));

    const getDataListRingGroup = async () => {
        const result = await callToRingGroupList();
        if (result.ok) dispatch(getRingGroup(result.data));
        else dispatch(getRingGroup([]));
    };

    const handleClose = () => {
        dispatch(setNombreProducto(''));
        dispatch(setPrecioProducto(''));
        dispatch(setCantidadProducto(''));
        dispatch(setCantidadMinProducto(''));
        dispatch(setUnidadProducto(''));
        dispatch(modalOpenRingGroup(!open));
        setStatusClose(true);
    };

    const onSubmit = async () => {
        handleOpenBackdrop();
        // const cant_annex = selectAnexo.split(',').length;
        const data = {
            nom_prod: nombreProducto,
            precio_prod: precioProducto,
            cant_prod: cantidadProducto,
            cant_min_prod: cantidadMinProducto,
            unidad_prod: unidadProducto
        };
        const result = await callToRingGroupItem(data);
        if (result.isCreated) {
            console.log(result.data);
            getDataListRingGroup();
            handleCloseBackdrop();
            handleClose();
            setSnackbar({ message: result.message, severity: 'success', color: 'success' });
        } else {
            if (result.status) {
                setSnackbar({ message: result.message, severity: 'error', color: 'error' });
            } else {
                setSnackbar({ message: result.message.name, severity: 'error', color: 'error' });
            }
            console.log(result.message);
            handleCloseBackdrop();
        }
        handleOpenSnackbar();
        setTimeout(() => {
            handleCloseSnackbar();
        }, 6000);
    };

    const handleOpenSnackbar = () => dispatch(snackbarOpenRingGroup(true));
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(snackbarOpenRingGroup(false));
    };

    return (
        <div>
            <Dialog
                open={open}
                fullWidth
                maxWidth="md"
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="modal-add-ring-group"
            >
                <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
                    {({ errors, handleBlur, handleSubmit, handleChange, touched, values, isValid, resetForm, setFieldValue }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <DialogContent>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChangeTab}>
                                            <Tab label="Nuevo Producto" sx={{ textTransform: 'uppercase', width: '20%' }} value="1" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <TabsRingGroup
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            touched={touched}
                                            values={values}
                                            errors={errors}
                                            statusClose={statusClose}
                                            setFieldValue={setFieldValue}
                                        />
                                    </TabPanel>
                                </TabContext>
                            </DialogContent>
                            <DialogActions>
                                <Box marginRight="0.5rem" marginBottom="1rem" gap={4}>
                                    <Button
                                        variant="contained"
                                        sx={{ textTransform: 'uppercase' }}
                                        color="error"
                                        onClick={() => {
                                            handleClose();
                                            resetForm();
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Box>
                                <Box marginRight="2.5rem" marginBottom="1rem" gap={4}>
                                    <Button variant="contained" type="submit" disabled={!isValid} sx={{ textTransform: 'uppercase' }}>
                                        Crear Producto
                                    </Button>
                                </Box>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </Dialog>
            {/* <Backdrop sx={{ color: '#fff', zIndex: 12000, position: '' }} open={openBackdropRingGroup}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={openSnackbarRingGroup}
                autoHideDuration={30}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    color={snackbar.color}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar> */}
        </div>
    );
};

AddRingGroupModal.propTypes = {
    open: PropTypes.bool,
    statusClose: PropTypes.any,
    setStatusClose: PropTypes.any
};

export default AddRingGroupModal;
