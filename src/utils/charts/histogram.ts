import { AnalysisResult } from '../../types';

export const createHistogram = (values: any[], column: string): AnalysisResult => ({
  type: 'histogram',
  title: `Distribution of ${column}`,
  data: [{
    type: 'histogram',
    x: values,
    nbinsx: 30,
    name: column
  }],
  layout: {
    title: `Distribution of ${column}`,
    xaxis: { title: column },
    yaxis: { title: 'Count' }
  },
  description: `Distribution analysis of ${column} showing the frequency of different value ranges.`
});