import { Grid, InputAdornment, MenuItem, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCola, setNumAnexo, setCorreo, setMinTiempo, setMedTiempo, setMaxTiempo } from 'store/queue';

import { gridSpacing } from 'store/constant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const colas = ['atencion-al-cliente', 'detecta'];

const TabsQueueMonitoring = () => {
    const { cola, numAnexo, correo, minTiempo, medTiempo, maxTiempo } = useSelector((state) => state.monitoringQueue);
    const dispatch = useDispatch();

    const handleChangeCola = (event) => dispatch(setCola(event.target.value));
    const handleChangeAnexo = (event) => dispatch(setNumAnexo(event.target.value));
    const handleChangeCorreo = (event) => dispatch(setCorreo(event.target.value));
    const handleChangeMinTiempo = (event) => dispatch(setMinTiempo(event.target.value));
    const handleChangeMedTiempo = (event) => dispatch(setMedTiempo(event.target.value));
    const handleChangeMaxTiempo = (event) => dispatch(setMaxTiempo(event.target.value));

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} direction="row">
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="filled"
                                    select
                                    required
                                    name="cola"
                                    value={cola}
                                    fullWidth
                                    label="Cola"
                                    onChange={handleChangeCola}
                                >
                                    {colas.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="filled"
                                    required
                                    name="numAnexo"
                                    value={numAnexo}
                                    fullWidth
                                    label="Número Anexo"
                                    onChange={handleChangeAnexo}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="filled"
                                    required
                                    name="correo"
                                    value={correo}
                                    fullWidth
                                    label="Correo"
                                    onChange={handleChangeCorreo}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="filled"
                                    required
                                    name="medTiempo"
                                    value={medTiempo}
                                    fullWidth
                                    label="Med. Tiempo"
                                    onChange={handleChangeMedTiempo}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <AccessTimeIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="filled"
                                    required
                                    name="minTiempo"
                                    value={minTiempo}
                                    fullWidth
                                    label="Min. Tiempo"
                                    onChange={handleChangeMinTiempo}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <AccessTimeIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="filled"
                                    required
                                    name="maxTiempo"
                                    value={maxTiempo}
                                    fullWidth
                                    label="Max. Tiempo"
                                    onChange={handleChangeMaxTiempo}
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
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TabsQueueMonitoring;
