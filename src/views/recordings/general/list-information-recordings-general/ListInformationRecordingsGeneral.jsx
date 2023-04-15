import { useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactAudioPlayer from 'react-audio-player';

const columns = [
    {
        id: 'annex',
        label: 'Anexo',
        type: 'text',
        align: 'center',
        minWidth: 80
    },
    {
        id: 'typeAnnex',
        label: 'Tipo Anexo',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'origin',
        label: 'Origen',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'destiny',
        label: 'Destino',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'rangeDate',
        label: 'Rango Fechas',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'audio',
        label: 'Grabación',
        type: 'button',
        align: 'center',
        minWidth: 120
    }
];

function createData(annex, typeAnnex, origin, destiny, rangeDate, audio) {
    return { annex, typeAnnex, origin, destiny, rangeDate, audio };
}

const rows = [
    createData('122', 'Group', 'Origen', 'Destino', '17/08/2022 - 24/08/2022', 'http://144.91.71.204/recording/opt-1111.wav'),
    createData('122', 'Group', 'Origen', 'Destino', '17/08/2022 - 24/08/2022', 'http://144.91.71.204/recording/opt-1515.wav')
];

const ListInformationRecordingsGeneral = () => {
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
                                                {column.type === 'button' ? (
                                                    <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                                                        <ReactAudioPlayer src={value} autoPlay={false} controls />
                                                    </Box>
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

export default ListInformationRecordingsGeneral;
