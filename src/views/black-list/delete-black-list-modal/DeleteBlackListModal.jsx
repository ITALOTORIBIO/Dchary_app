import PropTypes from 'prop-types';
import { useState, useEffect, forwardRef } from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, Slide, Snackbar, Tab, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { modalOpenBlackListDelete, backdropOpenBlackListDelete, snackbarOpenBlackListDelete } from 'store/modal';
import { callToBlackList, callToDeleteBlackListItem } from 'services/apis';
import { getBlackList } from 'store/filters';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const DeleteBlackListModal = ({
    openModalBlackListDelete,
    openBackdropBlackListDelete,
    openSnackbarBlackListDelete,
    resultItemBlackList
}) => {
    const [value, setValue] = useState('1');
    const dispatch = useDispatch();
    const [snackbar, setSnackbar] = useState({
        message: '',
        severity: 'success',
        color: 'success'
    });

    let initialValues = {
        num_tlf: resultItemBlackList.num_tlf
    };

    useEffect(() => {}, [initialValues.num_tlf, openModalBlackListDelete]);

    const getDataBlackList = async () => {
        const result = await callToBlackList();
        if (result.ok) dispatch(getBlackList(result.data));
        else dispatch(getBlackList([]));
    };

    const handleClose = () => {
        dispatch(modalOpenBlackListDelete(!openModalBlackListDelete));
        setValue('1');
    };

    const handleOpenBackdropDelete = () => dispatch(backdropOpenBlackListDelete(true));
    const handleCloseBackdropDelete = () => dispatch(backdropOpenBlackListDelete(false));

    const handleCallToDeleteBlackListItem = async () => {
        handleOpenBackdropDelete();
        const result = await callToDeleteBlackListItem(initialValues.num_tlf);
        if (result) {
            getDataBlackList();
            handleCloseBackdropDelete();
            handleClose();
            setSnackbar({ message: 'Registro eliminado', severity: 'success', color: 'success' });
        } else {
            setSnackbar({ message: 'Registro no eliminado', severity: 'error', color: 'error' });
        }

        handleOpenSnackbarDelete();
        setTimeout(() => {
            handleCloseSnackbarDelete();
        }, 6000);
    };

    const handleOpenSnackbarDelete = () => dispatch(snackbarOpenBlackListDelete(true));
    const handleCloseSnackbarDelete = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(snackbarOpenBlackListDelete(false));
    };

    return (
        <div>
            <Dialog
                open={openModalBlackListDelete}
                fullWidth
                maxWidth="xs"
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="modal-delete-blackList"
            >
                <DialogContent>
                    <TabContext value={value}>
                        <TabPanel value="1">
                            <Typography variant="h3">Confirmación de Eliminación de Número</Typography>
                            <Typography variant="body1" mt={2}>
                                ¿Está seguro que desea eliminar este número?
                            </Typography>
                        </TabPanel>
                    </TabContext>
                </DialogContent>
                <DialogActions>
                    <Box marginRight="0.5rem" marginBottom="1rem" gap={2}>
                        <Button variant="contained" sx={{ textTransform: 'uppercase', margin: 2 }} color="error" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="contained" sx={{ textTransform: 'uppercase' }} onClick={handleCallToDeleteBlackListItem}>
                            Eliminar Número
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={openSnackbarBlackListDelete}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={handleCloseSnackbarDelete}
            >
                <Alert
                    onClose={handleCloseSnackbarDelete}
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

DeleteBlackListModal.propTypes = {
    openModalBlackListDelete: PropTypes.bool,
    openBackdropBlackListDelete: PropTypes.bool,
    openSnackbarBlackListDelete: PropTypes.bool,
    resultItemBlackList: PropTypes.object
};

export default DeleteBlackListModal;
