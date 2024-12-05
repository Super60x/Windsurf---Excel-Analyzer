import { AnalysisResult } from '../../types';

export const createBoxPlot = (values: any[], column: string): AnalysisResult => ({
  type: 'box',
  title: `Box Plot of ${column}`,
  data: [{
    type: 'box',
    y: values,
    name: column
  }],
  layout: {
    title: `Box Plot of ${column}`,
    yaxis: { title: column }
  },
  description: `Box plot showing the distribution and potential outliers in ${column}.`
});