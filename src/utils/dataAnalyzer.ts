import { DataPoint, AnalysisResult, DataSummary } from '../types';
import { inferColumnType } from './typeInference';
import { summarizeColumn } from './statistics';
import { createHistogram } from './charts/histogram';
import { createBoxPlot } from './charts/boxPlot';
import { createScatterPlot } from './charts/scatterPlot';
import { createPieChart } from './charts/pieChart';
import { createBarChart } from './charts/barChart';
import { createCorrelationHeatmap } from './charts/heatmap';
import { median } from './mathUtils';

export const analyzeData = (data: DataPoint[]): { analyses: AnalysisResult[], summary: DataSummary[] } => {
  if (!data.length) return { analyses: [], summary: [] };

  const columns = Object.keys(data[0]);
  const analyses: AnalysisResult[] = [];
  const summary: DataSummary[] = [];

  // Analyze each column
  columns.forEach(column => {
    const values = data.map(row => row[column]);
    const columnType = inferColumnType(values);
    
    const columnSummary = summarizeColumn(column, values, columnType);
    summary.push(columnSummary);

    // Generate appropriate visualizations based on column type
    if (columnType === 'numeric') {
      analyses.push(createHistogram(values, column));
      analyses.push(createBoxPlot(values, column));

      // Find correlations with other numeric columns
      const otherNumericColumns = columns.filter(col => 
        col !== column && inferColumnType(data.map(row => row[col])) === 'numeric'
      );

      otherNumericColumns.forEach(otherColumn => {
        analyses.push(createScatterPlot(
          data.map(row => row[column] as number),
          data.map(row => row[otherColumn] as number),
          column,
          otherColumn
        ));
      });
    } else if (columnType === 'categorical') {
      analyses.push(createPieChart(values, column));
      analyses.push(createBarChart(values, column));
    }
  });

  // Create heatmap for numeric column correlations
  const numericColumns = columns.filter(col => 
    inferColumnType(data.map(row => row[col])) === 'numeric'
  );
  
  if (numericColumns.length > 1) {
    analyses.push(createCorrelationHeatmap(data, numericColumns));
  }

  return { analyses, summary };
};