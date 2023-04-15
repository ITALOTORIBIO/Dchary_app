import { useState, useEffect, useCallback } from 'react';

// material-ui
import { alpha, Box, Button, Grid, Menu, styled, TextField, Typography, useTheme } from '@mui/material';
import { Add, KeyboardReturn, KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material';

// project imports
import { gridSpacing } from 'store/constant';
import ListInformationAnnex from './list-information-annex/ListInformationAnnex';
import MainCard from 'ui-component/cards/MainCard';
import AddAnnexModal from './add-annex-modal/AddAnnexModal';
import PreviewImportExcelAnnexModal from './preview-import-excel-annex-modal/PreviewImportExcelAnnexModal';
import {
    setCallGroup,
    setDHCP,
    setOpenVPN,
    setPickGroup,
    setRecord,
    setTLS,
    setInputValue,
    setBrand,
    setCheckVLAN,
    setMac,
    setModel,
    setVLAN
} from 'store/annex';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { modalOpenAnnex } from 'store/modal';
import { modalOpenPreviewImportExcelAnnex } from 'store/modal';

// react icons
import { RiFileExcel2Line } from 'react-icons/ri';
import { BsFileEarmarkPdfFill, BsFileEarmarkArrowDownFill } from 'react-icons/bs';

// api service
import { callToAnnexList } from 'services/apis';

// excel export
import * as XLSX from 'xlsx';
import { filterListAnnexCallerID, filterListAnnexSIP, getListAnnexSIP } from 'store/filters';

// pdf export
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { generateRandomString } from 'utils/functions';

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

const AnnexSIP = () => {
    const theme = useTheme();
    const [sip, setSip] = useState('');
    const [anchorElExport, setAnchorElExport] = useState(null);
    const [anchorElImport, setAnchorElImport] = useState(null);
    const openExportMenu = Boolean(anchorElExport);
    const openImportMenu = Boolean(anchorElImport);
    const [callerId, setCallerId] = useState('');
    const { openModal, openBackdrop, openSnackbar } = useSelector((state) => state.modalAnnex);
    const { openModalPreviewImportExcelAnnex, openBackdropPreviewImportExcelAnnex, openSnackbarPreviewImportExcelAnnex } = useSelector(
        (state) => state.modalPreviewImportExcelAnnex
    );
    const { listAnnexSIP, filteredListAnnexSIP } = useSelector((state) => state.filterAnnexSip);
    const [dataImportExcelAnnex, setDataImportExcelAnnex] = useState({});
    const dispatch = useDispatch();

    const getDataListAnnex = async () => {
        const result = await callToAnnexList();
        if (result.ok) dispatch(getListAnnexSIP(result.data));
        else dispatch(getListAnnexSIP([]));
    };

    const handleShowAddAnnexModal = () => {
        dispatch(modalOpenAnnex(!openModal));
    };

    useEffect(() => {
        dispatch(setInputValue('extension', ''));
        dispatch(setInputValue('key', generateRandomString()));
        dispatch(setInputValue('callerID', ''));
        dispatch(setInputValue('voiceMail', ''));
        dispatch(setInputValue('context', 'from-internal'));
        dispatch(setCallGroup(''));
        dispatch(setDHCP('dynamic'));
        dispatch(setOpenVPN(false));
        dispatch(setPickGroup(''));
        dispatch(setRecord('Ninguna'));
        dispatch(setTLS(false));
        dispatch(setBrand(''));
        dispatch(setCheckVLAN(false));
        dispatch(setMac(''));
        dispatch(setModel(''));
        dispatch(setVLAN(''));
    }, [openModal]);

    const handleChangeSIP = (event) => {
        setSip(event.target.value);
        dispatch(filterListAnnexSIP(listAnnexSIP, event.target.value));
    };

    const handleChangeCallerID = (event) => {
        setCallerId(event.target.value);
        dispatch(filterListAnnexCallerID(listAnnexSIP, event.target.value));
    };

    const handleClickCleanUp = () => {
        setSip('');
        setCallerId('');
        dispatch(getListAnnexSIP(listAnnexSIP));
    };

    const handleClickExportOptions = (event) => setAnchorElExport(event.currentTarget);
    const handleClickImportOptions = (event) => setAnchorElImport(event.currentTarget);

    const handleCloseExportOptions = () => setAnchorElExport(null);
    const handleCloseImportOptions = () => setAnchorElImport(null);

    const handleExportToPDF = useCallback(() => {
        const docPDF = new jsPDF();
        docPDF.text('Lista de Anexos SIP', 80, 20);
        docPDF.autoTable({
            columns: [
                { header: 'SIP', dataKey: 'name' },
                { header: 'Caller ID', dataKey: 'callerid' },
                { header: 'Contexto', dataKey: 'context' },
                { header: 'Equipo', dataKey: 'equipo' },
                { header: 'Open VPN', dataKey: 'open-vpn' }
            ],
            body: filteredListAnnexSIP,
            margin: { top: 30 }
        });
        docPDF.save('Lista-Anexos-SIP.pdf');
        setAnchorElExport(null);
    }, [filteredListAnnexSIP]);

    const handleExportToExcel = useCallback(() => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(filteredListAnnexSIP);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista_Anexos_SIP');
        XLSX.writeFile(workbook, 'Lista-Anexos-SIP.xlsx');
        setAnchorElExport(null);
    }, [filteredListAnnexSIP]);

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
                setDataImportExcelAnnex(data);
                handleShowPreviewImportExcelModal();
                //dispatch(getListAnnexSIP(listAnnexSIP.concat(data)));
            };
            if (file) {
                if (getExtensionFile(file)) reader.readAsBinaryString(file);
                else alert('Archivo de entrada inválido. Seleccione un archivo Excel.');
            }
            setAnchorElImport(null);
        },
        [listAnnexSIP, dispatch]
    );

    const handleShowPreviewImportExcelModal = () => {
        dispatch(modalOpenPreviewImportExcelAnnex(!openModalPreviewImportExcelAnnex));
    };

    const handleDownloadFileExcel = useCallback(() => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet([{ name: '', callerid: '', context: '', equipo: '' }]);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista_Anexos_SIP');
        XLSX.writeFile(workbook, 'Lista-Anexos-SIP-Plantilla.xlsx');
        setAnchorElImport(null);
    }, []);

    useEffect(() => {
        getDataListAnnex();
    }, []);

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item width="100%">
                    <MainCard>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Typography variant="h4">Lista de Anexos SIP</Typography>
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
                                            onClick={handleShowAddAnnexModal}
                                        >
                                            Añadir Anexo
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
                                                    Importar Anexos SIP
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
                                                    Exportar Anexos SIP
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
                                                        label="SIP"
                                                        name="sip"
                                                        value={sip}
                                                        type="search"
                                                        variant="standard"
                                                        onChange={handleChangeSIP}
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <Box width={385} maxWidth="100%">
                                                    <TextField
                                                        fullWidth
                                                        label="Caller ID"
                                                        name="callerId"
                                                        value={callerId}
                                                        type="search"
                                                        variant="standard"
                                                        onChange={handleChangeCallerID}
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
                        <ListInformationAnnex rows={filteredListAnnexSIP} />
                    </MainCard>
                </Grid>
            </Grid>
            <AddAnnexModal openModal={openModal} openBackdrop={openBackdrop} openSnackbar={openSnackbar} />
            {Object.keys(dataImportExcelAnnex).length != 0 ? (
                <PreviewImportExcelAnnexModal
                    openModalPreviewImportExcelAnnex={openModalPreviewImportExcelAnnex}
                    openBackdropPreviewImportExcelAnnex={openBackdropPreviewImportExcelAnnex}
                    openSnackbarPreviewImportExcelAnnex={openSnackbarPreviewImportExcelAnnex}
                    dataImportExcelAnnex={dataImportExcelAnnex}
                />
            ) : null}
        </>
    );
};

export default AnnexSIP;
