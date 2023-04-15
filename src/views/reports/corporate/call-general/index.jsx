import { useState } from 'react';

import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ListInformationCallGeneral from './list-information-call-general/ListInformationCallGeneral';

const agents = ['Activo', 'Inactivo'];
const type = ['Entrante', 'Saliente', 'Todos'];

const CallGeneral = () => {
    const [agent, setAgent] = useState('');
    const [typeAgent, setTypeAgent] = useState('');
    const [origin, setOrigin] = useState('');
    const [destiny, setDestiny] = useState('');
    const [originDate, setOriginDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showInformation, setShowInformation] = useState(false);
    const [hour, setHour] = useState(null);

    const handleChangeHora = (newInitHour) => setHour(newInitHour);
    const handleChangeAgent = (event) => setAgent(event.target.value);
    const handleChangeTypeAgent = (event) => setTypeAgent(event.target.value);
    const handleChangeOrigin = (event) => setOrigin(event.target.value);
    const handleChangeDestiny = (event) => setDestiny(event.target.value);
    const handleChangeInitDate = (newInitDate) => setOriginDate(newInitDate);
    const handleChangeEndDate = (newEndDate) => setEndDate(newEndDate);

    const handleClickSearchRecordingsGeneral = () => {
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
                                    <Typography variant="h4">Lista de Llamadas General</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing} alignItems="center">
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            label="Origen"
                                            name="origin"
                                            value={origin}
                                            type="search"
                                            variant="standard"
                                            onChange={handleChangeOrigin}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            label="Destino"
                                            name="destiny"
                                            value={destiny}
                                            type="search"
                                            variant="standard"
                                            onChange={handleChangeDestiny}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            select
                                            label="Tipo Llamada"
                                            name="call-type"
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
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing} alignItems="center">
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            label="Estado"
                                            select
                                            name="state-call"
                                            value={typeAgent}
                                            variant="standard"
                                            onChange={handleChangeTypeAgent}
                                        >
                                            {type.map((option, index) => (
                                                <MenuItem key={index} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            label="Ordenar por"
                                            select
                                            name="sort-by"
                                            value={typeAgent}
                                            variant="standard"
                                            onChange={handleChangeTypeAgent}
                                        >
                                            {type.map((option, index) => (
                                                <MenuItem key={index} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing} alignItems="center">
                                    <Grid item xs={12} md={4}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Desde Fecha"
                                                inputFormat="dd-MM-yyyy"
                                                value={originDate}
                                                onChange={handleChangeInitDate}
                                                renderInput={(params) => <TextField fullWidth variant="standard" {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <TimePicker
                                                label="Desde Hora"
                                                value={hour}
                                                onChange={handleChangeHora}
                                                renderInput={(params) => <TextField fullWidth variant="standard" {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            label="Desde duración (min)"
                                            name="init-duration"
                                            value={destiny}
                                            type="number"
                                            variant="standard"
                                            onChange={handleChangeDestiny}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing} alignItems="center">
                                    <Grid item xs={12} md={4}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Hasta Fecha"
                                                inputFormat="dd-MM-yyyy"
                                                value={endDate}
                                                onChange={handleChangeEndDate}
                                                renderInput={(params) => <TextField fullWidth variant="standard" {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <TimePicker
                                                label="Hasta Hora"
                                                value={hour}
                                                onChange={handleChangeHora}
                                                renderInput={(params) => <TextField fullWidth variant="standard" {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            label="Hasta duración (min)"
                                            name="end-duration"
                                            value={destiny}
                                            type="number"
                                            variant="standard"
                                            onChange={handleChangeDestiny}
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
                                    onClick={handleClickSearchRecordingsGeneral}
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
                            <ListInformationCallGeneral />
                        </MainCard>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default CallGeneral;
