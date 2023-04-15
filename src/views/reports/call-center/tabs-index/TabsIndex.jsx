import { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ReportAbandonment from '../report-abandonment';
import CustomerCare from '../customer-care';
import CallAnsweredAndAbandonment from '../answered-and-abandonment';
import CallAnswered from '../answered';
import CallListDate from '../date';
import CallConsolidate from '../consolidate';
import CallAgent from '../agent';

const LinkTab = (props) => {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
};

const TabsIndex = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList variant="fullWidth" onChange={handleChange}>
                        <Tab label="Reporte Abandonos" sx={{ textTransform: 'uppercase' }} value="abandoned-report" />
                        <Tab label="Atención Cliente" sx={{ textTransform: 'uppercase' }} value="customer-care" />
                        <Tab label="Llamada At. y Ab." sx={{ textTransform: 'uppercase' }} value="answered-and-abandonment" />
                        <Tab label="Llamadas Contest." sx={{ textTransform: 'uppercase' }} value="answered" />
                        <Tab label="Llamadas At. Ab. F." sx={{ textTransform: 'uppercase' }} value="date" />
                        <Tab label="Llamada Consolidada" sx={{ textTransform: 'uppercase' }} value="consolidate" />
                        <Tab label="Llamadas Agente" sx={{ textTransform: 'uppercase' }} value="agent" />
                    </TabList>
                </Box>
                <TabPanel value="abandoned-report">
                    <ReportAbandonment />
                </TabPanel>
                <TabPanel value="customer-care">
                    <CustomerCare />
                </TabPanel>
                <TabPanel value="answered-and-abandonment">
                    <CallAnsweredAndAbandonment />
                </TabPanel>
                <TabPanel value="answered">
                    <CallAnswered />
                </TabPanel>
                <TabPanel value="date">
                    <CallListDate />
                </TabPanel>
                <TabPanel value="consolidate">
                    <CallConsolidate />
                </TabPanel>
                <TabPanel value="agent">
                    <CallAgent />
                </TabPanel>
            </TabContext>
        </div>
    );
};

export default TabsIndex;
