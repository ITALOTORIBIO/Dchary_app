import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, FormGroup, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCallGroup, setDHCP, setOpenVPN, setPickGroup, setRecord, setTLS } from 'store/annex';
import { gridSpacing } from 'store/constant';
import CodecTransferList from './transfer-list/CodecTransferList';

const records = ['Ninguna', 'Entrantes', 'Salientes', 'Ambos'];

const AdvancedAnnex = ({ handleBlur, handleChange, touched, values, errors }) => {
    const { codec } = useSelector((state) => state.advancedAnnex);
    const dispatch = useDispatch();

    const handleChangeDHCP = (event) => dispatch(setDHCP(event.target.value));
    const handleChangeRecord = (event) => dispatch(setRecord(event.target.value));
    const handleChangeCallGroup = (event) => dispatch(setCallGroup(event.target.value));
    const handleChangePickGroup = (event) => dispatch(setPickGroup(event.target.value));
    const handleChangeTLS = (event) => dispatch(setTLS(event.target.checked));
    const handleChangeOPENVPN = (event) => dispatch(setOpenVPN(event.target.checked));

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container direction="row" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="dhcp"
                                    fullWidth
                                    type="text"
                                    name="dhcp"
                                    variant="filled"
                                    required
                                    label="DHCP (Host)"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeDHCP(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.dhcp}
                                    error={Boolean(errors.dhcp && touched.dhcp)}
                                    helperText={Boolean(errors.dhcp && touched.dhcp) && errors.dhcp}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="record"
                                    variant="filled"
                                    select
                                    fullWidth
                                    name="record"
                                    label="Grabación"
                                    required
                                    value={values.record}
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeRecord(event);
                                    }}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.record && touched.record)}
                                    helperText={Boolean(errors.record && touched.record) && errors.record}
                                >
                                    {records.map((option, index) => (
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="callGroup"
                                    fullWidth
                                    type="text"
                                    name="callGroup"
                                    variant="filled"
                                    label="Call Group"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeCallGroup(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.callGroup}
                                    error={Boolean(errors.extension && touched.extension)}
                                    helperText={Boolean(errors.extension && touched.extension) && errors.extension}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="pickGroup"
                                    fullWidth
                                    type="text"
                                    name="pickGroup"
                                    variant="filled"
                                    label="Pick Group"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangePickGroup(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.pickGroup}
                                    error={Boolean(errors.extension && touched.extension)}
                                    helperText={Boolean(errors.extension && touched.extension) && errors.extension}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} marginTop="1rem">
                        <Grid container direction="row">
                            <Grid item xs={12}>
                                <CodecTransferList available={codec.available} selected={codec.selected} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body" fontSize="1rem">
                            Opciones de encriptación y/o seguridad
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={values.tlsSrtp}
                                        onChange={(event) => {
                                            handleChange(event);
                                            handleChangeTLS(event);
                                        }}
                                    />
                                }
                                label="TLS-SRTP"
                                name="tlsSrtp"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={values.openVPN}
                                        onChange={(event) => {
                                            handleChange(event);
                                            handleChangeOPENVPN(event);
                                        }}
                                    />
                                }
                                label="OPEN VPN"
                                name="openVPN"
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

AdvancedAnnex.propTypes = {
    handleBlur: PropTypes.any,
    handleChange: PropTypes.any,
    touched: PropTypes.any,
    values: PropTypes.any,
    errors: PropTypes.any
};

export default AdvancedAnnex;
