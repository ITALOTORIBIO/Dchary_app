import React from 'react';
// import { Button, Grid, TextField, Typography, Box } from '@mui/material';

// import MainCard from 'ui-component/cards/MainCard';
// import { gridSpacing } from 'store/constant';
import { Outlet } from 'react-router';
import TabsIndex from './tabs-index/TabsIndex';

const ReportCorporate = () => {
    return (
        <>
            <TabsIndex />
            <Outlet />
        </>
    );
};

export default ReportCorporate;
