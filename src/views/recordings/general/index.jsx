import { useState } from 'react';

import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from 'date-fns/locale/es';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ListInformationRecordingsGeneral from './list-information-recordings-general/ListInformationRecordingsGeneral';

const agents = ['Activo', 'Inactivo'];
const type = ['Entrante', 'Saliente', 'Todos'];

const RecordingsGeneral = () => {
    const [agent, setAgent] = useState('');
    const [typeAgent, setTypeAgent] = useState('');
    const [origin, setOrigin] = useState('');
    const [destiny, setDestiny] = useState('');
    const [originDate, setOriginDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showInformation, setShowInformation] = useState(false);

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
                                    <Typography variant="h4">Lista de Grabación General de Llamadas</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing} alignItems="center">
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
                                        <TextField
                                            fullWidth
                                            label="Tipo"
                                            select
                                            name="type"
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
                                            label="Origen"
                                            name="origin"
                                            value={origin}
                                            type="search"
                                            variant="standard"
                                            onChange={handleChangeOrigin}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing} alignItems="center">
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
                                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
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
                                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                                            <DatePicker
                                                label="Hasta Fecha"
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
                            <ListInformationRecordingsGeneral />
                        </MainCard>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default RecordingsGeneral;
