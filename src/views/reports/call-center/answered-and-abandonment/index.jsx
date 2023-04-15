import { useState } from 'react';

import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ListInformationCallCenterAnsweredAndAbandonment from './list-information-call-center-answered-and-abandonment/ListInformationCallCenterAnsweredAndAbandonment';

const queues = ['atencion-al-cliente', 'detecta'];
const agents = ['Seleccione agente'];

const CallAnsweredAndAbandonment = () => {
    const [queue, setQueue] = useState('');
    const [agent, setAgent] = useState('');
    const [originDate, setOriginDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showInformation, setShowInformation] = useState(false);

    const handleChangeQueue = (event) => setQueue(event.target.value);
    const handleChangeAgent = (event) => setAgent(event.target.value);
    const handleChangeInitDate = (newInitDate) => setOriginDate(newInitDate);
    const handleChangeEndDate = (newEndDate) => setEndDate(newEndDate);

    const handleClickSearchCallAnsweredAndAbandonment = () => {
        setShowInformation(!showInformation);
    };

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item width="100%">
                    <MainCard>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Typography variant="h4">Reporte: Llamadas Atendidas y Abandonadas</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing} alignItems="center">
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            select
                                            label="Cola"
                                            name="queue"
                                            value={queue}
                                            variant="standard"
                                            onChange={handleChangeQueue}
                                        >
                                            {queues.map((option, index) => (
                                                <MenuItem key={index} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            select
                                            label="Agente"
                                            name="agent"
                                            value={agent}
                                            variant="standard"
                                            onChange={handleChangeAgent}
                                        >
                                            {agents.map((option, index) => (
                                                <MenuItem key={index} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Desde fecha"
                                                inputFormat="dd-MM-yyyy"
                                                value={originDate}
                                                onChange={handleChangeInitDate}
                                                renderInput={(params) => <TextField fullWidth variant="standard" {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Hasta fecha"
                                                inputFormat="dd-MM-yyyy"
                                                value={endDate}
                                                onChange={handleChangeEndDate}
                                                renderInput={(params) => <TextField fullWidth variant="standard" {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Button
                                    sx={{
                                        textTransform: 'uppercase',
                                        paddingX: '1.25rem',
                                        paddingY: '0.5rem'
                                    }}
                                    variant="contained"
                                    endIcon={<Search />}
                                    onClick={handleClickSearchCallAnsweredAndAbandonment}
                                >
                                    Buscar
                                </Button>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
                {showInformation && (
                    <Grid item width="100%">
                        <MainCard>
                            <ListInformationCallCenterAnsweredAndAbandonment />
                        </MainCard>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default CallAnsweredAndAbandonment;
