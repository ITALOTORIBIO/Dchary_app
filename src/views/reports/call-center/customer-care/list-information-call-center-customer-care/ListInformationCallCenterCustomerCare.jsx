import { useState } from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Delete, Edit } from '@mui/icons-material';

const columns = [
    {
        id: 'cola',
        label: 'Cola',
        type: 'text',
        align: 'center',
        minWidth: 80
    },
    {
        id: 'nvs',
        label: 'NVS',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'tab',
        label: 'TAB',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'editRow',
        label: 'Editar',
        minWidth: 100,
        align: 'center',
        type: 'button'
    },
    {
        id: 'deleteRow',
        label: 'Eliminar',
        minWidth: 100,
        align: 'center',
        type: 'button'
    }
];

function createData(cola, nvs, tab, editRow, deleteRow) {
    return { cola, nvs, tab, editRow, deleteRow };
}

const rowsCustomerCare = [
    createData('atencion-al-cliente', '5', '1', <Edit />, <Delete />),
    createData('atencion-al-cliente', '4', '2', <Edit />, <Delete />),
    createData('atencion-al-cliente', '3', '3', <Edit />, <Delete />),
    createData('atencion-al-cliente', '2', '4', <Edit />, <Delete />),
    createData('atencion-al-cliente', '1', '5', <Edit />, <Delete />),
    createData('detecta', '5', '1', <Edit />, <Delete />),
    createData('detecta', '4', '2', <Edit />, <Delete />),
    createData('detecta', '3', '3', <Edit />, <Delete />),
    createData('detecta', '2', '4', <Edit />, <Delete />),
    createData('detecta', '1', '5', <Edit />, <Delete />)
];

const ListInformationCallCenterCustomerCare = () => {
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
                        {rowsCustomerCare.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
                count={rowsCustomerCare.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ListInformationCallCenterCustomerCare;
