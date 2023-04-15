import PropTypes from 'prop-types';
import { useState, useEffect, forwardRef } from 'react';
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Snackbar,
    Tab,
    Typography
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { modalOpenAnnexDelete, backdropOpenDelete, snackbarOpenDelete } from 'store/modal';
import { callToAnnexList, callToDeleteAnnexItem } from 'services/apis';
import { getListAnnexSIP } from 'store/filters';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const DeleteAnnexModal = ({ openModalDelete, openBackdropDelete, openSnackbarDelete, resultItemAnnex }) => {
    const [value, setValue] = useState('1');
    const dispatch = useDispatch();
    const [snackbar, setSnackbar] = useState({
        message: '',
        severity: 'success',
        color: 'success'
    });

    let initialValues = {
        extension: resultItemAnnex.name
    };

    useEffect(() => {}, [initialValues.extension, openModalDelete]);

    const getDataListAnnex = async () => {
        const result = await callToAnnexList();
        if (result.ok) dispatch(getListAnnexSIP(result.data));
        else dispatch(getListAnnexSIP([]));
    };

    const handleClose = () => {
        dispatch(modalOpenAnnexDelete(!openModalDelete));
        setValue('1');
    };

    const handleOpenBackdropDelete = () => dispatch(backdropOpenDelete(true));
    const handleCloseBackdropDelete = () => dispatch(backdropOpenDelete(false));

    const handleCallToDeleteAnnexItem = async () => {
        handleOpenBackdropDelete();
        //console.log(initialValues.extension);

        const result = await callToDeleteAnnexItem(initialValues.extension);

        if (result) {
            getDataListAnnex();
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

    const handleOpenSnackbarDelete = () => dispatch(snackbarOpenDelete(true));
    const handleCloseSnackbarDelete = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(snackbarOpenDelete(false));
    };

    return (
        <div>
            <Dialog
                open={openModalDelete}
                fullWidth
                maxWidth="sm"
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="modal-delete-annex-modal"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography fontWeight="500" fontSize="1.2rem" paddingTop="0.2rem">
                        Confirmación de Eliminación de Registro
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: '1rem', color: 'gray' }}>
                        ¿Está seguro que desea eliminar este anexo?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Box marginRight="0.5rem" gap={4}>
                        <Button variant="contained" sx={{ textTransform: 'uppercase', margin: 2 }} color="error" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="contained" sx={{ textTransform: 'uppercase' }} onClick={handleCallToDeleteAnnexItem}>
                            Eliminar Anexo
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={openSnackbarDelete}
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

DeleteAnnexModal.propTypes = {
    openModalDelete: PropTypes.bool,
    openBackdropDelete: PropTypes.bool,
    openSnackbarDelete: PropTypes.bool,
    resultItemAnnex: PropTypes.object
};

export default DeleteAnnexModal;
