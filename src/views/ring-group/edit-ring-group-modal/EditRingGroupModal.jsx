import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import { Alert, Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, Slide, Snackbar, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpenRingGroupEdit, backdropOpenRingGroupEdit, snackbarOpenRingGroupEdit } from 'store/modal';
import { callToRingGroupList, callToEditRingGroupItem } from 'services/apis';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setNombreGrupo, setNumeroGrupo, setSelectAnexo } from 'store/ring-group';
import { useEffect } from 'react';
import { getRingGroup } from 'store/filters';
import TabsRingGroup from '../tabs-ring-group/TabsRingGroup';

const schema = Yup.object().shape({
    nombreGrupo: Yup.string().required('Nombre de grupo obligatorio'),
    numeroGrupo: Yup.string().required('Número de grupo obligatorio'),
    selectAnexo: Yup.string().required('Anexos requeridos')
});

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const EditRingGroupModal = ({ openModalRingGroupEdit, openBackdropRingGroupEdit, openSnackbarRingGroupEdit, resultItemRingGroup }) => {
    const [value, setValue] = useState('1');
    const [snackbar, setSnackbar] = useState({
        message: '',
        severity: 'success',
        color: 'success'
    });
    const dispatch = useDispatch();

    const { nombreGrupo, numeroGrupo, selectAnexo } = useSelector((state) => state.ringGroup);

    const initialValues = {
        nombreGrupo: resultItemRingGroup.name_group,
        numeroGrupo: resultItemRingGroup.num_group,
        selectAnexo: resultItemRingGroup.annex
    };

    useEffect(() => {
        dispatch(setNombreGrupo(initialValues.nombreGrupo));
        dispatch(setNumeroGrupo(initialValues.numeroGrupo));
        dispatch(setSelectAnexo(initialValues.selectAnexo));
    }, [initialValues.numeroGrupo, modalOpenRingGroupEdit]);

    const getDataRingGroup = async () => {
        const result = await callToRingGroupList();
        if (result.ok) dispatch(getRingGroup(result.data));
        else dispatch(getRingGroup([]));
    };

    const handleClose = () => {
        dispatch(setNombreGrupo(initialValues.nombreGrupo));
        dispatch(setNumeroGrupo(initialValues.numeroGrupo));
        dispatch(setSelectAnexo(initialValues.selectAnexo));
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
        const cant_annex = selectAnexo.split(',').length;
        const data = {
            name_group: nombreGrupo,
            num_group: numeroGrupo,
            annex: selectAnexo,
            cant_annex: cant_annex
        };
        console.log(data);
        const result = await callToEditRingGroupItem(data.name_group, data);
        if (result.isCreated) {
            getDataRingGroup();
            handleCloseBackdropEdit();
            handleCloseModal();
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
                maxWidth="md"
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
                                            <Tab label="Editar Número" sx={{ textTransform: 'uppercase', width: '20%' }} value="1" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <TabsRingGroup
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
                                        Editar Número
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

EditRingGroupModal.propTypes = {
    openModalRingGroupEdit: PropTypes.bool,
    openBackdropRingGroupEdit: PropTypes.bool,
    openSnackbarRingGroupEdit: PropTypes.bool,
    resultItemRingGroup: PropTypes.object
};

export default EditRingGroupModal;
