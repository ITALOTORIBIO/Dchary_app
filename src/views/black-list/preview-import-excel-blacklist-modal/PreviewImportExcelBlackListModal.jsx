import PropTypes from 'prop-types';
import { useState, forwardRef, useEffect } from 'react';
import { Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, Slide, Snackbar, Tab, Alert } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import {
    backdropOpenPreviewImportExcelBlackList,
    modalOpenPreviewImportExcelBlackList,
    snackbarOpenPreviewImportExcelBlackList
} from 'store/modal';
import { ListPreviewImportBlackList } from './tabs-preview-import-excel-blacklist';
import * as Yup from 'yup';
import { getBlackList } from 'store/filters';
import { callToBlackListItem, callToBlackList } from 'services/apis';
import { modalOpenImportExcelErrorBlackList } from 'store/modal';
import ImportExcelErrorBlackListModal from './import-excel-error-blacklist-modal/ImportExcelErrorBlackListModal';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const PreviewImportExcelBlackListModal = ({
    openModalPreviewImportExcelBlackList,
    openBackdropPreviewImportExcelBlackList,
    openSnackbarPreviewImportExcelBlackList,
    dataImportExcelBlackList
}) => {
    const [value, setValue] = useState('1');
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [dataIncorrect, setDataIncorrect] = useState([]);
    const { openModalImportExcelErrorBlackList } = useSelector((state) => state.modalImportExcelErrorBlackList);
    let correctData = [];
    let incorrectData = [];
    const [snackbar, setSnackbar] = useState({
        message: '',
        severity: 'success',
        color: 'success'
    });
    const [stat, setStat] = useState(true);

    const handleClose = () => {
        dispatch(modalOpenPreviewImportExcelBlackList(!openModalPreviewImportExcelBlackList));
        setValue('1');
    };

    const handleOpenBackdropImport = () => dispatch(backdropOpenPreviewImportExcelBlackList(true));
    const handleCloseBackdropImport = () => dispatch(backdropOpenPreviewImportExcelBlackList(false));

    const getDataBlackList = async () => {
        const result = await callToBlackList();
        if (result.ok) dispatch(getBlackList(result.data));
        else dispatch(getBlackList([]));
    };

    let blackListSchema = Yup.object({
        num_tlf: Yup.string().required().length(9, 'Número telefónico debe tener 9 dígitos'),
        description: Yup.string(),
        status: Yup.boolean(),
        type_call: Yup.string().oneOf(['Entrantes', 'Salientes'])
    });

    const validateBlackListData = () => {
        setStat(true);
        dataImportExcelBlackList.map((row) => {
            const validateBlackList = blackListSchema.validate(row);
            validateBlackList.then(
                () => {
                    correctData.push(row);
                },
                (error) => {
                    setStat(false);
                    incorrectData.push(`${row.num_tlf}, with error: ${error}`);
                }
            );
        });
        setData(correctData);
        setDataIncorrect(incorrectData);
    };

    useEffect(() => {
        validateBlackListData();
    }, [dataImportExcelBlackList]);

    const handleImportBlackListExcel = () => {
        handleOpenBackdropImport();
        data.map(async (row) => {
            const rowResult = await callToBlackListItem(JSON.stringify(row));
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
        getDataBlackList();
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

    const handleOpenSnackbarImport = () => dispatch(snackbarOpenPreviewImportExcelBlackList(true));
    const handleCloseSnackbarImport = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(snackbarOpenPreviewImportExcelBlackList(false));
    };

    const handleShowImportExcelErrorModal = () => {
        dispatch(modalOpenImportExcelErrorBlackList(!openModalImportExcelErrorBlackList));
    };

    return (
        <div>
            <Dialog
                open={openModalPreviewImportExcelBlackList}
                fullWidth
                maxWidth="md"
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="modal-preview-import-excel-blacklist"
            >
                <DialogContent>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList>
                                <Tab label="Lista negra" sx={{ textTransform: 'uppercase', width: '20%' }} value="1" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <ListPreviewImportBlackList dataImportExcelBlackList={dataImportExcelBlackList} />
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
                                validateBlackListData();
                                handleImportBlackListExcel();
                                handleShowImportExcelErrorModal();
                                handleSetSnackBar();
                            }}
                        >
                            Importar
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
            <Backdrop sx={{ color: '#fff', zIndex: 12000, position: '' }} open={openBackdropPreviewImportExcelBlackList}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={openSnackbarPreviewImportExcelBlackList}
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
                <ImportExcelErrorBlackListModal
                    openModalImportExcelErrorBlackList={openModalImportExcelErrorBlackList}
                    dataIncorrect={dataIncorrect}
                />
            ) : null}
        </div>
    );
};

PreviewImportExcelBlackListModal.propTypes = {
    openModalPreviewImportExcelBlackList: PropTypes.bool,
    openBackdropPreviewImportExcelBlackList: PropTypes.bool,
    openSnackbarPreviewImportExcelBlackList: PropTypes.bool,
    dataImportExcelBlackList: PropTypes.any
};

export default PreviewImportExcelBlackListModal;
