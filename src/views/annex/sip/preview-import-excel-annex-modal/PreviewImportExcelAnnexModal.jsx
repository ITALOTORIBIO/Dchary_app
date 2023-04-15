import PropTypes from 'prop-types';
import { useState, forwardRef, useEffect } from 'react';
import { Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, Slide, Snackbar, Tab, Alert } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { backdropOpenPreviewImportExcelAnnex, modalOpenPreviewImportExcelAnnex, snackbarOpenPreviewImportExcelAnnex } from 'store/modal';
import { ListPreviewImportAnnex } from './tabs-preview-import-excel-annex';
import * as Yup from 'yup';
import { getListAnnexSIP } from 'store/filters';
import { callToAnnexItem, callToAnnexList } from 'services/apis';
import { modalOpenImportExcelErrorAnnex } from 'store/modal';
import ImportExcelErrorAnnexModal from './import-excel-error-annex-modal/ImportExcelErrorAnnexModal';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const PreviewImportExcelAnnexModal = ({
    openModalPreviewImportExcelAnnex,
    openBackdropPreviewImportExcelAnnex,
    openSnackbarPreviewImportExcelAnnex,
    dataImportExcelAnnex
}) => {
    const [value, setValue] = useState('1');
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [dataIncorrect, setDataIncorrect] = useState([]);
    const [stat, setStat] = useState(true);
    const { openModalImportExcelErrorAnnex } = useSelector((state) => state.modalImportExcelErrorAnnex);
    let correctData = [];
    let incorrectData = [];
    const [snackbar, setSnackbar] = useState({
        message: '',
        severity: 'success',
        color: 'success'
    });

    const handleClose = () => {
        dispatch(modalOpenPreviewImportExcelAnnex(!openModalPreviewImportExcelAnnex));
        setValue('1');
    };

    const handleOpenBackdropImport = () => dispatch(backdropOpenPreviewImportExcelAnnex(true));
    const handleCloseBackdropImport = () => dispatch(backdropOpenPreviewImportExcelAnnex(false));

    const getDataListAnnex = async () => {
        const result = await callToAnnexList();
        if (result.ok) dispatch(getListAnnexSIP(result.data));
        else dispatch(getListAnnexSIP([]));
    };

    let annexSchema = Yup.object({
        id_sip: Yup.number().required().positive().integer(),
        name: Yup.string().required().max(9).min(1),
        callerid: Yup.string(),
        context: Yup.string().oneOf(['from-internal', 'from-external', 'from-none', 'from-live']),
        equipo: Yup.string().matches(/(^NO-APROV$)/),
        mailbox: Yup.string().required().email()
    });

    const validateAnnexData = () => {
        setStat(true);
        dataImportExcelAnnex.map((row) => {
            const validateAnnex = annexSchema.validate(row);
            validateAnnex.then(
                () => {
                    correctData.push(row);
                    //console.log(`${row.callerid} is okey`);
                },
                (error) => {
                    setStat(false);
                    incorrectData.push(`${row.callerid}, with error: ${error}`);
                    //console.error(`${row.callerid} with error: ${error}`);
                }
            );
        });
        setData(correctData);
        setDataIncorrect(incorrectData);
    };

    useEffect(() => {
        validateAnnexData();
    }, [dataImportExcelAnnex]);

    const handleImportAnnexExcel = () => {
        handleOpenBackdropImport();
        data.map(async (row) => {
            const rowResult = await callToAnnexItem(JSON.stringify(row));
            if (rowResult.isCreated) {
                console.log(rowResult.data);
            } else {
                if (rowResult.status) {
                    console.log(rowResult.message);
                } else {
                    console.log(rowResult.message.name);
                }
                console.log(rowResult.message.name);
            }
        });
        getDataListAnnex();
        handleCloseBackdropImport();
        handleClose();
    };

    const handleSetSnackBar = () => {
        if (stat) {
            setSnackbar({ message: 'Import successfully', severity: 'success', color: 'success' });
        } else {
            setSnackbar({ message: `Import with errors`, severity: 'warning', color: 'warning' });
        }
        handleOpenSnackbarImport();
        setTimeout(() => {
            handleCloseSnackbarImport();
        }, 6000);
    };

    const handleOpenSnackbarImport = () => dispatch(snackbarOpenPreviewImportExcelAnnex(true));
    const handleCloseSnackbarImport = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(snackbarOpenPreviewImportExcelAnnex(false));
    };

    const handleShowImportExcelErrorModal = () => {
        dispatch(modalOpenImportExcelErrorAnnex(!openModalImportExcelErrorAnnex));
    };

    return (
        <div>
            <Dialog
                open={openModalPreviewImportExcelAnnex}
                fullWidth
                maxWidth="md"
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="modal-preview-import-excel-annex"
            >
                <DialogContent>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList>
                                <Tab label="Lista de Anexos" sx={{ textTransform: 'uppercase', width: '20%' }} value="1" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <ListPreviewImportAnnex dataImportExcelAnnex={dataImportExcelAnnex} />
                        </TabPanel>
                    </TabContext>
                </DialogContent>
                <DialogActions>
                    <Box marginRight="0.5rem" marginBottom="1rem" gap={4}>
                        <Button variant="contained" sx={{ textTransform: 'uppercase' }} color="error" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Box>
                    <Box marginRight="2.5rem" marginBottom="1rem" gap={4}>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ textTransform: 'uppercase' }}
                            onClick={() => {
                                validateAnnexData();
                                handleImportAnnexExcel();
                                handleShowImportExcelErrorModal();
                                handleSetSnackBar();
                            }}
                        >
                            Importar
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
            <Backdrop sx={{ color: '#fff', zIndex: 12000, position: '' }} open={openBackdropPreviewImportExcelAnnex}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={openSnackbarPreviewImportExcelAnnex}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={handleCloseSnackbarImport}
            >
                <Alert
                    onClose={handleCloseSnackbarImport}
                    severity={snackbar.severity}
                    color={snackbar.color}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
            {dataIncorrect.length !== 0 ? (
                <ImportExcelErrorAnnexModal openModalImportExcelErrorAnnex={openModalImportExcelErrorAnnex} dataIncorrect={dataIncorrect} />
            ) : null}
        </div>
    );
};

PreviewImportExcelAnnexModal.propTypes = {
    openModalPreviewImportExcelAnnex: PropTypes.bool,
    openBackdropPreviewImportExcelAnnex: PropTypes.bool,
    openSnackbarPreviewImportExcelAnnex: PropTypes.bool,
    dataImportExcelAnnex: PropTypes.any
};

export default PreviewImportExcelAnnexModal;
