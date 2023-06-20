import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import SIPCard from './cards/SIPCard';
import PSJICard from './cards/PSJICard';
import IAX2Card from './cards/IAX2Card';
import ActiveCallsCard from './cards/ActiveCallsCard';
import SystemResourcesCard from './system-resources/SystemResourcesCard';
import ProcessesStatusCard from './processes-status/ProcessesStatusCard';
import HardDrives from './hard-drives/HardDrives';

// styles mui
import { gridSpacing } from 'store/constant';

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <PSJICard isLoading={isLoading} />
                    </Grid>
                    {/* <Grid item lg={3} md={6} sm={6} xs={12}>
                        <SIPCard isLoading={isLoading} />
                    </Grid> */}
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <IAX2Card isLoading={isLoading} />
                    </Grid>
                    {/* <Grid item lg={3} md={6} sm={6} xs={12}>
                        <ActiveCallsCard isLoading={isLoading} />
                    </Grid> */}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <ActiveCallsCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <SIPCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
