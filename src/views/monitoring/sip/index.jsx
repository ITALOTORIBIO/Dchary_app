import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { MonitoringCard } from './cards';

// styles mui
import { gridSpacing } from 'store/constant';

const dataMonitoring = [
    { title: 1000, status: 'ACTIVO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1020, status: 'INACTIVO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1010, status: 'DESCONOCIDO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1011, status: 'ACTIVO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1100, status: 'ACTIVO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'INACTIVO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'INACTIVO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'DESCONOCIDO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'ACTIVO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'ACTIVO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'DESCONOCIDO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'DESCONOCIDO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'ACTIVO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'ACTIVO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'ACTIVO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'INACTIVO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'DESCONOCIDO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'DESCONOCIDO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'INACTIVO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'ACTIVO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'INACTIVO', hostname: '192.168.4.100', callerId: 'Administración' },
    { title: 1000, status: 'ACTIVO', hostname: '192.168.4.100', callerId: 'Administración' }
];

const MonitoringSIP = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    {dataMonitoring.map((data, index) => (
                        <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
                            <MonitoringCard isLoading={isLoading} data={data} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MonitoringSIP;
