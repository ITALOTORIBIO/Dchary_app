import { Checkbox, Divider, FormControlLabel, FormGroup, Grid, MenuItem, Tab, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import {
    setNombre,
    setNumero,
    setPassAdmin,
    setPassUsu,
    setCantPart,
    setMusicBienv,
    setMusicEspera,
    setCantidad
} from 'store/conferencias';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';
import { Box } from '@mui/system';

const TabsConference = () => {
    const { nombre, numero, passAdmin, passUsu, cantPart, musicBienv, musicEspera, cantidad } = useSelector((state) => state.conferencias);
    const dispatch = useDispatch();

    const cantPartArray = ['Máximo', 'Personalizado'];

    const [originDate, setOriginDate] = useState(null);
    const [hour, setHour] = useState(null);
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeName = (event) => dispatch(setNombre(event.target.value));
    const handleChangeNumber = (event) => dispatch(setNumero(event.target.value));
    const handleChangePassAdmin = (event) => dispatch(setPassAdmin(event.target.value));
    const handleChangePassUsu = (event) => dispatch(setPassUsu(event.target.value));
    const handleChangeInitDate = (newInitDate) => setOriginDate(newInitDate);
    const handleChangeHora = (newInitHour) => setHour(newInitHour);
    const handleChangeCantPart = (event) => dispatch(setCantPart(event.target.value));
    const handleChangeMusicBienv = (event) => dispatch(setMusicBienv(event.target.value));
    const handleChangeMusicEspera = (event) => dispatch(setMusicEspera(event.target.value));
    const handleChangeInputCant = (event) => dispatch(setCantidad(event.target.value));

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} direction="row">
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    required
                                    label="Nombre"
                                    name="name"
                                    value={nombre}
                                    onChange={handleChangeName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="filled"
                                    required
                                    label="Numero"
                                    name="number"
                                    value={numero}
                                    fullWidth
                                    onChange={handleChangeNumber}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    required
                                    label="Contraseña de Administrador"
                                    name="passAdmin"
                                    value={passAdmin}
                                    onChange={handleChangePassAdmin}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="filled"
                                    required
                                    label="Contraseña de Usuario"
                                    name="passUsu"
                                    value={passUsu}
                                    fullWidth
                                    onChange={handleChangePassUsu}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Fecha de reunion"
                                        inputFormat="dd-MM-yyyy"
                                        value={originDate}
                                        onChange={handleChangeInitDate}
                                        renderInput={(params) => <TextField fullWidth variant="filled" {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        label="Desde Hora"
                                        value={hour}
                                        onChange={handleChangeHora}
                                        renderInput={(params) => <TextField fullWidth variant="filled" {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Typography fontWeight="bold">Opciones de Conferencia</Typography>
                                <Divider sx={{ marginTop: '0.75rem' }} />
                            </Grid>
                            <Grid item xs={12} marginTop="-0.75rem">
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={gridSpacing} direction="row">
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    variant="filled"
                                                    select
                                                    fullWidth
                                                    required
                                                    label="Cantidad Max. Participantes"
                                                    name="cantPart"
                                                    value={cantPart}
                                                    onChange={handleChangeCantPart}
                                                >
                                                    {cantPartArray.map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            {cantPart === 'Personalizado' && (
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        variant="filled"
                                                        fullWidth
                                                        required
                                                        label="N° participantes"
                                                        name="cantidad"
                                                        value={cantidad}
                                                        onChange={handleChangeInputCant}
                                                    />
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={gridSpacing} direction="row">
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    variant="filled"
                                                    select
                                                    fullWidth
                                                    required
                                                    label="Tipo de Música de Bienvenida"
                                                    name="musicBienv"
                                                    value={musicBienv}
                                                    onChange={handleChangeMusicBienv}
                                                >
                                                    <MenuItem value={musicBienv}>{musicBienv}</MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    variant="filled"
                                                    select
                                                    fullWidth
                                                    required
                                                    label="Tipo de Música en espera"
                                                    name="musicEspera"
                                                    value={musicEspera}
                                                    onChange={handleChangeMusicEspera}
                                                >
                                                    <MenuItem value={musicEspera}>{musicEspera}</MenuItem>
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ width: '100%', typography: 'body1' }}>
                                    <TabContext value={value}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <TabList variant="fullWidth" onChange={handleChange}>
                                                <Tab label="Administrador" value="1" />
                                                <Tab label="Usuario" value="2" />
                                            </TabList>
                                        </Box>
                                        <TabPanel value="1">
                                            <Grid item xs={12} sm={12}>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox />} label="Anunciar la cantidad de usuarios" />
                                                    <FormControlLabel control={<Checkbox />} label="Música en espera" />
                                                    <FormControlLabel
                                                        control={<Checkbox />}
                                                        label="Permitir al usuario salir de la conferencia"
                                                    />
                                                    <FormControlLabel control={<Checkbox />} label="Escuchar menú" />
                                                    <FormControlLabel control={<Checkbox />} label="Grabar conferencia" />
                                                </FormGroup>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value="2">
                                            <Grid item xs={12} sm={12}>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox />} label="Modo Silencio" />
                                                    <FormControlLabel control={<Checkbox />} label="Anunciar la cantidad de usuarios" />
                                                    <FormControlLabel control={<Checkbox />} label="Música en espera" />
                                                    <FormControlLabel control={<Checkbox />} label="Escuchar menú" />
                                                    <FormControlLabel control={<Checkbox />} label="Grabar conferencia" />
                                                    <FormControlLabel control={<Checkbox />} label="Solo escuchar administrador" />
                                                    <FormControlLabel control={<Checkbox />} label="Esperar administrador" />
                                                </FormGroup>
                                            </Grid>
                                        </TabPanel>
                                    </TabContext>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TabsConference;
