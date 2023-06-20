import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { Edit, Delete, AddBox, IndeterminateCheckBox } from '@mui/icons-material';
import { callToRingGroupList, callToElementRingGroup } from 'services/apis';
import { modalOpenRingGroupDelete } from 'store/modal';
import { modalOpenRingGroupEdit } from 'store/modal';
import SalidaProdModal from '../delete-ring-group-modal/SalidaProdModal';
import IngresarProdModal from '../edit-ring-group-modal/IngresarProdModal';
import { getRingGroup } from 'store/filters';

const columns = [
    {
        id: 'nom_prod',
        label: 'Nombre del producto',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'cant_prod',
        label: 'Cantidad',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'unidad_prod',
        label: 'Unidad',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'valor_total_prod',
        label: 'Valor Total (S/.)',
        type: 'text',
        align: 'center',
        minWidth: 150
    },
    // {
    //     id: 'editRow',
    //     label: 'Editar',
    //     type: 'button',
    //     align: 'center',
    //     minWidth: 120
    // },
    {
        id: 'aggrRow',
        label: 'Ingreso',
        type: 'button',
        align: 'center',
        minWidth: 100
    },
    {
        id: 'deleteRow',
        label: 'Salida',
        type: 'button',
        align: 'center',
        minWidth: 100
    }
];

const ListInformationRingGroup = ({ rows }) => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [resultItemRingGroup, setResultItemRingGroup] = useState({});
    const { openModalRingGroupEdit, openBackdropRingGroupEdit, openSnackbarRingGroupEdit } = useSelector(
        (state) => state.modalEditRingGroup
    );
    const { openModalRingGroupDelete, openBackdropRingGroupDelete, openSnackbarRingGroupDelete } = useSelector(
        (state) => state.modalDeleteRingGroup
    );

    const dispatch = useDispatch();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getElementFromRingGroup = async (name) => {
        const response = await callToElementRingGroup(name);
        setResultItemRingGroup(response.data);
    };

    const handleShowIngresarProdModal = () => {
        dispatch(modalOpenRingGroupEdit(!openModalRingGroupEdit));
    };

    const handleShowSalidaProdModal = () => {
        dispatch(modalOpenRingGroupDelete(!openModalRingGroupDelete));
    };

    const getDataRingGroup = async () => {
        const result = await callToRingGroupList();
        if (result.ok) dispatch(getRingGroup(result.data));
        else dispatch(getRingGroup([]));
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
                                        key={row.nom_prod}
                                        sx={{
                                            backgroundColor:
                                                row.estado_prod === 'Warning'
                                                    ? 'rgba(255, 247, 0, 0.3)'
                                                    : row.estado_prod === 'Danger'
                                                    ? 'rgba(232, 0, 4, 0.3)'
                                                    : 'rgba(77, 207, 45, 0.4)'
                                        }}
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
                                                                getElementFromRingGroup(row.nom_prod);
                                                                handleShowIngresarProdModal();
                                                            }}
                                                        >
                                                            <Edit />
                                                        </IconButton>
                                                    ) : column.id === 'aggrRow' ? (
                                                        <IconButton
                                                            onClick={() => {
                                                                getElementFromRingGroup(row.nom_prod);
                                                                handleShowIngresarProdModal();
                                                            }}
                                                        >
                                                            <AddBox />
                                                        </IconButton>
                                                    ) : column.id === 'deleteRow' ? (
                                                        <IconButton
                                                            onClick={() => {
                                                                getElementFromRingGroup(row.nom_prod);
                                                                handleShowSalidaProdModal();
                                                            }}
                                                        >
                                                            <IndeterminateCheckBox />
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
                {resultItemRingGroup.nom_prod != undefined ? (
                    <IngresarProdModal
                        openModalRingGroupEdit={openModalRingGroupEdit}
                        openBackdropRingGroupEdit={openBackdropRingGroupEdit}
                        openSnackbarRingGroupEdit={openSnackbarRingGroupEdit}
                        resultItemRingGroup={resultItemRingGroup}
                    />
                ) : null}
                {resultItemRingGroup.nom_prod != undefined ? (
                    <SalidaProdModal
                        openModalRingGroupDelete={openModalRingGroupDelete}
                        openBackdropRingGroupDelete={openBackdropRingGroupDelete}
                        openSnackbarRingGroupDelete={openSnackbarRingGroupDelete}
                        resultItemRingGroup={resultItemRingGroup}
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
    );
};

ListInformationRingGroup.propTypes = {
    rows: PropTypes.array
};

export default ListInformationRingGroup;
