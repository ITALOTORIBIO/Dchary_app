import { useState } from 'react';

import { Button, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ListInformationCallCenterAgent from './list-information-call-center-agent/ListInformationCallCenterAgent';

const queues = ['Todos', 'atencion-al-cliente', 'detecta'];
const agents = [];

const CallAgent = () => {
    const [queue, setQueue] = useState('');
    const [agent, setAgent] = useState('');
    const [originDate, setOriginDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [showInformation, setShowInformation] = useState(false);

    const handleChangeQueue = (event) => setQueue(event.target.value);
    const handleChangeAgent = (event) => setAgent(event.target.value);
    const handleChangeInitDate = (newInitDate) => setOriginDate(newInitDate);
    const handleChangeEndDate = (newEndDate) => setEndDate(newEndDate);
    const handleChangeFromTime = (event) => dispatch(setFromTime(event.target.value));
    const handleChangeToTime = (event) => dispatch(setToTime(event.target.value));

    const handleClickSearchCallAgent = () => {
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
                                    <Typography variant="h4">Reporte de Llamadas Agente</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing} alignItems="center">
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            select
                                            label="Seleccione una cola"
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
                                            label="Seleccione un agente"
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
                                                label="Fecha Inicio"
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
                                                label="Fecha Fin"
                                                inputFormat="dd-MM-yyyy"
                                                value={endDate}
                                                onChange={handleChangeEndDate}
                                                renderInput={(params) => <TextField fullWidth variant="standard" {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            name="fromTime"
                                            value={fromTime}
                                            label="Hora Inicio"
                                            variant="standard"
                                            type="search"
                                            onChange={handleChangeFromTime}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccessTimeIcon />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            name="toTime"
                                            value={toTime}
                                            label="Hora Fin"
                                            variant="standard"
                                            type="search"
                                            onChange={handleChangeToTime}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccessTimeIcon />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
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
                                    onClick={handleClickSearchCallAgent}
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
                            <ListInformationCallCenterAgent />
                        </MainCard>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default CallAgent;
