// material-ui
import { Button, Grid, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

// project imports
import { gridSpacing } from 'store/constant';
import ListInformationMonitoringQueue from './list-information-monitoring-queue/ListInformationMonitoringQueue';
import MainCard from 'ui-component/cards/MainCard';
import AddQueueMonitoringModal from './add-monitoring-queue-modal/AddQueueMonitoringModal';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpenQueue } from 'store/modal';

const QueueManagement = () => {
    const { open } = useSelector((state) => state.modalQueue);
    const dispatch = useDispatch();

    const handleShowAddQueueModal = () => {
        dispatch(modalOpenQueue(!open));
    };

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item width="100%">
                    <MainCard>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Typography variant="h4">Monitoreo de Colas</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Button
                                            sx={{
                                                textTransform: 'uppercase',
                                                paddingX: '1.25rem',
                                                paddingY: '0.5rem'
                                            }}
                                            variant="contained"
                                            endIcon={<Add />}
                                            onClick={handleShowAddQueueModal}
                                        >
                                            Agregar datos de monitoreo
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
                <Grid item width="100%">
                    <MainCard>
                        <ListInformationMonitoringQueue />
                    </MainCard>
                </Grid>
            </Grid>
            <AddQueueMonitoringModal open={open} />
        </>
    );
};

export default QueueManagement;
