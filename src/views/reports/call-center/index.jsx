import React from 'react';

import { Outlet } from 'react-router';
import TabsIndex from './tabs-index/TabsIndex';

const ReportCallCenter = () => {
    return (
        <>
            <TabsIndex />
            <Outlet />
        </>
    );
};

export default ReportCallCenter;
