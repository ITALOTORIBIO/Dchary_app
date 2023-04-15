import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setBrand, setCheckVLAN, setMac, setModel, setVLAN } from 'store/annex';
import { gridSpacing } from 'store/constant';

const provisioningList = [
    {
        brand: 'Ninguna',
        models: []
    },
    {
        brand: 'Yealink',
        models: ['T23G', 'T31G', 'T42G', 'T46G']
    },
    {
        brand: 'Akuvok',
        models: ['Default']
    },
    {
        brand: 'Snom',
        models: ['300', '370']
    }
];

const ProvisioningAnnex = ({ handleBlur, handleChange, touched, values, errors, setFieldValue }) => {
    const { telefono, checkVLAN, vlan } = useSelector((state) => state.provisioningAnnex);
    const dispatch = useDispatch();

    const handleChangeBrand = (event) => {
        if (event.target.value === 0) {
            dispatch(setBrand(0));
            dispatch(setModel(''));
        } else {
            dispatch(setBrand(event.target.value));
            dispatch(setModel(''));
        }
    };
    const handleChangeModel = (event) => dispatch(setModel(event.target.value));
    const handleChangeMAC = (event) => dispatch(setMac(event.target.value));
    const handleChangeCheckVLAN = (event) => {
        dispatch(setCheckVLAN(event.target.checked));
        dispatch(setVLAN(''));
    };
    const handleChangeVLAN = (event) => dispatch(setVLAN(event.target.value));

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container direction="row" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="brand"
                                    variant="filled"
                                    select
                                    fullWidth
                                    name="brand"
                                    label="Marca"
                                    value={values.brand == '' || values.brand == null ? 0 : values.brand}
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeBrand(event);
                                        setFieldValue('model', '');
                                    }}
                                >
                                    {provisioningList.map((option, index) => (
                                        <MenuItem key={index} value={index}>
                                            {option.brand}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="model"
                                    variant="filled"
                                    select
                                    defaultValue=""
                                    fullWidth
                                    name="model"
                                    label="Modelo"
                                    value={values.brand == 0 ? '' : values.model}
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeModel(event);
                                    }}
                                >
                                    {!telefono.brand || telefono.branch == 0 ? (
                                        <MenuItem key={0} value={telefono.model}>
                                            {telefono.model}
                                        </MenuItem>
                                    ) : (
                                        provisioningList
                                            .filter((item, index) => index === values.brand)[0]
                                            .models.map((option, index) => (
                                                <MenuItem key={index} value={index + 1}>
                                                    {option}
                                                </MenuItem>
                                            ))
                                    )}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="mac"
                                    variant="filled"
                                    required={!!telefono.brand && !!telefono.model}
                                    name="mac"
                                    value={values.mac}
                                    fullWidth
                                    label="MAC"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeMAC(event);
                                    }}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.mac && touched.mac) && !!telefono.brand && !!telefono.model}
                                    helperText={Boolean(errors.mac && touched.mac) && !!telefono.brand && !!telefono.model && errors.mac}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid container spacing={gridSpacing} alignItems="center" justifyContent="center" direction="row">
                                    <Grid item xs={3}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={checkVLAN}
                                                    onChange={(event) => {
                                                        handleChange(event);
                                                        handleChangeCheckVLAN(event);
                                                    }}
                                                />
                                            }
                                            label="VLAN"
                                            name="checkVLAN"
                                        />
                                    </Grid>
                                    <Grid item xs={9}>
                                        {checkVLAN && (
                                            <TextField
                                                id="vlan"
                                                variant="filled"
                                                required
                                                fullWidth
                                                name="vlan"
                                                label="Número de VLAN"
                                                onChange={(event) => {
                                                    handleChange(event);
                                                    handleChangeVLAN(event);
                                                }}
                                                value={vlan}
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

ProvisioningAnnex.propTypes = {
    handleBlur: PropTypes.any,
    handleChange: PropTypes.any,
    touched: PropTypes.any,
    values: PropTypes.any,
    errors: PropTypes.any,
    setFieldValue: PropTypes.any
};

export default ProvisioningAnnex;
