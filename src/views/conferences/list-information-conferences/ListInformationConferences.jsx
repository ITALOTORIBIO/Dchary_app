import PropTypes from 'prop-types';
import { useState } from 'react';
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Edit, Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { getConferences } from 'store/filters';

const columns = [
    {
        id: 'name_meet',
        label: 'Nombre',
        type: 'text',
        align: 'center',
        minWidth: 80
    },
    {
        id: 'num_meet',
        label: 'Num. Conf.',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'pass_admin',
        label: 'Pass. Admin',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'pass_usu',
        label: 'Pass. Usuario',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'max_usus',
        label: 'Max. Usuarios',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'fecha',
        label: 'Fecha',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'hora',
        label: 'Hora',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'editar',
        label: 'Editar',
        type: 'button',
        align: 'center',
        minWidth: 120
    },
    {
        id: 'eliminar',
        label: 'Eliminar',
        type: 'button',
        align: 'center',
        minWidth: 120
    }
];

const ListInformationConferences = ({ rows }) => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [resultItemRingGroup, setResultItemRingGroup] = useState({});

    const dispatch = useDispatch();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getDataConferences = async () => {
        const result = await callToConferencesList();
        if (result.ok) dispatch(getConferences(result.data));
        else dispatch(getConferences([]));
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                        {!rows ? (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <Box paddingY="0.5rem" display="flex" alignItems="center" justifyContent="center">
                                        <Typography fontWeight="bold">No se pudo cargar la información</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.name_meet}
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
                                                    {column.id === 'editRow' ? (
                                                        <IconButton onClick={() => {}}>
                                                            <Edit />
                                                        </IconButton>
                                                    ) : column.id === 'deleteRow' ? (
                                                        <IconButton onClick={() => {}}>
                                                            <Delete />
                                                        </IconButton>
                                                    ) : (
                                                        value
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={!rows ? 0 : rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

ListInformationConferences.propTypes = {
    rows: PropTypes.array
};

export default ListInformationConferences;
