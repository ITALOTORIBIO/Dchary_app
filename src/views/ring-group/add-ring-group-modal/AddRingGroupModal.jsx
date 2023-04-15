import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, Slide, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpenRingGroup, backdropOpenRingGroup, snackbarOpenRingGroup } from 'store/modal';
import TabsRingGroup from '../tabs-ring-group/TabsRingGroup';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getRingGroup } from 'store/filters';
import { callToRingGroupList, callToRingGroupItem } from 'services/apis';
import { setNombreGrupo, setNumeroGrupo, setSelectAnexo } from 'store/ring-group';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const schema = Yup.object().shape({
    nombreGrupo: Yup.string().required('Nombre de grupo obligatorio'),
    numeroGrupo: Yup.string().required('Número de grupo obligatorio'),
    selectAnexo: Yup.string().required('Anexo obligatorio')
});

const AddRingGroupModal = ({ open, statusClose, setStatusClose, openBackdropRingGroup, openSnackbarRingGroup }) => {
    const [value, setValue] = useState('1');
    const [snackbar, setSnackbar] = useState({
        message: '',
        severity: 'success',
        color: 'success'
    });
    const { nombreGrupo, numeroGrupo, selectAnexo } = useSelector((state) => state.ringGroup);
    const dispatch = useDispatch();

    const initialValues = {
        nombreGrupo: nombreGrupo,
        numeroGrupo: numeroGrupo,
        selectAnexo: selectAnexo
    };

    const handleChangeTab = (event, newValue) => setValue(newValue);
    const handleOpenBackdrop = () => dispatch(backdropOpenRingGroup(true));
    const handleCloseBackdrop = () => dispatch(backdropOpenRingGroup(false));

    const getDataListRingGroup = async () => {
        const result = await callToRingGroupList();
        if (result.ok) dispatch(getRingGroup(result.data));
        else dispatch(getRingGroup([]));
    };

    const onSubmit = async () => {
        handleOpenBackdrop();
        const cant_annex = selectAnexo.split(',').length;
        const data = {
            name_group: nombreGrupo,
            num_group: numeroGrupo,
            annex: selectAnexo,
            cant_annex: cant_annex
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

    const handleClose = () => {
        dispatch(setNombreGrupo(''));
        dispatch(setNumeroGrupo(''));
        dispatch(setSelectAnexo(''));
        dispatch(modalOpenRingGroup(!open));
        setStatusClose(true);
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
                                        <TabList onChange={handleChange}>
                                            <Tab label="Nuevo Ring Group" sx={{ textTransform: 'uppercase', width: '20%' }} value="1" />
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
                                        Crear Ring Group
                                    </Button>
                                </Box>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
};

AddRingGroupModal.propTypes = {
    open: PropTypes.bool,
    statusClose: PropTypes.any,
    setStatusClose: PropTypes.any
};

export default AddRingGroupModal;
