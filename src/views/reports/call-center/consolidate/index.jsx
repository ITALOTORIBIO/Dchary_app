import { useState } from 'react';

import { Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ListInformationCallCenterConsolidate from './list-information-call-center-consolidate/ListInformationCallCenterConsolidate';

const CallConsolidate = () => {
    const [originDate, setOriginDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [showInformation, setShowInformation] = useState(false);

    const handleChangeInitDate = (newInitDate) => setOriginDate(newInitDate);
    const handleChangeEndDate = (newEndDate) => setEndDate(newEndDate);
    const handleChangeFromTime = (event) => dispatch(setFromTime(event.target.value));
    const handleChangeToTime = (event) => dispatch(setToTime(event.target.value));

    const handleClickSearchCallConsolidate = () => {
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
                                    <Typography variant="h4">Reporte: Llamada Consolidada Agente</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing} alignItems="center">
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
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            name="fromTime"
                                            value={fromTime}
                                            label="Desde hora"
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
                                            label="Hasta hora"
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
                                    onClick={handleClickSearchCallConsolidate}
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
                            <ListInformationCallCenterConsolidate />
                        </MainCard>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default CallConsolidate;
