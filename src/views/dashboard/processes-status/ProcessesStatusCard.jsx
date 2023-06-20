import PropTypes from 'prop-types';
import { Fragment, useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import { callToServiceStatus } from 'services/apis';

import Typical from 'react-typical';

const ProcessesStatusCard = () => {
    const theme = useTheme();
    const [dataServerStatus, setDataServerStatus] = useState([]);

    useEffect(() => {
        const getDataServerStatus = async () => {
            const result = await callToServiceStatus();
            if (result.ok) setDataServerStatus(result.data);
            else setDataServerStatus(result.data);
        };
        getDataServerStatus();
    });

    return (
        <MainCard content={false}>
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignContent="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h4">Total de Ventas</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {!dataServerStatus ? (
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Typography fontWeight="bold">Not data found</Typography>
                            </Box>
                        ) : !dataServerStatus.length === 0 ? (
                            <Typical loop={Infinity} wrapper="b" steps={['Cargando...', 750]} />
                        ) : (
                            dataServerStatus.map((item, index) => (
                                <Fragment key={index}>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        {item.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid
                                                            item
                                                            sx={{
                                                                backgroundColor:
                                                                    item.status === 'active'
                                                                        ? theme.palette.success.dark
                                                                        : theme.palette.error.dark,
                                                                paddingX: '0.6rem',
                                                                paddingY: '0.2rem',
                                                                borderRadius: '0.25rem'
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    textTransform: 'uppercase',
                                                                    fontSize: '0.8rem',
                                                                    fontWeight: '500'
                                                                }}
                                                                color="white"
                                                            >
                                                                {item.status}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    color: item.status === 'active' ? theme.palette.success.dark : theme.palette.error.dark
                                                }}
                                            >
                                                {item.service}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    {index !== dataServerStatus.length - 1 && <Divider sx={{ my: 1.5 }} />}
                                </Fragment>
                            ))
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </MainCard>
    );
};

ProcessesStatusCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ProcessesStatusCard;
