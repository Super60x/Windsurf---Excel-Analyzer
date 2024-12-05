import { AnalysisResult } from '../../types';
import { groupBy, orderBy } from 'lodash';

export const createBarChart = (values: any[], column: string): AnalysisResult => {
  const grouped = groupBy(values);
  const data = orderBy(
    Object.entries(grouped).map(([name, items]) => ({
      name,
      count: items.length
    })),
    'count',
    'desc'
  ).slice(0, 10);

  return {
    type: 'bar',
    title: `Top Categories in ${column}`,
    data: [{
      type: 'bar',
      x: data.map(d => d.name),
      y: data.map(d => d.count),
      name: column
    }],
    layout: {
      title: `Top Categories in ${column}`,
      xaxis: { title: 'Category' },
      yaxis: { title: 'Count' }
    },
    description: `Bar chart showing the distribution of top categories in ${column}.`
  };
};