import { AnalysisResult, DataPoint } from '../../types';
import { calculateCorrelation } from '../statistics';

export const createCorrelationHeatmap = (data: DataPoint[], numericColumns: string[]): AnalysisResult => {
  const correlationMatrix = numericColumns.map(col1 => 
    numericColumns.map(col2 => {
      const x = data.map(row => row[col1] as number);
      const y = data.map(row => row[col2] as number);
      return calculateCorrelation(x, y);
    })
  );

  return {
    type: 'heatmap',
    title: 'Correlation Matrix',
    data: [{
      type: 'heatmap',
      z: correlationMatrix,
      x: numericColumns,
      y: numericColumns,
      colorscale: 'RdBu'
    }],
    layout: {
      title: 'Correlation Matrix',
      width: 800,
      height: 800
    },
    description: 'Heatmap showing correlations between numeric columns.'
  };
};