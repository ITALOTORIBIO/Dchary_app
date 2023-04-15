import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, Slide, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpenImportExcelErrorAnnex } from 'store/modal';
import AccordionDetailsError from './accordionDetailsError/AccordionDetailsError';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const ImportExcelErrorAnnexModal = ({ openModalImportExcelErrorAnnex, dataIncorrect }) => {
    const [value, setValue] = useState('1');
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(modalOpenImportExcelErrorAnnex(!openModalImportExcelErrorAnnex));
    };

    return (
        <div>
            <Dialog
                open={openModalImportExcelErrorAnnex}
                fullWidth
                maxWidth="md"
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="modal-import-excel-error-annex"
            >
                <DialogContent>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList>
                                <Tab label="Errores encontrados" sx={{ textTransform: 'uppercase', width: '20%' }} value="1" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <AccordionDetailsError dataIncorrect={dataIncorrect} />
                        </TabPanel>
                    </TabContext>
                </DialogContent>
                <DialogActions>
                    <Box marginRight="0.5rem" marginBottom="1rem" gap={4}>
                        <Button variant="contained" sx={{ textTransform: 'uppercase' }} color="error" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    );
};

ImportExcelErrorAnnexModal.propTypes = {
    openModalImportExcelErrorAnnex: PropTypes.bool,
    dataIncorrectData: PropTypes.any
};

export default ImportExcelErrorAnnexModal;
