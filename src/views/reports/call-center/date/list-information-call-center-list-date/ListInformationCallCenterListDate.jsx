import { useState } from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Delete, Edit } from '@mui/icons-material';

const columns = [
    {
        id: 'column1',
        label: 'Column 1',
        type: 'text',
        align: 'center',
        minWidth: 80
    },
    {
        id: 'column2',
        label: 'Column 2',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'column3',
        label: 'Column 3',
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

function createData(column1, column2, column3, editRow, deleteRow) {
    return { column1, column2, column3, editRow, deleteRow };
}

const rows = [createData('Value 1', 'Value 2', 'Value 3', <Edit />, <Delete />)];

const ListInformationCallCenterListDate = () => {
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

export default ListInformationCallCenterListDate;
