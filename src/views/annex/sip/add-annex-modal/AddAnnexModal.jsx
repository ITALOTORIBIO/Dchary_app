import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import { Alert, Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, Slide, Snackbar, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { AdvancedAnnex, BasicAnnex, ProvisioningAnnex } from '../tabs-annex';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpenAnnex, backdropOpen, snackbarOpen } from 'store/modal';
import { callToAnnexItem, callToAnnexList } from 'services/apis';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getListAnnexSIP } from 'store/filters';
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

Yup.addMethod(Yup.string, 'stripEmptyString', function () {
    return this.transform((value) => (value === '' ? undefined : value));
});

const schema = Yup.object().shape({
    extension: Yup.string()
        .required('Extensión es obligatorio')
        .matches(/^[0-9]+$/, 'Debe ser solo números')
        .min(1, 'Extensión debe tener entre 1 a 9 dígitos')
        .max(9, 'Extensión debe tener entre 1 a 9 dígitos'),
    callerID: Yup.string().required('Caller ID es obligatorio'),
    voiceMail: Yup.string().email('Correo de voz no es válido').required('Correo de voz es obligatorio'),
    context: Yup.string().required('Contexto es obligatorio'),
    //dhcp: Yup.string().required('Host es obligatorio').max(15, 'Host no puede superar los 15 caracteres'),
    dhcp: Yup.string().test('test-name', 'Ingrese un host válido o dynamic', function (value) {
        const dynamicRegex = /(^dynamic$)/;
        const digitsRegex = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/;
        //const digitsRegex = /^.{0,15}$/;
        let isValidDynamic = dynamicRegex.test(value);
        let IsValidDigits = digitsRegex.test(value);
        if (isValidDynamic || IsValidDigits) {
            return true;
        } else {
            return false;
        }
    }),
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

const AddAnnexModal = ({ openModal, openBackdrop, openSnackbar }) => {
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

    const initialValues = {
        extension: extension,
        callerID: callerID,
        voiceMail: voiceMail,
        context: context,
        dhcp: dhcp,
        record: record,
        callGroup: callGroup,
        pickGroup: pickGroup,
        codec: codec,
        tlsSrtp: tlsSrtp,
        openVPN: openVPN,
        brand: telefono.brand,
        model: telefono.model,
        mac: telefono.mac,
        checkVLAN: checkVLAN,
        vlan: vlan
    };

    const getDataListAnnex = async () => {
        const result = await callToAnnexList();
        if (result.ok) dispatch(getListAnnexSIP(result.data));
        else dispatch(getListAnnexSIP([]));
    };

    const handleClose = () => {
        dispatch(setInputValue('extension', ''));
        dispatch(setInputValue('key', ''));
        dispatch(setInputValue('callerID', ''));
        dispatch(setInputValue('voiceMail', ''));
        dispatch(setInputValue('context', ''));
        dispatch(setCallGroup(''));
        dispatch(setDHCP('dynamic'));
        dispatch(setOpenVPN(false));
        dispatch(setPickGroup(''));
        dispatch(setRecord('Ninguna'));
        dispatch(setTLS(false));
        dispatch(setBrand(''));
        dispatch(setCheckVLAN(false));
        dispatch(setMac(''));
        dispatch(setModel(''));
        dispatch(setVLAN(''));
        dispatch(modalOpenAnnex(!openModal));
        setValue('1');
    };
    const handleChangeTab = (event, newValue) => setValue(newValue);
    const handleOpenBackdrop = () => dispatch(backdropOpen(true));
    const handleCloseBackdrop = () => dispatch(backdropOpen(false));

    const onSubmit = async () => {
        handleOpenBackdrop();
        const telefonoData = {
            id_marca_telefono: telefono.brand ? telefono.brand : '',
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
        const result = await callToAnnexItem(data);
        if (result.isCreated) {
            console.log(result.data);
            getDataListAnnex();
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

    const handleOpenSnackbar = () => dispatch(snackbarOpen(true));
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(snackbarOpen(false));
    };

    return (
        <div>
            <Dialog
                open={openModal}
                fullWidth
                maxWidth="md"
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="modal-add-annex"
            >
                <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
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
                                            resetForm();
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Box>
                                <Box marginRight="2.5rem" marginBottom="1rem" gap={4}>
                                    <Button variant="contained" disabled={!isValid} type="submit" sx={{ textTransform: 'uppercase' }}>
                                        Crear Anexo
                                    </Button>
                                </Box>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </Dialog>
            <Backdrop sx={{ color: '#fff', zIndex: 12000, position: '' }} open={openBackdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={openSnackbar}
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

AddAnnexModal.propTypes = {
    openModal: PropTypes.bool,
    openBackdrop: PropTypes.bool,
    openSnackbar: PropTypes.bool
};

export default AddAnnexModal;
