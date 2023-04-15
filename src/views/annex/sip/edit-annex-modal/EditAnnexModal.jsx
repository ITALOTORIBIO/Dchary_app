import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import { Alert, Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, Slide, Snackbar, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { AdvancedAnnex, BasicAnnex, ProvisioningAnnex } from '../tabs-annex';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpenAnnexEdit, backdropOpenEdit, snackbarOpenEdit } from 'store/modal';
import { callToAnnexList, callToEditAnnexItem } from 'services/apis';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
    setCallGroup,
    setDHCP,
    setOpenVPN,
    setPickGroup,
    setRecord,
    setTLS,
    setInputValue,
    setBrand,
    setCheckVLAN,
    setMac,
    setModel,
    setVLAN
} from 'store/annex';
import { useEffect } from 'react';
import { getListAnnexSIP } from 'store/filters';

const schema = Yup.object().shape({
    extension: Yup.string().length(4, 'Extensión debe tener 4 dígitos').required('Extensión es obligatorio'),
    callerID: Yup.string().required('Caller ID es obligatorio'),
    voiceMail: Yup.string().email('Correo de voz no es válido').required('Correo de voz es obligatorio'),
    context: Yup.string().required('Contexto es obligatorio'),
    //dhcp: Yup.string().required('Host es obligatorio').max(15, 'Host no puede superar los 15 caracteres'),
    dhcp: Yup.string().test('test-name', 'Ingrese un host válido o dynamic', function (value) {
        const dynamicRegex = /(^dynamic$)/;
        //const digitsRegex = (\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}
        const digitsRegex = /^.{0,15}$/;
        let isValidDynamic = dynamicRegex.test(value);
        let IsValidDigits = digitsRegex.test(value);
        if (isValidDynamic || IsValidDigits) {
            return true;
        } else {
            return false;
        }
    }),
    //mac: Yup.string().required('MAC es requerido').length(12, 'No es un MAC válido')
    //mac: Yup.string().length(12, 'No es un MAC válido')

    mac: Yup.string().test('test-name', 'Ingrese una MAC válida', function (value) {
        const MACRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
        let isValidMAC = MACRegex.test(value);
        if (value) {
            return isValidMAC;
        } else {
            return true;
        }
    })
});

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const EditAnnexModal = ({ openModalEdit, openBackdropEdit, openSnackbarEdit, resultItemAnnex }) => {
    const [value, setValue] = useState('1');
    const [snackbar, setSnackbar] = useState({
        message: '',
        severity: 'success',
        color: 'success'
    });
    const dispatch = useDispatch();

    const { extension, key, callerID, voiceMail, context } = useSelector((state) => state.basicAnnex);
    const { dhcp, record, callGroup, pickGroup, codec, tlsSrtp, openVPN } = useSelector((state) => state.advancedAnnex);
    const { telefono, checkVLAN, vlan } = useSelector((state) => state.provisioningAnnex);

    let initialValues = {
        extension: resultItemAnnex.name,
        callerID: resultItemAnnex.callerid ? resultItemAnnex.callerid : '',
        voiceMail: resultItemAnnex.mailbox ? resultItemAnnex.mailbox : '',
        secret: resultItemAnnex.secret ? resultItemAnnex.secret : '',
        context: resultItemAnnex.context ? resultItemAnnex.context : 'from-internal',
        dhcp: 'dynamic',
        record: resultItemAnnex.grabacion ? resultItemAnnex.grabacion : 'Ninguna',
        callGroup: resultItemAnnex.callgroup ? resultItemAnnex.callgroup : '',
        pickGroup: resultItemAnnex.pickupgroup ? resultItemAnnex.pickupgroup : '',
        tlsSrtp: resultItemAnnex.tls_srtp ? true : false,
        openVPN: resultItemAnnex.openvpn ? true : false,
        brand: resultItemAnnex.telefono != null ? resultItemAnnex.telefono.id_marca_telefono : 0,
        model: resultItemAnnex.telefono != null ? resultItemAnnex.telefono.id_modelo_telefono : '',
        mac: resultItemAnnex.telefono != null ? resultItemAnnex.telefono.no_mac : '',
        vlan: resultItemAnnex.num_vlan ? resultItemAnnex.num_vlan : '',
        checkVLAN: resultItemAnnex.num_vlan ? true : false
    };

    useEffect(() => {
        dispatch(setInputValue('extension', initialValues.extension));
        dispatch(setInputValue('key', initialValues.secret));
        dispatch(setInputValue('callerID', initialValues.callerID));
        dispatch(setInputValue('voiceMail', initialValues.voiceMail));
        dispatch(setInputValue('context', initialValues.context));
        dispatch(setCallGroup(initialValues.callGroup));
        dispatch(setDHCP(initialValues.dhcp));
        dispatch(setOpenVPN(initialValues.openVPN));
        dispatch(setPickGroup(initialValues.pickGroup));
        dispatch(setRecord(initialValues.record));
        dispatch(setTLS(initialValues.tlsSrtp));
        dispatch(setBrand(initialValues.brand));
        dispatch(setCheckVLAN(initialValues.checkVLAN));
        dispatch(setMac(initialValues.mac));
        dispatch(setModel(initialValues.model));
        dispatch(setVLAN(initialValues.vlan));
    }, [initialValues.extension, modalOpenAnnexEdit]);

    const getDataListAnnex = async () => {
        const result = await callToAnnexList();
        if (result.ok) dispatch(getListAnnexSIP(result.data));
        else dispatch(getListAnnexSIP([]));
    };

    const handleClose = () => {
        dispatch(setInputValue('extension', initialValues.extension));
        dispatch(setInputValue('key', initialValues.secret));
        dispatch(setInputValue('callerID', initialValues.callerID));
        dispatch(setInputValue('voiceMail', initialValues.voiceMail));
        dispatch(setInputValue('context', initialValues.context));
        dispatch(setCallGroup(initialValues.callGroup));
        dispatch(setDHCP(initialValues.dhcp));
        dispatch(setOpenVPN(initialValues.openVPN));
        dispatch(setPickGroup(initialValues.pickGroup));
        dispatch(setRecord(initialValues.record));
        dispatch(setTLS(initialValues.tlsSrtp));
        dispatch(setBrand(initialValues.brand));
        dispatch(setCheckVLAN(initialValues.checkVLAN));
        dispatch(setMac(initialValues.mac));
        dispatch(setModel(initialValues.model));
        dispatch(setVLAN(initialValues.vlan));
    };

    const handleCloseModal = () => {
        dispatch(modalOpenAnnexEdit(!openModalEdit));
        setValue('1');
    };

    const handleChangeTab = (event, newValue) => setValue(newValue);
    const handleOpenBackdropEdit = () => dispatch(backdropOpenEdit(true));
    const handleCloseBackdropEdit = () => dispatch(backdropOpenEdit(false));

    const onSubmit = async () => {
        handleOpenBackdropEdit();
        const telefonoData = {
            id_marca_telefono: telefono.brand != 0 ? telefono.brand : '',
            id_modelo_telefono: telefono.model ? telefono.model : '',
            no_mac: telefono.mac ? telefono.mac : null
        };
        const data = {
            name: extension,
            accountcode: extension,
            secret: key,
            callerid: callerID,
            mailbox: voiceMail.length !== 0 ? voiceMail.toString() : null,
            context: context,
            grabacion: record.length !== 0 ? (record.length !== 'Ninguna' ? record : null) : null,
            callgroup: callGroup.length !== 0 ? callGroup : null,
            pickupgroup: pickGroup.length !== 0 ? pickGroup : null,
            allow: codec.selected.join(',') || null,
            tls_srtp: tlsSrtp ? 1 : null,
            openvpn: openVPN ? 2 : null,
            num_vlan: checkVLAN ? vlan : null,
            telefono: telefonoData
        };
        console.log(data);
        const result = await callToEditAnnexItem(extension, data);
        if (result.isCreated) {
            getDataListAnnex();
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

    const handleOpenSnackbarEdit = () => dispatch(snackbarOpenEdit(true));
    const handleCloseSnackbarEdit = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(snackbarOpenEdit(false));
    };

    /*Pendiente arreglar lo de editar: 
Click en editar
Editar algun campo
Aceptar editar
Volver a dar click en editar
Verificar en redux que el valor es el antiguo
*/
    return (
        <div>
            <Dialog
                open={openModalEdit}
                fullWidth
                maxWidth="md"
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseModal}
                aria-describedby="modal-edit-annex"
            >
                <Formik enableReinitialize initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
                    {({ errors, handleBlur, handleSubmit, handleChange, touched, values, isValid, resetForm, setFieldValue }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <DialogContent sx={{ position: 'relative' }}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList variant="fullWidth" onChange={handleChangeTab}>
                                            <Tab label="Básico" sx={{ textTransform: 'uppercase' }} value="1" />
                                            <Tab label="Avanzado" sx={{ textTransform: 'uppercase' }} value="2" />
                                            <Tab label="Aprovisionamiento" sx={{ textTransform: 'uppercase' }} value="3" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <BasicAnnex
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            touched={touched}
                                            values={values}
                                            errors={errors}
                                            openModalEdit={openModalEdit}
                                            setFieldValue={setFieldValue}
                                        />
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <AdvancedAnnex
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            touched={touched}
                                            values={values}
                                            errors={errors}
                                        />
                                    </TabPanel>
                                    <TabPanel value="3">
                                        <ProvisioningAnnex
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            touched={touched}
                                            values={values}
                                            errors={errors}
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
                                        Editar Anexo
                                    </Button>
                                </Box>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </Dialog>
            <Backdrop sx={{ color: '#fff', zIndex: 12000, position: '' }} open={openBackdropEdit}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={openSnackbarEdit}
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

EditAnnexModal.propTypes = {
    openModalEdit: PropTypes.bool,
    openBackdropEdit: PropTypes.bool,
    openSnackbarEdit: PropTypes.bool,
    resultItemAnnex: PropTypes.object
};

export default EditAnnexModal;
