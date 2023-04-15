import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, Slide, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { modalOpenAudio } from 'store/modal';
import { Audios } from '../tabs-audio';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const AudioModal = ({ open }) => {
    const [value, setValue] = useState('1');
    const dispatch = useDispatch();

    const handleClose = () => dispatch(modalOpenAudio(!open));
    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <div>
            <Dialog
                open={open}
                fullWidth
                maxWidth="md"
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="modal-add-black-list"
            >
                <DialogContent>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange}>
                                <Tab label="Lista de Audios" sx={{ textTransform: 'uppercase', width: '20%' }} value="1" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Audios />
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

AudioModal.propTypes = {
    open: PropTypes.bool
};

export default AudioModal;
