import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { alpha, Box, Button, Grid, TextField, styled, Typography, useTheme, Menu } from '@mui/material';
import { Add, KeyboardDoubleArrowDown, KeyboardDoubleArrowUp, KeyboardReturn, Search } from '@mui/icons-material';

// project imports
import { gridSpacing } from 'store/constant';
import ListInformationConferences from './list-information-conferences/ListInformationConferences';
import MainCard from 'ui-component/cards/MainCard';
import AddConferencesModal from './add-conferences-modal/AddConferencesModal';
import { modalOpenRingGroup } from 'store/modal';
import { modalOpenPreviewImportExcelRingGroup } from 'store/modal';
import { filterConferences, getConferences } from 'store/filters';
import { setNombreProducto, setCantidadMinProducto, setPrecioProducto, setCantidadProducto, setUnidadProducto } from 'store/ring-group';
import { useCallback } from 'react';
import { callToRingGroupList } from 'services/apis';

// excel export

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0'
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5)
            },
            '&:active': {
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
            }
        }
    }
}));

const Conferencias = () => {
    const theme = useTheme();
    const { open, openBackdropRingGroup, openSnackbarRingGroup } = useSelector((state) => state.modalRingGroup);
    const { listConferences, filteredConferences } = useSelector((state) => state.filterConferences);
    const [nomProd, setNomProd] = useState('');
    const [statusClose, setStatusClose] = useState(true);
    const dispatch = useDispatch();

    const handleShowAddRingGroupModal = () => {
        dispatch(modalOpenRingGroup(!open));
        setStatusClose(false);
    };

    useEffect(() => {
        dispatch(setNombreProducto(''));
        dispatch(setPrecioProducto(''));
        dispatch(setCantidadMinProducto(''));
        dispatch(setCantidadProducto(''));
        dispatch(setUnidadProducto(''));
    }, [open]);

    const handleChangenomProd = (event) => setNomProd(event.target.value);

    const handleClickSearchRingGroup = (event) => {
        dispatch(filterConferences(listConferences, nomProd));
    };

    const handleClickCleanUp = () => {
        setNomProd('');
        dispatch(getConferences(listConferences));
    };

    const getDataListRingGroup = async () => {
        const result = await callToRingGroupList();
        if (result.ok) dispatch(getConferences(result.data));
        else dispatch(getConferences([]));
    };

    useEffect(() => {
        getDataListRingGroup();
    }, []);

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item width="100%">
                    <MainCard>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Typography variant="h4">Lista de Productos</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Button
                                            sx={{
                                                textTransform: 'uppercase',
                                                paddingX: '1.25rem',
                                                paddingY: '0.5rem'
                                            }}
                                            variant="contained"
                                            endIcon={<Add />}
                                            onClick={handleShowAddRingGroupModal}
                                        >
                                            Nuevo Producto
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing} alignItems="center">
                                    <Grid item>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item>
                                                <Box width={385} maxWidth="100%">
                                                    <TextField
                                                        fullWidth
                                                        label="Nombre de producto"
                                                        name="nomProd"
                                                        value={nomProd}
                                                        type="search"
                                                        variant="standard"
                                                        onChange={handleChangenomProd}
                                                    />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            sx={{
                                                textTransform: 'uppercase',
                                                paddingX: '1.25rem',
                                                paddingY: '0.5rem'
                                            }}
                                            variant="contained"
                                            endIcon={<Search />}
                                            onClick={handleClickSearchRingGroup}
                                        >
                                            Buscar
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            sx={{
                                                textTransform: 'uppercase',
                                                paddingX: '1.25rem',
                                                paddingY: '0.5rem'
                                            }}
                                            variant="contained"
                                            endIcon={<KeyboardReturn />}
                                            onClick={handleClickCleanUp}
                                        >
                                            Limpiar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
                <Grid item width="100%">
                    <MainCard>
                        <ListInformationConferences rows={filteredConferences} />
                    </MainCard>
                </Grid>
            </Grid>
            <AddConferencesModal
                open={open}
                statusClose={statusClose}
                setStatusClose={setStatusClose}
                openBackdropRingGroup={openBackdropRingGroup}
                openSnackbarRingGroup={openSnackbarRingGroup}
            />
        </>
    );
};

export default Conferencias;
