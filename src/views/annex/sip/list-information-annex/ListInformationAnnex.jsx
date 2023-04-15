import PropTypes from 'prop-types';
import { useState } from 'react';
import {
    Box,
    IconButton,
    Modal,
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
import EditAnnexModal from '../edit-annex-modal/EditAnnexModal';
import { modalOpenAnnexDelete, modalOpenAnnexEdit } from 'store/modal';
import { useDispatch, useSelector } from 'react-redux';
import { callToElementAnnexList } from 'services/apis';
import DeleteAnnexModal from '../delete-annex-modal/DeleteAnnexModal';

const columns = [
    { id: 'name', label: 'SIP', minWidth: 70, align: 'center', type: 'text' },
    { id: 'callerid', label: 'Caller ID', minWidth: 140, align: 'center', type: 'text' },
    {
        id: 'context',
        label: 'Contexto',
        minWidth: 140,
        align: 'center',
        type: 'text'
    },
    {
        id: 'equipo',
        label: 'Equipo',
        minWidth: 140,
        align: 'center',
        type: 'text'
    },
    {
        id: 'openVPN',
        label: 'Open VPN',
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
    }
];

const ListInformationAnnex = ({ rows }) => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { openModalEdit, openBackdropEdit, openSnackbarEdit } = useSelector((state) => state.modalEditAnnex);
    const { openModalDelete, openBackdropDelete, openSnackbarDelete } = useSelector((state) => state.modalDeleteAnnex);
    const [resultItemAnnex, setResultItemAnnex] = useState({});
    const dispatch = useDispatch();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleShowEditAnnexModal = () => {
        dispatch(modalOpenAnnexEdit(!openModalEdit));
    };

    const handleShowDeleteConfirmationModal = () => {
        dispatch(modalOpenAnnexDelete(!openModalDelete));
    };

    const getElementFromListAnnex = async (nameEdit) => {
        const response = await callToElementAnnexList(nameEdit);
        //resultItemAnnex = response.data;
        setResultItemAnnex(response.data);
    };

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
                                                        {column.id === 'editRow' ? (
                                                            <IconButton
                                                                onClick={() => {
                                                                    getElementFromListAnnex(row.name);
                                                                    handleShowEditAnnexModal();
                                                                }}
                                                            >
                                                                <Edit />
                                                            </IconButton>
                                                        ) : column.id === 'deleteRow' ? (
                                                            <IconButton
                                                                onClick={() => {
                                                                    getElementFromListAnnex(row.name);
                                                                    handleShowDeleteConfirmationModal();
                                                                }}
                                                            >
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
                    {resultItemAnnex.name != undefined ? (
                        <EditAnnexModal
                            openModalEdit={openModalEdit}
                            openBackdropEdit={openBackdropEdit}
                            openSnackbarEdit={openSnackbarEdit}
                            resultItemAnnex={resultItemAnnex}
                        />
                    ) : null}
                    {resultItemAnnex.name != undefined ? (
                        <DeleteAnnexModal
                            openModalDelete={openModalDelete}
                            openBackdropDelete={openBackdropDelete}
                            openSnackbarDelete={openSnackbarDelete}
                            resultItemAnnex={resultItemAnnex}
                        />
                    ) : null}
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
        </>
    );
};

ListInformationAnnex.propTypes = {
    rows: PropTypes.array
};

export default ListInformationAnnex;
