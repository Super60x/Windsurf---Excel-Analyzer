import { AnalysisResult } from '../../types';

export const createScatterPlot = (
  xValues: number[], 
  yValues: number[], 
  xColumn: string, 
  yColumn: string
): AnalysisResult => ({
  type: 'scatter',
  title: `${xColumn} vs ${yColumn}`,
  data: [{
    type: 'scatter',
    mode: 'markers',
    x: xValues,
    y: yValues,
    name: 'Data Points'
  }],
  layout: {
    title: `${xColumn} vs ${yColumn}`,
    xaxis: { title: xColumn },
    yaxis: { title: yColumn }
  },
  description: `Scatter plot showing the relationship between ${xColumn} and ${yColumn}.`
});