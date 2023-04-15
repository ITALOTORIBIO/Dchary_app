import { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { setName } from 'store/queue';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigurationQueue, OtherOptionsQueue } from '.';

const TabsQueue = () => {
    const [value, setValue] = useState('1');
    const { name } = useSelector((state) => state.tabsQueue);
    const dispatch = useDispatch();

    const handleChangeName = (event) => dispatch(setName(event.target.value));
    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container direction="row" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    label="Nombre"
                                    name="nombre"
                                    value={name}
                                    onChange={handleChangeName}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} marginTop="1rem">
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList variant="fullWidth" onChange={handleChange}>
                                    <Tab label="Configuración" sx={{ textTransform: 'uppercase' }} value="1" />
                                    <Tab label="Otras Opciones" sx={{ textTransform: 'uppercase' }} value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <ConfigurationQueue />
                            </TabPanel>
                            <TabPanel value="2">
                                <OtherOptionsQueue />
                            </TabPanel>
                        </TabContext>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TabsQueue;
