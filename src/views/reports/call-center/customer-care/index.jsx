import { useState } from 'react';

import {
    Button,
    Grid,
    IconButton,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { Search } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import { useTheme } from '@mui/material/styles';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ListInformationCallCenterCustomerCare from './list-information-call-center-customer-care/ListInformationCallCenterCustomerCare';

const columns = [
    {
        id: 'leyenda',
        label: 'Leyenda',
        align: 'center'
    },
    {
        id: 'tab',
        label: 'TAB',
        align: 'center'
    },
    {
        id: 'nvs',
        label: 'NVS',
        align: 'center'
    },
    {
        id: 'ro',
        label: 'RO',
        align: 'center'
    },
    {
        id: 'ema',
        label: 'EMA',
        align: 'center'
    },
    {
        id: 'epa',
        label: 'EPA',
        align: 'center'
    },
    {
        id: 'tpc',
        label: 'TPC',
        align: 'center'
    }
];

function createData(leyenda, tab, nvs, ro, ema, epa, tpc) {
    return { leyenda, tab, nvs, ro, ema, epa, tpc };
}

const rows = [
    createData(
        <InfoIcon />,
        'Tiempo de abandono',
        'Nivel de servicio',
        'Respuesta operador',
        'Tiempo de abandono',
        'Espera promedio de atención',
        'Tiempo promedio de conversación'
    )
];

const queues = ['Todos', 'atencion-al-cliente', 'detecta'];

const CustomerCare = () => {
    const theme = useTheme();
    const [queue, setQueue] = useState('');
    const [NVS, setNVS] = useState('');
    const [TAB, setTAB] = useState('');
    const [showInformation, setShowInformation] = useState(false);

    const handleChangeQueue = (event) => setQueue(event.target.value);
    const handleChangeNVS = (event) => setNVS(event.target.value);
    const handleChangeTAB = (event) => setTAB(event.target.value);

    const handleClickSearchCustomCare = () => {
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
                                    <Typography variant="h4">Reporte: Atención Cliente</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing} alignItems="center">
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            select
                                            label="Cola"
                                            name="queue"
                                            value={queue}
                                            variant="standard"
                                            onChange={handleChangeQueue}
                                        >
                                            {queues.map((option, index) => (
                                                <MenuItem key={index} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="NVS(seg)"
                                            name="NVS"
                                            value={NVS}
                                            type="number"
                                            variant="standard"
                                            onChange={handleChangeNVS}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="TAB(seg)"
                                            name="TAB"
                                            value={TAB}
                                            type="number"
                                            variant="standard"
                                            onChange={handleChangeTAB}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container xs={12} direction="row" justifyContent="center" mt={3}>
                                <Grid item xs={9}>
                                    <TableContainer sx={{ maxHeight: 440, borderRadius: '0.5rem' }}>
                                        <Table stickyHeader size="small" sx={{ borderCollapse: 'collapse !important' }}>
                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            sx={{
                                                                minWidth: column.minWidth,
                                                                backgroundColor: theme.palette.primary.main,
                                                                color: theme.palette.common.white,
                                                                border: '1px solid white !important'
                                                            }}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row, index) => {
                                                    return (
                                                        <TableRow
                                                            hover
                                                            role="checkbox"
                                                            tabIndex={-1}
                                                            key={index}
                                                            sx={{ backgroundColor: index % 2 === 0 ? 'rgba(224, 224, 224, 0.2)' : null }}
                                                        >
                                                            {columns.map((column) => {
                                                                const value = row[column.id];
                                                                return (
                                                                    <TableCell
                                                                        key={column.id}
                                                                        align={column.align}
                                                                        sx={{
                                                                            border: '0.5px solid rgba(224, 224, 224, 1) !important'
                                                                        }}
                                                                    >
                                                                        {column.type === 'button' ? (
                                                                            <IconButton>{value}</IconButton>
                                                                        ) : (
                                                                            value
                                                                        )}
                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    sx={{
                                        textTransform: 'uppercase',
                                        paddingX: '1.25rem',
                                        paddingY: '0.5rem'
                                    }}
                                    variant="contained"
                                    endIcon={<Search />}
                                    onClick={handleClickSearchCustomCare}
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
                            <ListInformationCallCenterCustomerCare />
                        </MainCard>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default CustomerCare;
