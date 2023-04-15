import { useState } from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const columns = [
    {
        id: 'index',
        label: 'Índice',
        type: 'text',
        align: 'center',
        minWidth: 80
    },
    {
        id: 'nameDestiny',
        label: 'Destino',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'totalTimeHr',
        label: 'Duración (Hr.)',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'totalTimeMi',
        label: 'Duración (Mi.)',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'totalCalls',
        label: 'Cantidad de llamadas',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'avgTime',
        label: 'T. Promedio',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'minTime',
        label: 'T. Min.',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'maxTime',
        label: 'T. Max.',
        type: 'text',
        align: 'center',
        minWidth: 150
    }
];

function createData(index, nameDestiny, totalTimeHr, totalTimeMi, totalCalls, avgTime, minTime, maxTime) {
    return { index, nameDestiny, totalTimeHr, totalTimeMi, totalCalls, avgTime, minTime, maxTime };
}

const rows = [
    createData('122', 'Fijo Local', '23', '27', '1', '25', '1234', '1554'),
    createData('122', 'Fijo Local', '23', '27', '1', '25', '1234', '1554'),
    createData('122', 'Fijo Local', '23', '27', '1', '25', '1234', '1554'),
    createData('122', 'Fijo Local', '23', '27', '1', '25', '1234', '1554'),
    createData('122', 'Fijo Local', '23', '27', '1', '25', '1234', '1554'),
    createData('122', 'Fijo Local', '23', '27', '1', '25', '1234', '1554'),
    createData('122', 'Fijo Local', '23', '27', '1', '25', '1234', '1554'),
    createData('122', 'Fijo Local', '23', '27', '1', '25', '1234', '1554'),
    createData('1345', 'Celular Nacional', '17', '12', '2', '40', '3211', '1334'),
    createData('1345', 'Celular Nacional', '17', '12', '2', '40', '3211', '1334'),
    createData('1345', 'Celular Nacional', '17', '12', '2', '40', '3211', '1334'),
    createData('1345', 'Celular Nacional', '17', '12', '2', '40', '3211', '1334'),
    createData('1345', 'Celular Nacional', '17', '12', '2', '40', '3211', '1334'),
    createData('1345', 'Celular Nacional', '17', '12', '2', '40', '3211', '1334'),
    createData('1345', 'Celular Nacional', '17', '12', '2', '40', '3211', '1334'),
    createData('1345', 'Celular Nacional', '17', '12', '2', '40', '3211', '1334')
];

const ListInformationCallDestiny = () => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
                                                {column.type === 'button' ? <IconButton>{value}</IconButton> : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ListInformationCallDestiny;
