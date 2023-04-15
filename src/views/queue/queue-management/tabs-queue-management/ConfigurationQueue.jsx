import { Grid, MenuItem, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import {
    setEstrategia,
    setNivelServicio,
    setPeso,
    setMaxUsuariosCola,
    setFormatoGrabacion,
    setContexto,
    setTiempoEsperaConexionAgente,
    setTiempoTimbradoAgente,
    setTiempoDescansoEntreLlamada,
    setTiempoEsperaTimbrado,
    setFrecuenciaAnuncioCola
} from 'store/queue';

const estrategias = ['Fewest Calls', 'Leastrecen', 'Random', 'Ringall', 'RoundRobin', 'rrmemory'];
const formatosGrabacion = ['wav', 'gsm', 'wav49'];

const ConfigurationQueue = () => {
    const {
        estrategia,
        nivelServicio,
        peso,
        maxUsuariosCola,
        formatoGrabacion,
        contexto,
        tiempoEsperaConexionAgente,
        tiempoTimbradoAgente,
        tiempoDescansoEntreLlamada,
        tiempoEsperaTimbrado,
        frecuenciaAnuncioCola
    } = useSelector((state) => state.configurationQueue);
    const dispatch = useDispatch();

    const handleChangeEstrategia = (event) => dispatch(setEstrategia(event.target.value));
    const handleChangeNivelServicio = (event) => dispatch(setNivelServicio(event.target.value));
    const handleChangePeso = (event) => dispatch(setPeso(event.target.value));
    const handleChangeMaxUsuariosCola = (event) => dispatch(setMaxUsuariosCola(event.target.value));
    const handleChangeFormatoGrabacion = (event) => dispatch(setFormatoGrabacion(event.target.value));
    const handleChangeContexto = (event) => dispatch(setContexto(event.target.value));
    const handleChangeTiempoEsperaConexionAgente = (event) => dispatch(setTiempoEsperaConexionAgente(event.target.value));
    const handleChangeTiempoTimbradoAgente = (event) => dispatch(setTiempoTimbradoAgente(event.target.value));
    const handleChangeTiempoDescansoEntreLlamada = (event) => dispatch(setTiempoDescansoEntreLlamada(event.target.value));
    const handleChangeTiempoEsperaTimbrado = (event) => dispatch(setTiempoEsperaTimbrado(event.target.value));
    const handleChangeFrecuenciaAnuncioCola = (event) => dispatch(setFrecuenciaAnuncioCola(event.target.value));

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container direction="row" spacing={gridSpacing}>
                    <Grid item xs={12} sm={6}>
                        <Grid container direction="column" spacing={gridSpacing}>
                            <Grid item>
                                <TextField
                                    variant="filled"
                                    select
                                    fullWidth
                                    name="estrategia"
                                    label="Estrategia"
                                    value={estrategia}
                                    onChange={handleChangeEstrategia}
                                >
                                    {estrategias.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item>
                                <TextField
                                    variant="filled"
                                    required
                                    name="peso"
                                    value={peso}
                                    fullWidth
                                    label="Peso"
                                    onChange={handleChangePeso}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    variant="filled"
                                    select
                                    fullWidth
                                    name="formatoGrabacion"
                                    label="Formato de Grabación"
                                    value={formatoGrabacion}
                                    onChange={handleChangeFormatoGrabacion}
                                >
                                    {formatosGrabacion.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item>
                                <TextField
                                    variant="filled"
                                    required
                                    name="tiempoEsperaConexionAgente"
                                    value={tiempoEsperaConexionAgente}
                                    fullWidth
                                    label="T. espera conexión con agente"
                                    onChange={handleChangeTiempoEsperaConexionAgente}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    variant="filled"
                                    required
                                    name="tiempoDescansoEntreLlamada"
                                    value={tiempoDescansoEntreLlamada}
                                    fullWidth
                                    label="T. descanso entre llamada"
                                    onChange={handleChangeTiempoDescansoEntreLlamada}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    variant="filled"
                                    required
                                    name="frecuenciaAnuncioCola"
                                    value={frecuenciaAnuncioCola}
                                    fullWidth
                                    label="Frecuencia anuncio en cola"
                                    onChange={handleChangeFrecuenciaAnuncioCola}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container direction="column" spacing={gridSpacing}>
                            <Grid item>
                                <TextField
                                    variant="filled"
                                    required
                                    name="nivelServicio"
                                    value={nivelServicio}
                                    fullWidth
                                    label="Nivel del servicio"
                                    onChange={handleChangeNivelServicio}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    variant="filled"
                                    required
                                    name="maxUsuariosCola"
                                    value={maxUsuariosCola}
                                    fullWidth
                                    label="Máx. Usuarios en Cola"
                                    onChange={handleChangeMaxUsuariosCola}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    variant="filled"
                                    required
                                    name="contexto"
                                    value={contexto}
                                    fullWidth
                                    label="Contexto"
                                    onChange={handleChangeContexto}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    variant="filled"
                                    required
                                    name="tiempoTimbradoAgente"
                                    value={tiempoTimbradoAgente}
                                    fullWidth
                                    label="T. Timbrado de Agente"
                                    onChange={handleChangeTiempoTimbradoAgente}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    variant="filled"
                                    required
                                    name="tiempoEsperaTimbrado"
                                    value={tiempoEsperaTimbrado}
                                    fullWidth
                                    label="T. Espera para timbrado"
                                    onChange={handleChangeTiempoEsperaTimbrado}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ConfigurationQueue;
