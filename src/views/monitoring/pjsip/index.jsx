import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// styles mui
import { gridSpacing } from 'store/constant';

const MonitoringPJSIP = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <MainCard />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MonitoringPJSIP;
