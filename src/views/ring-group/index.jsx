import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { alpha, Box, Button, Grid, TextField, styled, Typography, useTheme, Menu } from '@mui/material';
import { Add, KeyboardDoubleArrowDown, KeyboardDoubleArrowUp, KeyboardReturn, Search } from '@mui/icons-material';

// project imports
import { gridSpacing } from 'store/constant';
import ListInformationRingGroup from './list-information-ring-group/ListInformationRingGroup';
import MainCard from 'ui-component/cards/MainCard';
import AddRingGroupModal from './add-ring-group-modal/AddRingGroupModal';
import { modalOpenRingGroup } from 'store/modal';
import { modalOpenPreviewImportExcelRingGroup } from 'store/modal';
import PreviewImportExcelRingGroupModal from './preview-import-excel-ring-group-modal/PreviewImportExcelRingGroupModal';
import { filterRingGroup, getRingGroup } from 'store/filters';
import { setNombreGrupo, setNumeroGrupo, setSelectAnexo } from 'store/ring-group';
import { useCallback } from 'react';
import { callToRingGroupList } from 'services/apis';

// react icons
import { RiFileExcel2Line } from 'react-icons/ri';
import { BsFileEarmarkPdfFill, BsFileEarmarkArrowDownFill } from 'react-icons/bs';

// excel export
import * as XLSX from 'xlsx';

// pdf export
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EXTENSIONS = ['xlsx', 'xls'];

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

