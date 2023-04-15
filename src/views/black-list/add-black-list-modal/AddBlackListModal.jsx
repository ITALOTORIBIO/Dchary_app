import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import { Alert, Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, Slide, Snackbar, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpenBlackList, backdropOpenBlackList, snackbarOpenBlackList } from 'store/modal';
import TabsBlackList from '../tabs-black-list/TabsBlackList';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getBlackList } from 'store/filters';
import { setTipo, setEstado, setNumero, setDescripcion } from 'store/black-list';
import { callToBlackList, callToBlackListItem } from 'services/apis';

const schema = Yup.object().shape({
    tipo: Yup.string().required('Tipo de llamada es obligatorio'),
    numero: Yup.string().length(9, 'Número telefónico debe tener 9 dígitos').required('Número telefónico es obligatorio'),
    descripcion: Yup.string()
});

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const AddBlackListModal = ({ open, openBackdropBlackList, openSnackbarBlackList }) => {
    const [value, setValue] = useState('1');
    const [snackbar, setSnackbar] = useState({
        message: '',
        severity: 'success',
        color: 'success'
    });
    const { tipo, numero, descripcion, estado } = useSelector((state) => state.blackList);
    const dispatch = useDispatch();

    const handleChangeTab = (event, newValue) => setValue(newValue);
    const handleOpenBackdrop = () => dispatch(backdropOpenBlackList(true));
    const handleCloseBackdrop = () => dispatch(backdropOpenBlackList(false));

    const initialValues = {
        tipo: tipo,
        numero: numero,
        descripcion: descripcion,
        estado: estado
    };

    const getDataListBlackList = async () => {
        const result = await callToBlackList();
        if (result.ok) dispatch(getBlackList(result.data));
        else dispatch(getBlackList([]));
    };

    const handleClose = () => {
        dispatch(setTipo(''));
        dispatch(setEstado(false));
        dispatch(setNumero(''));
        dispatch(setDescripcion(''));
        dispatch(modalOpenBlackList(!open));
        setValue('1');
    };

    const onSubmit = async () => {
        handleOpenBackdrop();
        const data = {
            type_call: tipo,
            num_tlf: numero,
            description: descripcion,
            status: estado
        };
        const result = await callToBlackListItem(data);
        if (result.isCreated) {
            console.log(result.data);
            getDataListBlackList();
            handleCloseBackdrop();
            handleClose();
            setSnackbar({ message: result.message, severity: 'success', color: 'success' });
        } else {
            if (result.status) {
                setSnackbar({ message: result.message, severity: 'error', color: 'error' });
            } else {
                setSnackbar({ message: result.message.name, severity: 'error', color: 'error' });
            }
            console.log(result.message.name);
            handleCloseBackdrop();
        }
        handleOpenSnackbar();
        setTimeout(() => {
            handleCloseSnackbar();
        }, 6000);
    };

    const handleOpenSnackbar = () => dispatch(snackbarOpenBlackList(true));
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(snackbarOpenBlackList(false));
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
                aria-describedby="modal-add-black-list"
            >
                <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
                    {({ errors, handleBlur, handleSubmit, handleChange, touched, values, isValid, resetForm }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <DialogContent>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChangeTab}>
                                            <Tab label="Nuevo Número" sx={{ textTransform: 'uppercase', width: '20%' }} value="1" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <TabsBlackList
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            touched={touched}
                                            values={values}
                                            errors={errors}
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
                                        Agregar Número
                                    </Button>
                                </Box>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </Dialog>
            <Backdrop sx={{ color: '#fff', zIndex: 12000, position: '' }} open={openBackdropBlackList}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={openSnackbarBlackList}
                autoHideDuration={6000}
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
            </Snackbar>
        </div>
    );
};

AddBlackListModal.propTypes = {
    open: PropTypes.bool,
    openBackdropBlackList: PropTypes.bool,
    openSnackbarBlackList: PropTypes.bool
};

export default AddBlackListModal;
