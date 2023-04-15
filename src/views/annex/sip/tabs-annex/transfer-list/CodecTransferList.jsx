import PropTypes from 'prop-types';
import { useState } from 'react';
import { Grid, List, Card, ListItem, ListItemText, Checkbox, Button, Divider, ListItemIcon, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { setCodecAvailable, setCodecSelected } from 'store/annex';
import { not, intersection, union } from 'utils/functions';

const CodecTransferList = ({ available, selected }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [checked, setChecked] = useState([]);

    const leftChecked = intersection(checked, available);
    const rightChecked = intersection(checked, selected);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = (event) => {
        dispatch(setCodecAvailable(not(available, leftChecked)));
        dispatch(setCodecSelected(selected.concat(leftChecked)));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        dispatch(setCodecAvailable(available.concat(rightChecked)));
        dispatch(setCodecSelected(not(selected, rightChecked)));
        setChecked(not(checked, rightChecked));
    };

    const customList = (title, items) => (
        <Card>
            <Grid container marginLeft="1rem">
                <Grid item>
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'Todos los items seleccionados'
                        }}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="body" fontSize="1rem">
                        {title}
                    </Typography>
                    <Typography color={theme.palette.grey[500]}>{`${numberOfChecked(items)}/${items.length} seleccionados`}</Typography>
                </Grid>
            </Grid>
            <Divider />
            <List
                sx={{
                    width: 300,
                    height: 215,
                    bgcolor: 'background.paper',
                    overflow: 'auto'
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value) => {
                    return (
                        <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': value
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={value} primary={value} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>{customList('Codec Disponibles', available)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList('Codec Seleccionados', selected)}</Grid>
        </Grid>
    );
};

CodecTransferList.propTypes = {
    available: PropTypes.array,
    selected: PropTypes.array
};

export default CodecTransferList;