const RingGroup = () => {
    const theme = useTheme();
    const { open, openBackdropRingGroup, openSnackbarRingGroup } = useSelector((state) => state.modalRingGroup);
    const { listRingGroup, filteredRingGroup } = useSelector((state) => state.filterRingGroup);
    const [anchorElExport, setAnchorElExport] = useState(null);
    const [anchorElImport, setAnchorElImport] = useState(null);
    const openExportMenu = Boolean(anchorElExport);
    const openImportMenu = Boolean(anchorElImport);
    const [dataImportExcelRingGroup, setDataImportExcelRingGroup] = useState({});
    const { openModalPreviewImportExcelRingGroup, openBackdropPreviewImportExcelRingGroup, openSnackbarPreviewImportExcelRingGroup } =
        useSelector((state) => state.modalPreviewImportExcelRingGroup);
    const [numGroup, setNumGroup] = useState('');
    const [statusClose, setStatusClose] = useState(true);
    const dispatch = useDispatch();

    const handleShowAddRingGroupModal = () => {
        dispatch(modalOpenRingGroup(!open));
        setStatusClose(false);
    };

    useEffect(() => {
        dispatch(setNombreGrupo(''));
        dispatch(setNumeroGrupo(''));
        dispatch(setSelectAnexo(''));
    }, [open]);

    const handleChangeNumGroup = (event) => setNumGroup(event.target.value);

    const handleClickSearchRingGroup = (event) => {
        dispatch(filterRingGroup(listRingGroup, numGroup));
    };

    const handleClickCleanUp = () => {
        setNumGroup('');
        dispatch(getRingGroup(listRingGroup));
    };

    const getDataListRingGroup = async () => {
        const result = await callToRingGroupList();
        if (result.ok) dispatch(getRingGroup(result.data));
        else dispatch(getRingGroup([]));
    };

    useEffect(() => {
        getDataListRingGroup();
    }, []);

    const handleClickExportOptions = (event) => setAnchorElExport(event.currentTarget);
    const handleClickImportOptions = (event) => setAnchorElImport(event.currentTarget);

    const handleCloseExportOptions = () => setAnchorElExport(null);
    const handleCloseImportOptions = () => setAnchorElImport(null);

    const handleExportToPDF = useCallback(() => {
        const docPDF = new jsPDF();
        docPDF.text('Lista RingGroup', 80, 20);
        docPDF.autoTable({
            columns: [
                { header: 'Nombre de Grupo', dataKey: 'name_group' },
                { header: 'Número de Grupo', dataKey: 'num_group' },
                { header: 'Anexos', dataKey: 'annex' },
                { header: 'Cantidad de anexos', dataKey: 'cant_annex' }
            ],
            body: filteredRingGroup,
            margin: { top: 30 }
        });
        docPDF.save('Lista-RingGroup.pdf');
        setAnchorElExport(null);
    }, [filteredRingGroup]);

    const handleExportToExcel = useCallback(() => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(filteredRingGroup);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de Ring Group');
        XLSX.writeFile(workbook, 'Lista-RingGroup.xlsx');
        setAnchorElExport(null);
    }, [filteredRingGroup]);

    const getExtensionFile = (file) => {
        const parts = file.name.split('.');
        const extension = parts[parts.length - 1];
        return EXTENSIONS.includes(extension);
    };

    const convertToJSON = (headers, data) => {
        const rows = [];
        data.map((row) => {
            let rowData = {};
            row.map((item, index) => {
                rowData[headers[index]] = item;
            });
            rows.push(rowData);
        });
        return rows;
    };

    const handleImportToExcel = useCallback(
        (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const bstr = event.target.result;
                const workbook = XLSX.read(bstr, { type: 'binary' });

                const worksheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetName];

                const fileData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                const headers = fileData[0];
                fileData.splice(0, 1);
                const data = convertToJSON(headers, fileData);
                //console.log(data);
                setDataImportExcelRingGroup(data);
                handleShowPreviewImportExcelModal();
            };
            if (file) {
                if (getExtensionFile(file)) reader.readAsBinaryString(file);
                else alert('Archivo de entrada inválido. Seleccione un archivo Excel.');
            }
            setAnchorElImport(null);
        },
        [listRingGroup, dispatch]
    );

    const handleShowPreviewImportExcelModal = () => {
        dispatch(modalOpenPreviewImportExcelRingGroup(!openModalPreviewImportExcelRingGroup));
    };

    const handleDownloadFileExcel = useCallback(() => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet([{ name_group: '', num_group: '', annex: '', cant_annex: '' }]);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista_RingGroup');
        XLSX.writeFile(workbook, 'Lista-RingGroup-Plantilla.xlsx');
        setAnchorElImport(null);
    }, []);

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item width="100%">
                    <MainCard>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Typography variant="h4">Lista Ring Groups</Typography>
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
                                            Añadir Ring Group
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item>
                                                <Button
                                                    id="import-data-button"
                                                    aria-controls={openImportMenu ? 'import-data-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={openImportMenu ? 'true' : undefined}
                                                    disableElevation
                                                    onClick={handleClickImportOptions}
                                                    sx={{
                                                        textTransform: 'uppercase',
                                                        paddingX: '1.25rem',
                                                        paddingY: '0.5rem'
                                                    }}
                                                    variant="outlined"
                                                    endIcon={!openImportMenu ? <KeyboardDoubleArrowDown /> : <KeyboardDoubleArrowUp />}
                                                >
                                                    Importar Ring Group
                                                </Button>
                                                <StyledMenu
                                                    id="import-data-menu"
                                                    MenuListProps={{
                                                        'aria-labelledby': 'import-data-button'
                                                    }}
                                                    anchorEl={anchorElImport}
                                                    open={openImportMenu}
                                                    onClose={handleCloseImportOptions}
                                                >
                                                    <Grid container direction="column">
                                                        <Grid item xs={12}>
                                                            <Button
                                                                onClick={handleDownloadFileExcel}
                                                                sx={{
                                                                    textTransform: 'uppercase',
                                                                    paddingX: '1.25rem',
                                                                    paddingY: '0.5rem',
                                                                    width: '100%'
                                                                }}
                                                                endIcon={<BsFileEarmarkArrowDownFill />}
                                                            >
                                                                Descargar Plantilla
                                                            </Button>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Button
                                                                onChange={handleImportToExcel}
                                                                component="label"
                                                                sx={{
                                                                    textTransform: 'uppercase',
                                                                    paddingX: '1.25rem',
                                                                    paddingY: '0.5rem',
                                                                    width: '100%',
                                                                    color: theme.palette.success.main
                                                                }}
                                                                endIcon={<RiFileExcel2Line />}
                                                            >
                                                                <input hidden type="file" />
                                                                Importar Excel
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </StyledMenu>
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    id="export-data-button"
                                                    aria-controls={openExportMenu ? 'export-data-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={openExportMenu ? 'true' : undefined}
                                                    disableElevation
                                                    onClick={handleClickExportOptions}
                                                    sx={{
                                                        textTransform: 'uppercase',
                                                        paddingX: '1.25rem',
                                                        paddingY: '0.5rem'
                                                    }}
                                                    variant="outlined"
                                                    endIcon={!openExportMenu ? <KeyboardDoubleArrowDown /> : <KeyboardDoubleArrowUp />}
                                                >
                                                    Exportar Ring Group
                                                </Button>
                                                <StyledMenu
                                                    id="export-data-menu"
                                                    MenuListProps={{
                                                        'aria-labelledby': 'export-data-button'
                                                    }}
                                                    anchorEl={anchorElExport}
                                                    open={openExportMenu}
                                                    onClose={handleCloseExportOptions}
                                                >
                                                    <Grid container direction="column">
                                                        <Grid item xs={12}>
                                                            <Button
                                                                onClick={handleExportToExcel}
                                                                sx={{
                                                                    textTransform: 'uppercase',
                                                                    paddingX: '2.5rem',
                                                                    paddingY: '0.5rem',
                                                                    width: '100%',
                                                                    color: theme.palette.success.main
                                                                }}
                                                                endIcon={<RiFileExcel2Line />}
                                                            >
                                                                Exportar Excel
                                                            </Button>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Button
                                                                onClick={handleExportToPDF}
                                                                sx={{
                                                                    textTransform: 'uppercase',
                                                                    paddingX: '2.5rem',
                                                                    paddingY: '0.5rem',
                                                                    width: '100%',
                                                                    color: theme.palette.error.main
                                                                }}
                                                                endIcon={<BsFileEarmarkPdfFill />}
                                                            >
                                                                Exportar PDF
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </StyledMenu>
                                            </Grid>
                                        </Grid>
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
                                                        label="Número de grupo"
                                                        name="numGroup"
                                                        value={numGroup}
                                                        type="search"
                                                        variant="standard"
                                                        onChange={handleChangeNumGroup}
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
                        <ListInformationRingGroup rows={filteredRingGroup} />
                    </MainCard>
                </Grid>
            </Grid>
            <AddRingGroupModal
                open={open}
                statusClose={statusClose}
                setStatusClose={setStatusClose}
                openBackdropRingGroup={openBackdropRingGroup}
                openSnackbarRingGroup={openSnackbarRingGroup}
            />
            {Object.keys(dataImportExcelRingGroup).length != 0 ? (
                <PreviewImportExcelRingGroupModal
                    openModalPreviewImportExcelRingGroup={openModalPreviewImportExcelRingGroup}
                    openBackdropPreviewImportExcelRingGroup={openBackdropPreviewImportExcelRingGroup}
                    openSnackbarPreviewImportExcelRingGroup={openSnackbarPreviewImportExcelRingGroup}
                    dataImportExcelRingGroup={dataImportExcelRingGroup}
                />
            ) : null}
        </>
    );
};

export default RingGroup;
