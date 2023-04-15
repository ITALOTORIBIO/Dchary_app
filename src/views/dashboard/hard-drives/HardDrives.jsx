import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Box, CardContent, Grid, Typography, useTheme } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

// react circular progress
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// react icons
import { Icon } from '@iconify/react';

// palette
import customPalette from 'themes/styles/customPalette';
import { callToHardDrives } from 'services/apis';
import AnimatedProgressProvider from 'ui-component/animation/circular-progress-bar/AnimatedProgressProvider';
import { easeQuadInOut } from 'd3-ease';
import Typical from 'react-typical';

const HardDrives = ({ isLoading }) => {
    const theme = useTheme();
    const [dataHardDrives, setDataHardDrives] = useState({});

    useEffect(() => {
        const getDataHardDrives = async () => {
            const result = await callToHardDrives();
            if (result.ok) setDataHardDrives(result.data);
            else setDataHardDrives(result.data);
        };
        getDataHardDrives();
    });

    return (
        <MainCard content={false} sx={{ marginTop: '1.2rem' }}>
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignContent="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h4">Hard Drives</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {!dataHardDrives ? (
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Typography fontWeight="bold">Not data found</Typography>
                            </Box>
                        ) : (
                            <Grid container direction="column">
                                <Grid item xs={12} paddingX="1rem">
                                    <Grid container direction="column" alignItems="center" justifyContent="center">
                                        <Grid item marginTop="1rem">
                                            {!dataHardDrives.diskPromedio ? (
                                                <AnimatedProgressProvider
                                                    valueStart={0}
                                                    valueEnd={75}
                                                    duration={1}
                                                    easingFunction={easeQuadInOut}
                                                    repeat
                                                >
                                                    {(value) => {
                                                        const roundedValue = Math.round(value);
                                                        return (
                                                            <CircularProgressbarWithChildren
                                                                value={value}
                                                                styles={buildStyles({
                                                                    pathColor: theme.palette.secondary.dark,
                                                                    pathTransition: 'none'
                                                                })}
                                                            >
                                                                <Box display="flex" flexDirection="column" alignItems="center">
                                                                    <Typography color="primary" fontSize="1.1rem" fontWeight="bold">
                                                                        {roundedValue}%
                                                                    </Typography>
                                                                    <Typography
                                                                        sx={{
                                                                            color: customPalette.darkLightSoft,
                                                                            fontSize: '0.9rem'
                                                                        }}
                                                                    >
                                                                        used space
                                                                    </Typography>
                                                                </Box>
                                                            </CircularProgressbarWithChildren>
                                                        );
                                                    }}
                                                </AnimatedProgressProvider>
                                            ) : (
                                                <CircularProgressbarWithChildren
                                                    value={dataHardDrives.diskPromedio}
                                                    styles={buildStyles({
                                                        pathColor: theme.palette.secondary.dark
                                                    })}
                                                >
                                                    <Box display="flex" flexDirection="column" alignItems="center">
                                                        <Typography color="primary" fontSize="1.1rem" fontWeight="bold">
                                                            {dataHardDrives.diskPromedio}%
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                color: customPalette.darkLightSoft,
                                                                fontSize: '0.9rem'
                                                            }}
                                                        >
                                                            used space
                                                        </Typography>
                                                    </Box>
                                                </CircularProgressbarWithChildren>
                                            )}
                                        </Grid>
                                        <Grid item display="flex" gap={1} marginTop="1rem">
                                            <Icon icon="akar-icons:circle-fill" color={theme.palette.secondary.dark} />
                                            <Typography
                                                sx={{
                                                    color: customPalette.darkSoft
                                                }}
                                            >
                                                {100 - dataHardDrives.diskPromedio}% Available
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {!dataHardDrives ? (
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Typography fontWeight="bold">Not data found</Typography>
                            </Box>
                        ) : (
                            <Grid
                                container
                                sx={{
                                    color: customPalette.darkSoft
                                }}
                                direction="column"
                                marginTop="2rem"
                            >
                                <Grid item xs={12}>
                                    <Grid container paddingY="0.25rem">
                                        <Typography fontWeight="bold">Hard Disk Capacity:</Typography>
                                        <Box flex={1} />
                                        <Typography
                                            sx={{
                                                color: customPalette.darkLightSoft
                                            }}
                                        >
                                            {!dataHardDrives.diskTotal ? (
                                                <Typical loop={Infinity} wrapper="b" steps={['Cargando...', 750]} />
                                            ) : (
                                                `${dataHardDrives.diskTotal} Gb`
                                            )}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container paddingY="0.25rem">
                                        <Typography fontWeight="bold">Mount Point:</Typography>
                                        <Box flex={1} />
                                        <Typography
                                            sx={{
                                                color: customPalette.darkLightSoft
                                            }}
                                        >
                                            {!dataHardDrives.diskMountPoint ? (
                                                <Typical loop={Infinity} wrapper="b" steps={['Cargando...', 750]} />
                                            ) : (
                                                dataHardDrives.diskMountPoint
                                            )}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container paddingY="0.25rem">
                                        <Typography fontWeight="bold">Manufacturer:</Typography>
                                        <Box flex={1} />
                                        <Typography sx={{ color: customPalette.darkLightSoft }}>N/A</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </MainCard>
    );
};

HardDrives.propTypes = {
    isLoading: PropTypes.bool
};

export default HardDrives;
