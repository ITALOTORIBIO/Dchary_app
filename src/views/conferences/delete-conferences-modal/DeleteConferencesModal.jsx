import PropTypes from 'prop-types';
import { useState, useEffect, forwardRef } from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, Slide, Snackbar, Tab, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { modalOpenRingGroupDelete, backdropOpenRingGroupDelete, snackbarOpenRingGroupDelete } from 'store/modal';
import { callToRingGroupList, callToDeleteRingGroupItem } from 'services/apis';
import { getRingGroup } from 'store/filters';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const DeleteConferencesModal = ({
    openModalRingGroupDelete,
    openBackdropRingGroupDelete,
    openSnackbarRingGroupDelete,
    resultItemRingGroup
}) => {
    const [value, setValue] = useState('1');
    const dispatch = useDispatch();
    const [snackbar, setSnackbar] = useState({
        message: '',
        severity: 'success',
        color: 'success'
    });

    let initialValues = {
        nom_prod: resultItemRingGroup.nom_prod
    };

    useEffect(() => {}, [initialValues.nom_prod, openModalRingGroupDelete]);

    const getDataRingGroup = async () => {
        const result = await callToRingGroupList();
        if (result.ok) dispatch(getRingGroup(result.data));
        else dispatch(getRingGroup([]));
    };

    const handleClose = () => {
        dispatch(modalOpenRingGroupDelete(!openModalRingGroupDelete));
        setValue('1');
    };

    const handleOpenBackdropDelete = () => dispatch(backdropOpenRingGroupDelete(true));
    const handleCloseBackdropDelete = () => dispatch(backdropOpenRingGroupDelete(false));

    const handleCallToDeleteRingGroupItem = async () => {
        handleOpenBackdropDelete();
        const result = await callToDeleteRingGroupItem(initialValues.nom_prod);
        if (result) {
            getDataRingGroup();
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

    const handleOpenSnackbarDelete = () => dispatch(snackbarOpenRingGroupDelete(true));
    const handleCloseSnackbarDelete = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(snackbarOpenRingGroupDelete(false));
    };

    return (
        <div>
            <Dialog
                open={openModalRingGroupDelete}
                fullWidth
                maxWidth="xs"
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="modal-delete-ring-group"
            >
                <DialogContent>
                    <TabContext value={value}>
                        <TabPanel value="1">
                            <Typography variant="h3">Confirmación de Eliminación de Producto</Typography>
                            <Typography variant="body1" mt={2}>
                                ¿Está seguro que desea eliminar este producto?
                            </Typography>
                        </TabPanel>
                    </TabContext>
                </DialogContent>
                <DialogActions>
                    <Box marginRight="0.5rem" marginBottom="1rem" gap={2}>
                        <Button variant="contained" sx={{ textTransform: 'uppercase', margin: 2 }} color="error" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="contained" sx={{ textTransform: 'uppercase' }} onClick={handleCallToDeleteRingGroupItem}>
                            Eliminar producto
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={openSnackbarRingGroupDelete}
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

DeleteConferencesModal.propTypes = {
    openModalRingGroupDelete: PropTypes.bool,
    openBackdropRingGroupDelete: PropTypes.bool,
    openSnackbarRingGroupDelete: PropTypes.bool,
    resultItemRingGroup: PropTypes.object
};

export default DeleteConferencesModal;
