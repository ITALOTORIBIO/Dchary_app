// material-ui
import { Button, Grid, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

// project imports
import { gridSpacing } from 'store/constant';
import ListInformationQueue from './list-information-queue/ListInformationQueue';
import MainCard from 'ui-component/cards/MainCard';
import AddQueueModal from './add-queue-modal/AddQueueModal';
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
                                    <Typography variant="h4">Lista de Colas</Typography>
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
                                            Añadir Cola
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
                <Grid item width="100%">
                    <MainCard>
                        <ListInformationQueue />
                    </MainCard>
                </Grid>
            </Grid>
            <AddQueueModal open={open} />
        </>
    );
};

export default QueueManagement;
