import PropTypes from 'prop-types';
import { Box, Divider, Grid, Typography, useTheme } from '@mui/material';

// react circular progress
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// palette
import customPalette from 'themes/styles/customPalette';

import { easeQuadInOut } from 'd3-ease';
import AnimatedProgressProvider from 'ui-component/animation/circular-progress-bar/AnimatedProgressProvider';
import Typical from 'react-typical';

const ServerInformation = ({ dataServer }) => {
    const theme = useTheme();

    return (
        <Grid container paddingX={{ md: '1rem', lg: '3rem', xl: '5rem' }}>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Grid container display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                            <Grid item>
                                <Typography sx={{ color: customPalette.darkLightSoft, fontWeight: 'bold' }}>CPU</Typography>
                            </Grid>
                            <Grid item marginTop="1rem">
                                {!dataServer.cpuPromedio ? (
                                    <AnimatedProgressProvider
                                        valueStart={0}
                                        valueEnd={55}
                                        duration={1.5}
                                        easingFunction={easeQuadInOut}
                                        repeat
                                    >
                                        {(value) => {
                                            const roundedValue = Math.round(value);
                                            return (
                                                <CircularProgressbarWithChildren
                                                    value={value}
                                                    styles={buildStyles({
                                                        pathColor: theme.palette.primary.dark,
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
                                                                fontSize: '0.75rem'
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
                                        value={dataServer.cpuPromedio}
                                        styles={buildStyles({
                                            pathColor: theme.palette.primary.dark
                                        })}
                                    >
                                        <Box display="flex" flexDirection="column" alignItems="center">
                                            <Typography color="primary" fontSize="1.1rem" fontWeight="bold">
                                                {dataServer.cpuPromedio}%
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: customPalette.darkLightSoft,
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                used space
                                            </Typography>
                                        </Box>
                                    </CircularProgressbarWithChildren>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Grid container display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                            <Grid item>
                                <Typography sx={{ color: customPalette.darkLightSoft, fontWeight: 'bold' }}>RAM</Typography>
                            </Grid>
                            <Grid item marginTop="1rem">
                                {!dataServer.memoriaRamPromedio ? (
                                    <AnimatedProgressProvider
                                        valueStart={0}
                                        valueEnd={75}
                                        duration={1.5}
                                        easingFunction={easeQuadInOut}
                                        repeat
                                    >
                                        {(value) => {
                                            const roundedValue = Math.round(value);
                                            return (
                                                <CircularProgressbarWithChildren
                                                    value={value}
                                                    styles={buildStyles({
                                                        pathColor: customPalette.orangeLight,
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
                                                                fontSize: '0.75rem'
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
                                        value={dataServer.memoriaRamPromedio}
                                        styles={buildStyles({
                                            pathColor: customPalette.orangeLight
                                        })}
                                    >
                                        <Box display="flex" flexDirection="column" alignItems="center">
                                            <Typography color="primary" fontSize="1.1rem" fontWeight="bold">
                                                {dataServer.memoriaRamPromedio}%
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: customPalette.darkLightSoft,
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                used space
                                            </Typography>
                                        </Box>
                                    </CircularProgressbarWithChildren>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Grid container display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                            <Grid item>
                                <Typography sx={{ color: customPalette.darkLightSoft, fontWeight: 'bold' }}>SWAP</Typography>
                            </Grid>
                            <Grid item marginTop="1rem">
                                {!dataServer.memoriaSwapPromedio ? (
                                    <AnimatedProgressProvider
                                        valueStart={0}
                                        valueEnd={45}
                                        duration={1.5}
                                        easingFunction={easeQuadInOut}
                                        repeat
                                    >
                                        {(value) => {
                                            const roundedValue = Math.round(value);
                                            return (
                                                <CircularProgressbarWithChildren
                                                    value={value}
                                                    styles={buildStyles({
                                                        pathColor: customPalette.greenLight,
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
                                                                fontSize: '0.75rem'
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
                                        value={dataServer.memoriaSwapPromedio}
                                        styles={buildStyles({
                                            pathColor: customPalette.greenLight
                                        })}
                                    >
                                        <Box display="flex" flexDirection="column" alignItems="center">
                                            <Typography color="primary" fontSize="1.1rem" fontWeight="bold">
                                                {dataServer.memoriaSwapPromedio}%
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: customPalette.darkLightSoft,
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                used space
                                            </Typography>
                                        </Box>
                                    </CircularProgressbarWithChildren>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} marginTop="1rem">
                <Divider sx={{ my: 1.5 }} />
            </Grid>
            <Grid item xs={12} marginBottom="1rem">
                <Grid container marginTop="1rem" display="flex">
                    <Grid item xs={12} paddingY="0.25rem">
                        <Grid container>
                            <Grid item>
                                <Typography
                                    sx={{
                                        color: customPalette.darkSoft,
                                        fontWeight: 'bold',
                                        fontSize: '0.92rem'
                                    }}
                                >
                                    CPU Info:
                                </Typography>
                            </Grid>
                            <Box flexGrow={1}></Box>
                            <Grid item>
                                <Typography
                                    sx={{
                                        color: customPalette.darkLightSoft,
                                        fontSize: '0.92rem'
                                    }}
                                >
                                    {!dataServer.cpuInfo ? (
                                        <Typical loop={Infinity} wrapper="b" steps={['Cargando...', 750]} />
                                    ) : (
                                        dataServer.cpuInfo
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} paddingY="0.25rem">
                        <Grid container>
                            <Grid item>
                                <Typography
                                    sx={{
                                        color: customPalette.darkSoft,
                                        fontWeight: 'bold',
                                        fontSize: '0.92rem'
                                    }}
                                >
                                    Uptime:
                                </Typography>
                            </Grid>
                            <Box flexGrow={1}></Box>
                            <Grid item>
                                <Typography
                                    sx={{
                                        color: customPalette.darkLightSoft,
                                        fontSize: '0.92rem'
                                    }}
                                >
                                    {!dataServer.uptime ? (
                                        <Typical loop={Infinity} wrapper="b" steps={['Cargando...', 750]} />
                                    ) : (
                                        dataServer.uptime
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} paddingY="0.25rem">
                        <Grid container>
                            <Grid item>
                                <Typography
                                    sx={{
                                        color: customPalette.darkSoft,
                                        fontWeight: 'bold',
                                        fontSize: '0.92rem'
                                    }}
                                >
                                    CPU Speed:
                                </Typography>
                            </Grid>
                            <Box flexGrow={1}></Box>
                            <Grid item>
                                <Typography
                                    sx={{
                                        color: customPalette.darkLightSoft,
                                        fontSize: '0.92rem'
                                    }}
                                >
                                    {!dataServer.cpuSpeed ? (
                                        <Typical loop={Infinity} wrapper="b" steps={['Cargando...', 750]} />
                                    ) : (
                                        `${dataServer.cpuSpeed} MHz`
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} paddingY="0.25rem">
                        <Grid container>
                            <Grid item>
                                <Typography
                                    sx={{
                                        color: customPalette.darkSoft,
                                        fontWeight: 'bold',
                                        fontSize: '0.92rem'
                                    }}
                                >
                                    Memory Usage:
                                </Typography>
                            </Grid>
                            <Box flexGrow={1}></Box>
                            <Grid item>
                                <Typography
                                    sx={{
                                        color: customPalette.darkLightSoft,
                                        fontSize: '0.92rem'
                                    }}
                                >
                                    {!dataServer.ramUsage && !dataServer.swapUsage ? (
                                        <Typical loop={Infinity} wrapper="b" steps={['Cargando...', 750]} />
                                    ) : (
                                        `RAM ${dataServer.ramUsage} Mb SWAP: ${!dataServer.swapUsage ? '00' : dataServer.swapUsage} Mb`
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

ServerInformation.propTypes = {
    dataServer: PropTypes.object
};

export default ServerInformation;
