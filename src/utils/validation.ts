import { DataPoint } from '../types';

export const validateExcelData = (data: any[]): DataPoint[] => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Invalid Excel data: File must contain at least one row of data');
  }

  if (!Object.keys(data[0]).length) {
    throw new Error('Invalid Excel data: No columns found in the data');
  }

  return data as DataPoint[];
};

export const validateColumnData = (values: any[]): any[] => {
  if (!Array.isArray(values)) {
    throw new Error('Invalid column data: Expected an array');
  }
  
  return values.filter(v => v !== null && v !== undefined && v !== '');
};