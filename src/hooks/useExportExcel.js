import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ExcelJS from 'exceljs';

const typeData = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64';

const useExportExcel = ({ data }) => {
    const [fileName, setFileName] = useState('');
    const [excel, setExcel] = useState('');
    const [base64Excel, setBase64Excel] = useState('');
    const [rowsData, setRowsData] = useState(data);

    const toBase64Excel = () => {
        setBase64Excel(`${typeData},${excel}`);
    };

    const getData = (data) => {
        setRowsData(data);
    };

    const addFileName = (fileName) => {
        setFileName(fileName);
    };

    const getExportData = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet();
        worksheet.columns = Object.keys(data[0]).map((key) => ({
            header: key,
            key: key
        }));
        worksheet.addRows(rowsData);
        const buffer = await workbook.xlsx.writeBuffer({
            filename: fileName
        });
        const encoded = buffer.toString('base64');
        setExcel(encoded);
    };

    return { getData, addFileName, getExportData, toBase64Excel, fileName, rowsData, excel, base64Excel };
};

useExportExcel.propTypes = {
    data: PropTypes.array
};

export default useExportExcel;
