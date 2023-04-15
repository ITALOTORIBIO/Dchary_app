// material-ui
import { Button, Grid, Typography } from '@mui/material';
import { Add, KeyboardDoubleArrowDown } from '@mui/icons-material';

// project imports
import { gridSpacing } from 'store/constant';
import ListInformationConferences from './list-information-conferences/ListInformationConferences';
import MainCard from 'ui-component/cards/MainCard';
import AddConferenciasModal from './add-conferences-modal/AddConferencesModal';
import { modalOpenConferencias } from 'store/modal';
import { useDispatch, useSelector } from 'react-redux';
import { filterConferences, getConferences } from 'store/filters';
import { useEffect } from 'react';
import { callToConferencesList } from 'services/apis';

const Conferencias = () => {
    const { open } = useSelector((state) => state.modalConferencias);
    const dispatch = useDispatch();

    const handleShowAddConferenciasModal = () => {
        dispatch(modalOpenConferencias(!open));
    };

    const getDataListConferences = async () => {
        const result = await callToConferencesList();
        if (result.ok) dispatch(getConferences(result.data));
        else dispatch(getConferences([]));
    };

    useEffect(() => {
        getDataListConferences();
    }, []);

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item width="100%">
                    <MainCard>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Typography variant="h4">Lista Conferencias</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing} alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Button
                                            sx={{
                                                textTransform: 'uppercase',
                                                paddingX: '1.25rem',
                                                paddingY: '0.5rem'
                                            }}
                                            variant="contained"
                                            endIcon={<Add />}
                                            onClick={handleShowAddConferenciasModal}
                                        >
                                            Añadir Conferencia
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            sx={{
                                                textTransform: 'uppercase',
                                                paddingX: '1.25rem',
                                                paddingY: '0.5rem'
                                            }}
                                            variant="contained"
                                            endIcon={<KeyboardDoubleArrowDown />}
                                        >
                                            Herramientas
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
                <Grid item width="100%">
                    <MainCard>
                        <ListInformationConferences />
                    </MainCard>
                </Grid>
            </Grid>
            <AddConferenciasModal open={open} />
        </>
    );
};

export default Conferencias;
