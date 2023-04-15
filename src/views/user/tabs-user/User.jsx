import { Checkbox, Divider, FormControlLabel, FormGroup, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import {
    setArea,
    setCheckTime,
    setCostCenter,
    setExtension,
    setFirstLastName,
    setMaxTime,
    setNames,
    setPhoneInternational,
    setPhoneNational,
    setPin,
    setRol,
    setSecondLastName,
    setTelephoneInternational,
    setTelephoneLocal,
    setTelephoneNational
} from 'store/user';

const extensions = ['1020', '1021', '1035', '1036', '1018', '1020', '2135', '2140'];

const User = () => {
    const { names, firstLastName, secondLastName, pin, rol, checkTime, maxTime, area, costCenter, extension, telephone, phone } =
        useSelector((state) => state.informationUser);
    const dispatch = useDispatch();

    const handleChangeNames = (event) => dispatch(setNames(event.target.value));
    const handleChangeFirstLastName = (event) => dispatch(setFirstLastName(event.target.value));
    const handleChangeSecondLastName = (event) => dispatch(setSecondLastName(event.target.value));
    const handleChangePIN = (event) => dispatch(setPin(event.target.value));
    const handleChangeRol = (event) => dispatch(setRol(event.target.value));
    const handleChangeCheckTime = (event) => {
        dispatch(setCheckTime(event.target.checked));
        dispatch(setMaxTime(''));
    };
    const handleChangeArea = (event) => dispatch(setArea(event.target.value));
    const handleChangeCostCenter = (event) => dispatch(setCostCenter(event.target.value));
    const handleChangeExtension = (event) => dispatch(setExtension(event.target.value));
    const handleChangeMaxTime = (event) => dispatch(setMaxTime(event.target.value));
    const handleChangeTelephoneLocal = (event) => dispatch(setTelephoneLocal(event.target.checked));
    const handleChangeTelephoneNational = (event) => dispatch(setTelephoneNational(event.target.checked));
    const handleChangeTelephoneInternational = (event) => dispatch(setTelephoneInternational(event.target.checked));
    const handleChangePhoneNational = (event) => dispatch(setPhoneNational(event.target.checked));
    const handleChangePhoneInternational = (event) => dispatch(setPhoneInternational(event.target.checked));

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container direction="row" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="filled"
                                    required
                                    name="names"
                                    value={names}
                                    fullWidth
                                    label="Nombres"
                                    onChange={handleChangeNames}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="filled"
                                    required
                                    name="firstLastName"
                                    value={firstLastName}
                                    fullWidth
                                    label="Apellido Paterno"
                                    onChange={handleChangeFirstLastName}
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
                                    name="secondLastName"
                                    value={secondLastName}
                                    fullWidth
                                    label="Apellido Materno"
                                    onChange={handleChangeSecondLastName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="filled"
                                    required
                                    name="pinNumber"
                                    value={pin}
                                    fullWidth
                                    label="Número de PIN"
                                    onChange={handleChangePIN}
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
                                    name="rol"
                                    value={rol}
                                    fullWidth
                                    label="Puesto"
                                    onChange={handleChangeRol}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={gridSpacing} alignItems="center" justifyContent="center" direction="row">
                                    <Grid item xs={1} sm={2} lg={1}>
                                        <FormControlLabel
                                            control={<Checkbox checked={checkTime} onChange={handleChangeCheckTime} />}
                                            name="checkTime"
                                        />
                                    </Grid>
                                    <Grid item xs={11} sm={10} lg={11}>
                                        <TextField
                                            variant="filled"
                                            required
                                            disabled={!checkTime}
                                            fullWidth
                                            name="maxTime"
                                            value={maxTime}
                                            label="Tiempo Max. (min)"
                                            onChange={handleChangeMaxTime}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    variant="filled"
                                    select
                                    fullWidth
                                    required
                                    label="Área"
                                    name="area"
                                    value={area}
                                    onChange={handleChangeArea}
                                >
                                    <MenuItem value={area}>{area}</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    variant="filled"
                                    select
                                    fullWidth
                                    required
                                    label="Centro de Costo"
                                    name="costCenter"
                                    value={costCenter}
                                    onChange={handleChangeCostCenter}
                                >
                                    <MenuItem value={costCenter}>{costCenter}</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    variant="filled"
                                    select
                                    fullWidth
                                    required
                                    label="Extensión"
                                    name="extension"
                                    value={extension}
                                    onChange={handleChangeExtension}
                                >
                                    {extensions.map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Typography fontWeight="bold">Fijo</Typography>
                                <Divider sx={{ marginTop: '0.75rem' }} />
                            </Grid>
                            <Grid item xs={12} marginTop="-0.75rem">
                                <FormGroup>
                                    <Grid container direction="row">
                                        <Grid item xs={12} sm={4}>
                                            <FormControlLabel
                                                control={<Checkbox checked={telephone.local} onChange={handleChangeTelephoneLocal} />}
                                                label="Local"
                                                name="telephone.local"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControlLabel
                                                control={<Checkbox checked={telephone.national} onChange={handleChangeTelephoneNational} />}
                                                label="Nacional"
                                                name="telephone.national"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={telephone.international}
                                                        onChange={handleChangeTelephoneInternational}
                                                    />
                                                }
                                                label="Internacional"
                                                name="telephone.international"
                                            />
                                        </Grid>
                                    </Grid>
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Typography fontWeight="bold">Celular</Typography>
                                <Divider sx={{ marginTop: '0.75rem' }} />
                            </Grid>
                            <Grid item xs={12} marginTop="-0.75rem">
                                <FormGroup>
                                    <Grid container direction="row">
                                        <Grid item xs={12} sm={4}>
                                            <FormControlLabel
                                                control={<Checkbox checked={phone.national} onChange={handleChangePhoneNational} />}
                                                label="Nacional"
                                                name="phone.national"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={phone.international} onChange={handleChangePhoneInternational} />
                                                }
                                                label="Internacional"
                                                name="phone.international"
                                            />
                                        </Grid>
                                    </Grid>
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default User;
