import PropTypes from 'prop-types';
import { useState, forwardRef, useEffect } from 'react';
import { Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, Slide, Snackbar, Tab, Alert } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import {
    backdropOpenPreviewImportExcelRingGroup,
    modalOpenPreviewImportExcelRingGroup,
    snackbarOpenPreviewImportExcelRingGroup
} from 'store/modal';
import { ListPreviewImportRingGroup } from './tabs-preview-import-excel-ring-group';
import * as Yup from 'yup';
import { getRingGroup } from 'store/filters';
import { callToRingGroupItem, callToRingGroupList } from 'services/apis';
import { modalOpenImportExcelErrorRingGroup } from 'store/modal';
import ImportExcelErrorRingGroupModal from './import-excel-error-ring-group-modal/ImportExcelErrorRingGroupModal';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const PreviewImportExcelRingGroupModal = ({
    openModalPreviewImportExcelRingGroup,
    openBackdropPreviewImportExcelRingGroup,
    openSnackbarPreviewImportExcelRingGroup,
    dataImportExcelRingGroup
}) => {
    const [value, setValue] = useState('1');
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [dataIncorrect, setDataIncorrect] = useState([]);
    const { openModalImportExcelErrorRingGroup } = useSelector((state) => state.modalImportExcelErrorRingGroup);
    let correctData = [];
    let incorrectData = [];
    const [snackbar, setSnackbar] = useState({
        message: '',
        severity: 'success',
        color: 'success'
    });
    const [stat, setStat] = useState(true);

    const handleClose = () => {
        dispatch(modalOpenPreviewImportExcelRingGroup(!openModalPreviewImportExcelRingGroup));
        setValue('1');
    };

    const handleOpenBackdropImport = () => dispatch(backdropOpenPreviewImportExcelRingGroup(true));
    const handleCloseBackdropImport = () => dispatch(backdropOpenPreviewImportExcelRingGroup(false));

    const getDataRingGroup = async () => {
        const result = await callToRingGroupList();
        if (result.ok) dispatch(getRingGroup(result.data));
        else dispatch(getRingGroup([]));
    };

    let ringGroupSchema = Yup.object({
        name_group: Yup.string().required(),
        num_group: Yup.string().required(),
        annex: Yup.string().required(),
        cant_annex: Yup.string().required()
    });

    const validateRingGroupData = () => {
        setStat(true);
        dataImportExcelRingGroup.map((row) => {
            const validateRingGroup = ringGroupSchema.validate(row);
            validateRingGroup.then(
                () => {
                    correctData.push(row);
                },
                (error) => {
                    setStat(false);
                    incorrectData.push(`${row.name_group}, with error: ${error}`);
                }
            );
        });
        setData(correctData);
        setDataIncorrect(incorrectData);
    };

    useEffect(() => {
        validateRingGroupData();
    }, [dataImportExcelRingGroup]);

    const handleImportRingGroupExcel = () => {
        handleOpenBackdropImport();
        data.map(async (row) => {
            const rowResult = await callToRingGroupItem(JSON.stringify(row));
            if (rowResult.isCreated) {
                console.log(rowResult.data);
            } else {
                setSnackbar({ message: `Import with errors`, severity: 'warning', color: 'warning' });
                incorrectData.push(`${row.name_group}, with error: ${rowResult.message}`);
                //console.log(rowResult);
                if (rowResult.status) {
                    console.log(rowResult.message);
                } else {
                    console.log(rowResult.message.name);
                }
                //console.log(rowResult.message.name);
                setDataIncorrect(incorrectData);
            }
        });
        getDataRingGroup();
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

    const handleOpenSnackbarImport = () => dispatch(snackbarOpenPreviewImportExcelRingGroup(true));
    const handleCloseSnackbarImport = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(snackbarOpenPreviewImportExcelRingGroup(false));
    };

    const handleShowImportExcelErrorModal = () => {
        dispatch(modalOpenImportExcelErrorRingGroup(!openModalImportExcelErrorRingGroup));
    };

    return (
        <div>
            <Dialog
                open={openModalPreviewImportExcelRingGroup}
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
                                <Tab label="Ring Group" sx={{ textTransform: 'uppercase', width: '20%' }} value="1" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <ListPreviewImportRingGroup dataImportExcelRingGroup={dataImportExcelRingGroup} />
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
                                validateRingGroupData();
                                handleImportRingGroupExcel();
                                handleShowImportExcelErrorModal();
                                handleSetSnackBar();
                            }}
                        >
                            Importar
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
            <Backdrop sx={{ color: '#fff', zIndex: 12000, position: '' }} open={openBackdropPreviewImportExcelRingGroup}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={openSnackbarPreviewImportExcelRingGroup}
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
                <ImportExcelErrorRingGroupModal
                    openModalImportExcelErrorRingGroup={openModalImportExcelErrorRingGroup}
                    dataIncorrect={dataIncorrect}
                />
            ) : null}
        </div>
    );
};

PreviewImportExcelRingGroupModal.propTypes = {
    openModalPreviewImportExcelRingGroup: PropTypes.bool,
    openBackdropPreviewImportExcelRingGroup: PropTypes.bool,
    openSnackbarPreviewImportExcelRingGroup: PropTypes.bool,
    dataImportExcelRingGroup: PropTypes.any
};

export default PreviewImportExcelRingGroupModal;
