import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Divider, Grid, Typography } from '@mui/material';

// others
import customPalette from 'themes/styles/customPalette';

const MonitoringCard = ({ isLoading, data }) => {
    const theme = useTheme();
    const { title, status, hostname, callerId } = data;
    return (
        <Card
            sx={{
                borderRadius: '0.5rem',
                boxShadow: '5px 5px 4px rgba(150, 150, 150, 0.1)'
            }}
        >
            <Grid container padding={3}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography fontSize="1rem" fontWeight="bold">
                                Anexo {title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid
                                    item
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    gap={1}
                                    sx={{
                                        backgroundColor:
                                            status === 'ACTIVO'
                                                ? theme.palette.success.dark
                                                : status === 'INACTIVO'
                                                ? theme.palette.error.dark
                                                : customPalette.orangeLight,
                                        paddingX: '0.6rem',
                                        paddingY: '0.2rem',
                                        borderRadius: '0.25rem',
                                        minWidth: 100,
                                        color: '#FFFFFF',
                                        width: '100%',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            textTransform: 'uppercase',
                                            fontSize: '0.8rem',
                                            fontWeight: '500'
                                        }}
                                    >
                                        {status}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} marginY="1rem">
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography sx={{ fontSize: '0.9rem', fontWeight: 400, mb: 1.75 }}>Host:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, mb: 1.75 }}>{hostname}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography sx={{ fontSize: '0.9rem', fontWeight: 400, mb: 1.75 }}>Caller ID:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, mb: 1.75 }}>{callerId}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

MonitoringCard.propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.object
};

export default MonitoringCard;
