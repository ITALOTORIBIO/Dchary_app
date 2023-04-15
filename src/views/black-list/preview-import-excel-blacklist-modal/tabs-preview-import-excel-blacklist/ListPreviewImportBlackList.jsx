import PropTypes from 'prop-types';
import { useState } from 'react';
import {
    FormControlLabel,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';

const StateSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(({ theme }) => ({
    width: 37,
    height: 20,
    padding: 0,
    marginLeft: 28,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#2ECA45',
                opacity: 1,
                border: 0
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5
            }
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff'
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
        }
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 16,
        height: 16
    },
    '& .MuiSwitch-track': {
        borderRadius: 20 / 2,
        backgroundColor: '#e60012',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500
        })
    }
}));

const columns = [
    {
        id: 'type_call',
        label: 'Tipo',
        type: 'text',
        align: 'center',
        minWidth: 80
    },
    {
        id: 'num_tlf',
        label: 'Número',
        type: 'text',
        align: 'center',
        minWidth: 80
    },
    {
        id: 'description',
        label: 'Descripción',
        type: 'text',
        align: 'center',
        minWidth: 80
    },
    {
        id: 'status',
        label: 'Estado',
        type: 'button',
        align: 'center',
        minWidth: 80
    }
];

const ListPreviewImportBlackList = ({ dataImportExcelBlackList }) => {
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
                        {!dataImportExcelBlackList ? (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <Box paddingY="0.5rem" display="flex" alignItems="center" justifyContent="center">
                                        <Typography fontWeight="bold">No se pudo cargar la información</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            dataImportExcelBlackList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.num_tlf}
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
                                                    {column.id === 'status' ? (
                                                        <FormControlLabel control={<StateSwitch checked={value} />} />
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
                count={dataImportExcelBlackList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

ListPreviewImportBlackList.propTypes = {
    dataImportExcelBlackList: PropTypes.any
};

export default ListPreviewImportBlackList;
