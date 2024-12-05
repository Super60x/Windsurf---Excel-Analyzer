import { read, utils } from 'xlsx';
import { AnalysisError } from './error';

export const parseExcelFile = async (file: File): Promise<any[]> => {
  if (!file.name.match(/\.(xlsx|xls)$/i)) {
    throw new AnalysisError('Invalid file format. Please upload an Excel file (.xlsx or .xls)');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          throw new AnalysisError('Failed to read file contents');
        }

        const workbook = read(data, { type: 'binary' });
        if (!workbook.SheetNames.length) {
          throw new AnalysisError('Excel file contains no sheets');
        }

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = utils.sheet_to_json(worksheet);
        
        if (!jsonData.length) {
          throw new AnalysisError('Excel file is empty');
        }

        resolve(jsonData);
      } catch (error) {
        if (error instanceof AnalysisError) {
          reject(error);
        } else {
          reject(new AnalysisError('Failed to parse Excel file'));
        }
      }
    };

    reader.onerror = () => reject(new AnalysisError('Failed to read file'));
    reader.readAsBinaryString(file);
  });
};