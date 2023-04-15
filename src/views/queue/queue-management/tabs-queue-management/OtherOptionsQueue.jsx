import { Checkbox, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    setTimbrar,
    setReiniciar,
    setUnirse,
    setDejar,
    setMusica,
    setAnunciarEspera,
    setAnunciarTiempo,
    setAnunciarPosicion,
    setPausado,
    setFormatoGrabacionMusica,
    setPosicion
} from 'store/queue';
import { gridSpacing } from 'store/constant';

const formatosGrabacion = ['wav', 'gsm', 'wav49'];
const anuncioTiemposEspera = ['Si', 'No', 'Una vez'];
const anunciarPosiciones = ['Yes', 'No', 'More', 'Limit'];

const AdvancedAnnex = () => {
    const {
        timbrar,
        reiniciar,
        unirse,
        dejar,
        musica,
        anunciarEspera,
        anunciarTiempo,
        anunciarPosicion,
        pausado,
        posicion,
        formatoGrabacionMusica
    } = useSelector((state) => state.otherOptionsQueue);
    const dispatch = useDispatch();

    const handleChangeTimbrar = (event) => dispatch(setTimbrar(event.target.checked));
    const handleChangeReiniciar = (event) => dispatch(setReiniciar(event.target.checked));
    const handleChangeUnirse = (event) => dispatch(setUnirse(event.target.checked));
    const handleChangeDejar = (event) => dispatch(setDejar(event.target.checked));

    const handleChangeMusica = (event) => {
        dispatch(setMusica(event.target.checked));
        dispatch(setFormatoGrabacionMusica(''));
    };

    const handleChangeAnunciarEspera = (event) => dispatch(setAnunciarEspera(event.target.checked));
    const handleChangeAnunciarTiempo = (event) => dispatch(setAnunciarTiempo(event.target.value));
    const handleChangeAnunciarPosicion = (event) => {
        dispatch(setAnunciarPosicion(event.target.checked));
        dispatch(setPosicion(''));
    };
    const handleChangePausado = (event) => dispatch(setPausado(event.target.checked));
    const handleChangePosicion = (event) => dispatch(setPosicion(event.target.value));
    const handleChangeFormatoGrabacion = (event) => dispatch(setFormatoGrabacionMusica(event.target.value));

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container direction="row" spacing={gridSpacing}>
                    <Grid item xs={12} sm={6}>
                        <Grid container direction="column" spacing={gridSpacing}>
                            <Grid item>
                                <FormControlLabel
                                    control={<Checkbox checked={timbrar} onChange={handleChangeTimbrar} />}
                                    label="Timbrar agente en uso"
                                    name="timbrar"
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={<Checkbox checked={unirse} onChange={handleChangeUnirse} />}
                                    label="Unirse a colas vacías"
                                    name="unirse"
                                />
                            </Grid>
                            {unirse && (
                                <Grid item>
                                    <FormControlLabel
                                        control={<Checkbox checked={pausado} onChange={handleChangePausado} />}
                                        label="Pausado"
                                        name="pausado"
                                    />
                                </Grid>
                            )}
                            <Grid item>
                                <Grid container alignItems="center" direction="row">
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={<Checkbox checked={musica} onChange={handleChangeMusica} />}
                                            label="Música en espera"
                                            name="musica"
                                        />
                                    </Grid>
                                    {musica && (
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="filled"
                                                select
                                                fullWidth
                                                name="formatoGrabacionMusica"
                                                label="Formato de Grabación"
                                                value={formatoGrabacionMusica}
                                                onChange={handleChangeFormatoGrabacion}
                                            >
                                                {formatosGrabacion.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <FormLabel>Anuncio de Tiempo de Espera</FormLabel>
                                    <RadioGroup row name="anunciarTiempo" value={anunciarTiempo} onChange={handleChangeAnunciarTiempo}>
                                        {anuncioTiemposEspera.map((option) => (
                                            <FormControlLabel key={option} value={option} control={<Radio />} label={option}>
                                                {option}
                                            </FormControlLabel>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container direction="column" spacing={gridSpacing}>
                            <Grid item xs={3}>
                                <FormControlLabel
                                    control={<Checkbox checked={reiniciar} onChange={handleChangeReiniciar} />}
                                    label="Reiniciar Tiempo Muerto"
                                    name="reiniciar"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControlLabel
                                    control={<Checkbox checked={dejar} onChange={handleChangeDejar} />}
                                    label="Dejar Colas Vacías"
                                    name="dejar"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControlLabel
                                    control={<Checkbox checked={anunciarEspera} onChange={handleChangeAnunciarEspera} />}
                                    label="Anunciar espera del cliente al agente"
                                    name="anunciarEspera"
                                />
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center" direction="row">
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={<Checkbox checked={anunciarPosicion} onChange={handleChangeAnunciarPosicion} />}
                                            label="Anunciar posición en cola"
                                            name="anunciarPosicion"
                                        />
                                    </Grid>
                                    {anunciarPosicion && (
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="filled"
                                                select
                                                fullWidth
                                                label="Posición"
                                                name="posicion"
                                                value={posicion}
                                                onChange={handleChangePosicion}
                                            >
                                                {anunciarPosiciones.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AdvancedAnnex;
