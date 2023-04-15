import { useState } from 'react';

import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ListInformationCallArea from './list-information-call-area/ListInformationCallArea';

const areas = ['Todas', 'General'];
const ordering = ['Nombre de Area', 'Cantidad de Llamadas', 'Duracion'];

const CallArea = () => {
    const [order, setOrder] = useState('');
    const [area, setArea] = useState('');
    const [originDate, setOriginDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showInformation, setShowInformation] = useState(false);
    const [originHour, setOriginHour] = useState(null);
    const [endHour, setEndHour] = useState(null);

    const handleChangeOrder = (event) => setOrder(event.target.value);
    const handleChangeArea = (event) => setArea(event.target.value);
    const handleChangeInitHour = (newInitHour) => setOriginHour(newInitHour);
    const handleChangeEndHour = (newEndHour) => setEndHour(newEndHour);
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
                                    <Typography variant="h4">Lista de Llamadas por Area</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing} alignItems="center">
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            label="Area"
                                            select
                                            name="area"
                                            value={area}
                                            variant="standard"
                                            onChange={handleChangeArea}
                                        >
                                            {areas.map((option, index) => (
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
                                            value={order}
                                            variant="standard"
                                            onChange={handleChangeOrder}
                                        >
                                            {ordering.map((option, index) => (
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
                                    <Grid item xs={12} md={3}>
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
                                    <Grid item xs={12} md={3}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <TimePicker
                                                label="Desde Hora"
                                                value={originHour}
                                                onChange={handleChangeInitHour}
                                                renderInput={(params) => <TextField fullWidth variant="standard" {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
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
                                    <Grid item xs={12} md={3}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <TimePicker
                                                label="Hasta Hora"
                                                value={endHour}
                                                onChange={handleChangeEndHour}
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
                            <ListInformationCallArea />
                        </MainCard>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default CallArea;
