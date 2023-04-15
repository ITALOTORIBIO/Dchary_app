import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

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
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs" centered>
                <LinkTab label="Llamada General" sx={{ textTransform: 'uppercase' }} href="corporate/general" />
                <LinkTab label="Llamada Usuario" sx={{ textTransform: 'uppercase' }} href="corporate/user" />
                <LinkTab label="Llamada Ranking" sx={{ textTransform: 'uppercase' }} href="corporate/ranking" />
                <LinkTab label="Llamada Area" sx={{ textTransform: 'uppercase' }} href="corporate/area" />
                <LinkTab label="Llamada C. Costo" sx={{ textTransform: 'uppercase' }} href="corporate/cost-center" />
                <LinkTab label="Llamada Destino" sx={{ textTransform: 'uppercase' }} href="corporate/destiny" />
            </Tabs>
        </Box>
    );
};

export default TabsIndex;
