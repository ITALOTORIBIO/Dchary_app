import PropTypes from 'prop-types';
import { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const columns = [
    {
        id: 'id_sip',
        label: 'ID Sip',
        type: 'text',
        align: 'center',
        minWidth: 80
    },
    {
        id: 'name',
        label: 'Name',
        type: 'text',
        align: 'center',
        minWidth: 80
    },
    {
        id: 'callerid',
        label: 'Caller Id',
        type: 'text',
        align: 'center',
        minWidth: 80
    },
    {
        id: 'context',
        label: 'Context',
        type: 'text',
        align: 'center',
        minWidth: 80
    },
    {
        id: 'equipo',
        label: 'Equipo',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'mailbox',
        label: 'Correo de voz',
        type: 'text',
        align: 'center',
        minWidth: 150
    }
];

const ListPreviewImportAnnex = ({ dataImportExcelAnnex }) => {
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
                        {!dataImportExcelAnnex ? (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <Box paddingY="0.5rem" display="flex" alignItems="center" justifyContent="center">
                                        <Typography fontWeight="bold">No se pudo cargar la información</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            dataImportExcelAnnex.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.name}
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
                                                    {value}
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
                count={dataImportExcelAnnex.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

ListPreviewImportAnnex.propTypes = {
    dataImportExcelAnnex: PropTypes.any
};

export default ListPreviewImportAnnex;
