import { AnalysisResult } from '../../types';
import { groupBy } from 'lodash';

export const createPieChart = (values: any[], column: string): AnalysisResult => {
  const grouped = groupBy(values);
  const data = Object.entries(grouped).map(([name, items]) => ({
    name,
    value: items.length
  }));

  return {
    type: 'pie',
    title: `Distribution of ${column}`,
    data: [{
      type: 'pie',
      labels: data.map(d => d.name),
      values: data.map(d => d.value),
      hole: 0.4
    }],
    layout: {
      title: `Distribution of ${column}`
    },
    description: `Pie chart showing the distribution of categories in ${column}.`
  };
};