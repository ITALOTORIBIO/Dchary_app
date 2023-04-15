import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    FormControlLabel,
    IconButton,
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
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { callToBlackList, callToEditBlackListItem, callToElementBlackList } from 'services/apis';
import { modalOpenBlackListDelete } from 'store/modal';
import { modalOpenBlackListEdit } from 'store/modal';
import DeleteBlackListModal from '../delete-black-list-modal/DeleteBlackListModal';
import EditBlackListModal from '../edit-black-list-modal/EditBlackListModal';
import { getBlackList } from 'store/filters';

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
        align: 'center'
    },
    {
        id: 'num_tlf',
        label: 'Número',
        type: 'text',
        align: 'center'
    },
    {
        id: 'description',
        label: 'Descripción',
        type: 'text',
        align: 'center'
    },
    {
        id: 'status',
        label: 'Estado',
        type: 'button',
        align: 'center'
    },
    {
        id: 'editRow',
        label: 'Editar',
        type: 'button',
        align: 'center'
    },
    {
        id: 'deleteRow',
        label: 'Eliminar',
        type: 'button',
        align: 'center'
    }
];

const ListInformationBlackList = ({ rows }) => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [resultItemBlackList, setResultItemBlackList] = useState({});
    const { openModalBlackListEdit, openBackdropBlackListEdit, openSnackbarBlackListEdit } = useSelector(
        (state) => state.modalEditBlackList
    );
    const { openModalBlackListDelete, openBackdropBlackListDelete, openSnackbarBlackListDelete } = useSelector(
        (state) => state.modalDeleteBlackList
    );
    const dispatch = useDispatch();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getElementFromBlackList = async (number) => {
        const response = await callToElementBlackList(number);
        setResultItemBlackList(response.data);
    };

    const handleShowEditBlackListModal = () => {
        dispatch(modalOpenBlackListEdit(!openModalBlackListEdit));
    };

    const handleShowDeleteConfirmationModal = () => {
        dispatch(modalOpenBlackListDelete(!openModalBlackListDelete));
    };

    const getDataBlackList = async () => {
        const result = await callToBlackList();
        if (result.ok) dispatch(getBlackList(result.data));
        else dispatch(getBlackList([]));
    };

    const handleChangeStatus = async (num_tlf, value) => {
        const data = {
            num_tlf: num_tlf,
            status: !value
        };
        const result = await callToEditBlackListItem(num_tlf, data);
        if (result.isCreated) {
            console.log(result);
            getDataBlackList();
        } else {
            console.log(result.message.name);
        }
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
                                        key={`${row.num_tlf} - ${row.type_call}`}
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
                                                                getElementFromBlackList(row.num_tlf);
                                                                handleShowEditBlackListModal();
                                                            }}
                                                        >
                                                            <Edit />
                                                        </IconButton>
                                                    ) : column.id === 'deleteRow' ? (
                                                        <IconButton
                                                            onClick={() => {
                                                                getElementFromBlackList(row.num_tlf);
                                                                handleShowDeleteConfirmationModal();
                                                            }}
                                                        >
                                                            <Delete />
                                                        </IconButton>
                                                    ) : column.id === 'status' ? (
                                                        <FormControlLabel
                                                            control={
                                                                <StateSwitch
                                                                    checked={value}
                                                                    onChange={() => {
                                                                        handleChangeStatus(row.num_tlf, value);
                                                                    }}
                                                                />
                                                            }
                                                        />
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
                {resultItemBlackList.num_tlf != undefined ? (
                    <EditBlackListModal
                        openModalBlackListEdit={openModalBlackListEdit}
                        openBackdropBlackListEdit={openBackdropBlackListEdit}
                        openSnackbarBlackListEdit={openSnackbarBlackListEdit}
                        resultItemBlackList={resultItemBlackList}
                    />
                ) : null}
                {resultItemBlackList.num_tlf != undefined ? (
                    <DeleteBlackListModal
                        openModalBlackListDelete={openModalBlackListDelete}
                        openBackdropBlackListDelete={openBackdropBlackListDelete}
                        openSnackbarBlackListDelete={openSnackbarBlackListDelete}
                        resultItemBlackList={resultItemBlackList}
                    />
                ) : null}
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

ListInformationBlackList.propTypes = {
    rows: PropTypes.array
};

export default ListInformationBlackList;
