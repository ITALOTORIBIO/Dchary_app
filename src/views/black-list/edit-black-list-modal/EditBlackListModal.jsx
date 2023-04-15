import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import { Alert, Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, Slide, Snackbar, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpenBlackListEdit, backdropOpenBlackListEdit, snackbarOpenBlackListEdit } from 'store/modal';
import { callToBlackList, callToEditBlackListItem } from 'services/apis';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setTipo, setEstado, setNumero, setDescripcion } from 'store/black-list';
import { useEffect } from 'react';
import { getBlackList } from 'store/filters';
import TabsBlackList from '../tabs-black-list/TabsBlackList';

const schema = Yup.object().shape({
    tipo: Yup.string().required('Tipo de llamada es obligatorio'),
    numero: Yup.string().length(9, 'Número telefónico debe tener 9 dígitos').required('Número telefónico es obligatorio'),
    descripcion: Yup.string()
});

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const EditBlackListModal = ({ openModalBlackListEdit, openBackdropBlackListEdit, openSnackbarBlackListEdit, resultItemBlackList }) => {
    const [value, setValue] = useState('1');
    const [snackbar, setSnackbar] = useState({
        message: '',
        severity: 'success',
        color: 'success'
    });
    const dispatch = useDispatch();

    const { tipo, numero, descripcion, estado } = useSelector((state) => state.blackList);

    const initialValues = {
        tipo: resultItemBlackList.type_call,
        numero: resultItemBlackList.num_tlf,
        descripcion: resultItemBlackList.description ? resultItemBlackList.description : '',
        estado: resultItemBlackList.status
    };

    useEffect(() => {
        dispatch(setTipo(initialValues.tipo));
        dispatch(setEstado(initialValues.estado));
        dispatch(setNumero(initialValues.numero));
        dispatch(setDescripcion(initialValues.descripcion));
    }, [initialValues.numero, openModalBlackListEdit]);

    const getDataBlackList = async () => {
        const result = await callToBlackList();
        if (result.ok) dispatch(getBlackList(result.data));
        else dispatch(getBlackList([]));
    };

    const handleClose = () => {
        dispatch(modalOpenBlackListEdit(!openModalBlackListEdit));
        setValue('1');
    };
    const handleChangeTab = (event, newValue) => setValue(newValue);
    const handleOpenBackdropEdit = () => dispatch(backdropOpenBlackListEdit(true));
    const handleCloseBackdropEdit = () => dispatch(backdropOpenBlackListEdit(false));

    const onSubmit = async () => {
        handleOpenBackdropEdit();
        const data = {
            type_call: tipo,
            num_tlf: numero,
            description: descripcion,
            status: estado
        };
        console.log(data);
        const result = await callToEditBlackListItem(numero, data);
        if (result.isCreated) {
            getDataBlackList();
            handleCloseBackdropEdit();
            handleClose();
            setSnackbar({ message: 'Registro actualizado correctamente', severity: 'success', color: 'success' });
        } else {
            if (result.status) {
                setSnackbar({ message: result.message, severity: 'error', color: 'error' });
            } else {
                setSnackbar({ message: result.message.name, severity: 'error', color: 'error' });
            }
            console.log(result.message.name);
            handleCloseBackdropEdit();
        }
        handleOpenSnackbarEdit();
        setTimeout(() => {
            handleCloseSnackbarEdit();
        }, 6000);
    };

    const handleOpenSnackbarEdit = () => dispatch(snackbarOpenBlackListEdit(true));
    const handleCloseSnackbarEdit = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(snackbarOpenBlackListEdit(false));
    };

    return (
        <div>
            <Dialog
                open={openModalBlackListEdit}
                fullWidth
                maxWidth="md"
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="modal-edit-blackList"
            >
                <Formik enableReinitialize initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
                    {({ errors, handleBlur, handleSubmit, handleChange, touched, values, isValid, resetForm }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <DialogContent sx={{ position: 'relative' }}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChangeTab}>
                                            <Tab label="Editar Número" sx={{ textTransform: 'uppercase', width: '20%' }} value="1" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <TabsBlackList
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            touched={touched}
                                            values={values}
                                            errors={errors}
                                            openModalBlackListEdit={openModalBlackListEdit}
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
                                            resetForm();
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Box>
                                <Box marginRight="2.5rem" marginBottom="1rem" gap={4}>
                                    <Button variant="contained" disabled={!isValid} type="submit" sx={{ textTransform: 'uppercase' }}>
                                        Editar Número
                                    </Button>
                                </Box>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </Dialog>
            <Backdrop sx={{ color: '#fff', zIndex: 12000, position: '' }} open={openBackdropBlackListEdit}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={openSnackbarBlackListEdit}
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

EditBlackListModal.propTypes = {
    openModalBlackListEdit: PropTypes.bool,
    openBackdropBlackListEdit: PropTypes.bool,
    openSnackbarBlackListEdit: PropTypes.bool,
    resultItemBlackList: PropTypes.object
};

export default EditBlackListModal;
