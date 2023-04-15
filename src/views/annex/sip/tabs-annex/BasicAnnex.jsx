import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Grid, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';
import { Cached } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { generateRandomString } from 'utils/functions';
import { gridSpacing } from 'store/constant';
import { setInputValue } from 'store/annex';

const contexts = ['from-internal', 'from-external', 'from-none', 'from-live'];

const BasicAnnex = ({ handleBlur, handleChange, touched, values, errors, openModalEdit, setFieldValue }) => {
    // const { handleBlur, handleChange, touched, values, errors }  = props;
    const { key } = useSelector((state) => state.basicAnnex);
    const dispatch = useDispatch();

    const handleChangeInputValue = (event) => dispatch(setInputValue(event.target.name, event.target.value));
    const handleClickGenerateKey = () => {
        let x = generateRandomString();
        dispatch(setInputValue('key', x));
        setFieldValue('secret', x);
    };

    useEffect(() => {
        if (!key) dispatch(setInputValue('key', generateRandomString()));
    }, [key, dispatch]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container direction="row" spacing={gridSpacing}>
                    <Grid item xs={12} sm={6}>
                        <Grid container direction="column" spacing={gridSpacing}>
                            <Grid item>
                                <TextField
                                    id="extension"
                                    fullWidth
                                    type="text"
                                    name="extension"
                                    variant="filled"
                                    required
                                    disabled={openModalEdit}
                                    label="Extensión"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeInputValue(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.extension}
                                    error={Boolean(errors.extension && touched.extension)}
                                    helperText={Boolean(errors.extension && touched.extension) && errors.extension}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="callerID"
                                    fullWidth
                                    type="text"
                                    name="callerID"
                                    variant="filled"
                                    required
                                    label="Caller ID"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeInputValue(event);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.callerID}
                                    error={Boolean(errors.callerID && touched.callerID)}
                                    helperText={Boolean(errors.callerID && touched.callerID) && errors.callerID}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="voiceMail"
                                    fullWidth
                                    type="text"
                                    name="voiceMail"
                                    variant="filled"
                                    required
                                    label="Correo de voz"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeInputValue(event);
                                    }}
                                    value={values.voiceMail}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.voiceMail && touched.voiceMail)}
                                    helperText={Boolean(errors.voiceMail && touched.voiceMail) && errors.voiceMail}
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
                                    name="key"
                                    fullWidth
                                    label="Clave"
                                    value={!openModalEdit ? key : values.secret}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickGenerateKey}>
                                                    <Cached />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="mail"
                                    fullWidth
                                    type="text"
                                    name="mail"
                                    variant="filled"
                                    required
                                    label="Buzón de voz"
                                    value={values.extension}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="context"
                                    fullWidth
                                    select
                                    name="context"
                                    variant="filled"
                                    required
                                    label="Contexto"
                                    onChange={(event) => {
                                        handleChange(event);
                                        handleChangeInputValue(event);
                                    }}
                                    value={values.context}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.context && touched.context)}
                                    helperText={Boolean(errors.context && touched.context) && errors.context}
                                >
                                    {contexts.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

BasicAnnex.propTypes = {
    handleBlur: PropTypes.any,
    handleChange: PropTypes.any,
    touched: PropTypes.any,
    values: PropTypes.any,
    errors: PropTypes.any,
    openModalEdit: PropTypes.any
};

export default BasicAnnex;
