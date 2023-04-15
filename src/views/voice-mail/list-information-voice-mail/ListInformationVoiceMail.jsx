import { useState } from 'react';
import {
    Button,
    IconButton,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Edit, Delete } from '@mui/icons-material';
import AudioModal from '../audio-modal/AudioModal';
import { modalOpenAudio } from 'store/modal';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

const columns = [
    {
        id: 'nombre',
        label: 'Nombre',
        minWidth: 70,
        align: 'center',
        type: 'text'
    },
    {
        id: 'context',
        label: 'Contexto',
        minWidth: 140,
        align: 'center',
        type: 'text'
    },
    {
        id: 'buzonVoz',
        label: 'Voicemail',
        minWidth: 140,
        align: 'center',
        type: 'text'
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
    },
    {
        id: 'audios',
        label: 'Audios',
        minWidth: 100,
        align: 'center',
        type: 'button'
    }
];

function createData(nombre, context, buzonVoz, editRow, deleteRow, audios) {
    return { nombre, context, buzonVoz, editRow, deleteRow, audios };
}

const ListInformationVoiceMail = () => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { open } = useSelector((state) => state.modalAudio);
    const dispatch = useDispatch();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleShowAudioModal = () => {
        dispatch(modalOpenAudio(!open));
    };

    const rows = [
        createData(
            'Anexo 1234',
            'Contexto',
            'Buzon de voz',
            <Edit />,
            <Delete />,
            <Link component="button" onClick={handleShowAudioModal}>
                Ver audios
            </Link>
        ),
        createData(
            'Anexo 1235',
            'Contexto',
            'Buzon de voz',
            <Edit />,
            <Delete />,
            <Link component="button" onClick={handleShowAudioModal}>
                Ver audios
            </Link>
        ),
        createData(
            'Anexo 1236',
            'Contexto',
            'Buzon de voz',
            <Edit />,
            <Delete />,
            <Link component="button" onClick={handleShowAudioModal}>
                Ver audios
            </Link>
        )
    ];

    return (
        <>
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
                                                    {column.type === 'button' && column.id != 'audios' ? (
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
            <AudioModal open={open} />
        </>
    );
};

export default ListInformationVoiceMail;
