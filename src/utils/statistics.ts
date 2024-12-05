import { mean, uniq, groupBy } from 'lodash';
import { median, std } from './mathUtils';
import { DataSummary } from '../types';

export const calculateCorrelation = (x: number[], y: number[]): number => {
  const xMean = mean(x);
  const yMean = mean(y);
  const n = x.length;
  
  if (!xMean || !yMean || n === 0) return 0;
  
  let numerator = 0;
  let xDenominator = 0;
  let yDenominator = 0;
  
  for (let i = 0; i < n; i++) {
    const xDiff = x[i] - xMean;
    const yDiff = y[i] - yMean;
    numerator += xDiff * yDiff;
    xDenominator += xDiff * xDiff;
    yDenominator += yDiff * yDiff;
  }
  
  const denominator = Math.sqrt(xDenominator * yDenominator);
  return denominator === 0 ? 0 : numerator / denominator;
};

export const summarizeColumn = (
  columnName: string, 
  values: any[], 
  type: 'numeric' | 'categorical' | 'datetime'
): DataSummary => {
  const filteredValues = values.filter(v => v !== null && v !== undefined);
  
  const summary: DataSummary = {
    columnName,
    type,
    summary: {
      count: filteredValues.length,
      uniqueValues: uniq(filteredValues).length
    }
  };

  if (type === 'numeric') {
    const numericValues = filteredValues
      .map(v => typeof v === 'string' ? parseFloat(v) : v)
      .filter(v => !isNaN(v)) as number[];
      
    if (numericValues.length > 0) {
      summary.summary = {
        ...summary.summary,
        mean: mean(numericValues),
        median: median(numericValues),
        std: std(numericValues),
        min: Math.min(...numericValues),
        max: Math.max(...numericValues)
      };
    }
  } else if (type === 'categorical') {
    const grouped = groupBy(filteredValues);
    const topCategories = Object.entries(grouped)
      .map(([value, items]) => ({ value, count: items.length }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    summary.summary.topCategories = topCategories;
  }

  return summary;
};