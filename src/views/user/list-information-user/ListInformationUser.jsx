import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IconButton, useTheme } from '@mui/material';
import { AccountBox, CheckBox, Delete, DisabledByDefaultRounded, Edit } from '@mui/icons-material';

const columns = [
    { id: 'name', type: 'text', label: 'Nombre', minWidth: 180 },
    { id: 'state', type: 'button', label: 'Estado', minWidth: 100 },
    {
        id: 'localTelephone',
        label: 'Local',
        type: 'button',
        minWidth: 100
    },
    {
        id: 'nationalTelephone',
        label: 'Nacional',
        type: 'button',
        minWidth: 100
    },
    {
        id: 'internationalTelephone',
        label: 'Internacional',
        type: 'button',
        minWidth: 100
    },
    {
        id: 'nationalPhone',
        label: 'Nacional',
        type: 'button',
        minWidth: 100
    },
    {
        id: 'internationalPhone',
        label: 'Internacional',
        type: 'button',
        minWidth: 100
    },
    { id: 'edit', label: 'Editar', type: 'button', minWidth: 100 },
    { id: 'del', label: 'Eliminar', type: 'button', minWidth: 100 }
];

function createData(name, state, localTelephone, nationalTelephone, internationalTelephone, nationalPhone, internationalPhone, edit, del) {
    return { name, state, localTelephone, nationalTelephone, internationalTelephone, nationalPhone, internationalPhone, edit, del };
}

const rows = [
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    ),
    createData(
        'Ronald Pareja',
        <AccountBox />,
        <CheckBox />,
        <CheckBox />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <DisabledByDefaultRounded />,
        <Edit />,
        <Delete />
    )
];

const ListInformationUser = () => {
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
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440, borderRadius: '0.5rem' }}>
                <Table stickyHeader size="small" sx={{ borderCollapse: 'collapse !important' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="center"
                                colSpan={2}
                                sx={{
                                    backgroundColor: theme.palette.primary[800],
                                    color: theme.palette.common.white
                                }}
                            />
                            <TableCell
                                align="center"
                                colSpan={3}
                                sx={{
                                    backgroundColor: theme.palette.primary[800],
                                    color: theme.palette.common.white
                                }}
                            >
                                Llamada Fija
                            </TableCell>
                            <TableCell
                                align="center"
                                colSpan={2}
                                sx={{
                                    backgroundColor: theme.palette.primary[800],
                                    color: theme.palette.common.white
                                }}
                            >
                                Llamada Celular
                            </TableCell>
                            <TableCell
                                align="center"
                                colSpan={2}
                                sx={{
                                    backgroundColor: theme.palette.primary[800],
                                    color: theme.palette.common.white
                                }}
                            />
                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align="center"
                                    sx={{
                                        top: 35,
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
                                                align="center"
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

export default ListInformationUser;
