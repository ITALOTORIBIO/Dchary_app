import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// data
import ServerInformation from './ServerInformation';
import { callToSystemResources } from 'services/apis';

const SystemResourcesCard = () => {
    const [dataServer, setDataServer] = useState({});

    useEffect(() => {
        const getDataSystemResources = async () => {
            const result = await callToSystemResources();
            if (result.ok) setDataServer(result.data);
            else setDataServer(result.data);
        };
        getDataSystemResources();
    });

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h4">Productos más usados en cocina</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {!dataServer ? (
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Typography fontWeight="bold">Not data found</Typography>
                        </Box>
                    ) : (
                        <ServerInformation dataServer={dataServer} />
                    )}
                </Grid>
            </Grid>
        </MainCard>
    );
};

SystemResourcesCard.propTypes = {
    isLoading: PropTypes.bool
};

export default SystemResourcesCard;
