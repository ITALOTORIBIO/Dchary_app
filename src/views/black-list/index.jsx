import { alpha, Box, Button, Grid, MenuItem, styled, TextField, useTheme, Typography, Menu } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Add, KeyboardDoubleArrowDown, KeyboardDoubleArrowUp, KeyboardReturn, Search } from '@mui/icons-material';
import ListInformationBlackList from './list-information-black-list/ListInformationBlackList';
import AddBlackListModal from './add-black-list-modal/AddBlackListModal';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpenBlackList } from 'store/modal';
import { modalOpenPreviewImportExcelBlackList } from 'store/modal';
import PreviewImportExcelBlackListModal from './preview-import-excel-blacklist-modal/PreviewImportExcelBlackListModal';
import { useState, useEffect } from 'react';
import { filterBlackList, getBlackList } from 'store/filters';
import { callToBlackList } from 'services/apis';
import { setNombre, setCorreo, setRol, setUsername, setPassword } from 'store/black-list';
import { useCallback } from 'react';

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

const callTypes = ['Todos', 'Entrantes', 'Salientes'];
const statePhoneNumber = ['Activo', 'Inactivo'];

const BlackList = () => {
    const theme = useTheme();
    const [stateNumber, setStateNumber] = useState('');
    const [callType, setCallType] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
    const { open, openBackdropBlackList, openSnackbarBlackList } = useSelector((state) => state.modalBlackList);
    const { listBlackList, filteredBlackList } = useSelector((state) => state.filterBlackList);
    const [anchorElExport, setAnchorElExport] = useState(null);
    const [anchorElImport, setAnchorElImport] = useState(null);
    const openExportMenu = Boolean(anchorElExport);
    const openImportMenu = Boolean(anchorElImport);
    const [dataImportExcelBlackList, setDataImportExcelBlackList] = useState({});
    const { openModalPreviewImportExcelBlackList, openBackdropPreviewImportExcelBlackList, openSnackbarPreviewImportExcelBlackList } =
        useSelector((state) => state.modalPreviewImportExcelBlackList);
    const dispatch = useDispatch();

    const handleShowAddBlackListModal = () => dispatch(modalOpenBlackList(!open));

    useEffect(() => {
        dispatch(setNombre(''));
        dispatch(setCorreo(''));
        dispatch(setRol(''));
        dispatch(setUsername(''));
        dispatch(setPassword(''));
    }, [open]);

    const handleChangePhoneNumber = (event) => {
        setNumberPhone(event.target.value);
    };
    const handleChangeCallType = (event) => {
        setCallType(event.target.value);
    };
    const handleChangeStateNumber = (event) => {
        setStateNumber(event.target.value);
    };

    const handleClickSearchBlackList = (event) => {
        dispatch(filterBlackList(listBlackList, numberPhone, callType, stateNumber));
    };

    const handleClickCleanUp = () => {
        setNumberPhone('');
        setCallType('');
        setStateNumber('');
        dispatch(getBlackList(listBlackList));
    };

    const getDataListBlackList = async () => {
        const result = await callToBlackList();
        if (result.ok) dispatch(getBlackList(result.data));
        else dispatch(getBlackList([]));
    };

    useEffect(() => {
        getDataListBlackList();
    }, []);

    const handleClickExportOptions = (event) => setAnchorElExport(event.currentTarget);
    const handleClickImportOptions = (event) => setAnchorElImport(event.currentTarget);

    const handleCloseExportOptions = () => setAnchorElExport(null);
    const handleCloseImportOptions = () => setAnchorElImport(null);

    const handleExportToPDF = useCallback(() => {
        const docPDF = new jsPDF();
        docPDF.text('Lista de Negra', 80, 20);
        docPDF.autoTable({
            columns: [
                { header: 'Tipo de llamada', dataKey: 'type_call' },
                { header: 'Número', dataKey: 'num_tlf' },
                { header: 'Descripción', dataKey: 'description' },
                { header: 'Estado', dataKey: 'status' }
            ],
            body: filteredBlackList,
            margin: { top: 30 }
        });
        docPDF.save('Lista-BlackList.pdf');
        setAnchorElExport(null);
    }, [filteredBlackList]);

    const handleExportToExcel = useCallback(() => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(filteredBlackList);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de Negra');
        XLSX.writeFile(workbook, 'Lista-BlackList.xlsx');
        setAnchorElExport(null);
    }, [filteredBlackList]);

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
                console.log(data);
                setDataImportExcelBlackList(data);
                handleShowPreviewImportExcelModal();
            };
            if (file) {
                if (getExtensionFile(file)) reader.readAsBinaryString(file);
                else alert('Archivo de entrada inválido. Seleccione un archivo Excel.');
            }
            setAnchorElImport(null);
        },
        [listBlackList, dispatch]
    );

    const handleShowPreviewImportExcelModal = () => {
        dispatch(modalOpenPreviewImportExcelBlackList(!openModalPreviewImportExcelBlackList));
    };

    const handleDownloadFileExcel = useCallback(() => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet([{ type_call: '', num_tlf: '', description: '', status: '' }]);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista_BlackList');
        XLSX.writeFile(workbook, 'Lista-BlackList-Plantilla.xlsx');
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
                                    <Typography variant="h4">Lista de Usarios</Typography>
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
                                            onClick={handleShowAddBlackListModal}
                                        >
                                            Añadir Usuario
                                        </Button>
                                    </Grid>
                                    {/* <Grid item>
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
                                                    Importar BlackList
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
                                                    Exportar BlackList
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
                                    </Grid> */}
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
                                                        label="Nombre de Usuario"
                                                        name="phone-number"
                                                        value={numberPhone}
                                                        type="search"
                                                        variant="standard"
                                                        onChange={handleChangePhoneNumber}
                                                    />
                                                </Box>
                                            </Grid>
                                            {/* <Grid item>
                                                <Box width={385} maxWidth="100%">
                                                    <TextField
                                                        fullWidth
                                                        select
                                                        label="Tipo de llamada"
                                                        name="call-type"
                                                        value={callType}
                                                        variant="standard"
                                                        onChange={handleChangeCallType}
                                                    >
                                                        {callTypes.map((option, index) => (
                                                            <MenuItem key={index} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <Box width={385} maxWidth="100%">
                                                    <TextField
                                                        fullWidth
                                                        label="Estado"
                                                        select
                                                        name="state-number"
                                                        value={stateNumber}
                                                        variant="standard"
                                                        onChange={handleChangeStateNumber}
                                                    >
                                                        {statePhoneNumber.map((option, index) => (
                                                            <MenuItem key={index} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Box>
                                            </Grid> */}
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
                                            onClick={handleClickSearchBlackList}
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
                        <ListInformationBlackList rows={filteredBlackList} />
                    </MainCard>
                </Grid>
            </Grid>
            <AddBlackListModal open={open} openBackdropBlackList={openBackdropBlackList} openSnackbarBlackList={openSnackbarBlackList} />
            {Object.keys(dataImportExcelBlackList).length != 0 ? (
                <PreviewImportExcelBlackListModal
                    openModalPreviewImportExcelBlackList={openModalPreviewImportExcelBlackList}
                    openBackdropPreviewImportExcelBlackList={openBackdropPreviewImportExcelBlackList}
                    openSnackbarPreviewImportExcelBlackList={openSnackbarPreviewImportExcelBlackList}
                    dataImportExcelBlackList={dataImportExcelBlackList}
                />
            ) : null}
        </>
    );
};

export default BlackList;
