import React from 'react';
import Plot from 'react-plotly.js';
import { AnalysisResult, DataSummary } from '../types';
import { clsx } from 'clsx';

interface DataVisualizerProps {
  analyses: AnalysisResult[];
  summary: DataSummary[];
}

export const DataVisualizer: React.FC<DataVisualizerProps> = ({ analyses, summary }) => {
  return (
    <div className="space-y-8">
      {/* Data Summary Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Data Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {summary.map((col, index) => (
            <div 
              key={index} 
              className={clsx(
                "border rounded-lg p-4",
                "hover:shadow-md transition-shadow duration-200"
              )}
            >
              <h4 className="font-medium text-lg mb-2">{col.columnName}</h4>
              <p className={clsx(
                "text-sm mb-1",
                "px-2 py-1 rounded-full inline-block",
                {
                  'bg-blue-100 text-blue-800': col.type === 'numeric',
                  'bg-green-100 text-green-800': col.type === 'categorical',
                  'bg-purple-100 text-purple-800': col.type === 'datetime'
                }
              )}>
                {col.type}
              </p>
              <div className="space-y-1 mt-3">
                {Object.entries(col.summary).map(([key, value]) => {
                  if (key === 'topCategories') {
                    return (
                      <div key={key} className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Top Categories:</p>
                        <ul className="text-sm text-gray-600 space-y-1 mt-1">
                          {value?.map((cat: any, i: number) => (
                            <li key={i} className="flex justify-between">
                              <span className="truncate">{cat.value}</span>
                              <span className="ml-2 text-gray-500">{cat.count}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return (
                    <p key={key} className="text-sm flex justify-between">
                      <span className="text-gray-600 capitalize">{key}:</span>
                      <span className="font-medium">
                        {typeof value === 'number' ? value.toFixed(2) : value}
                      </span>
                    </p>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visualizations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {analyses.map((analysis, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <h3 className="text-lg font-semibold mb-4">{analysis.title}</h3>
            <Plot
              data={analysis.data}
              layout={{
                ...analysis.layout,
                width: undefined,
                height: 400,
                margin: { t: 30, r: 30, b: 50, l: 50 },
                autosize: true,
                paper_bgcolor: 'transparent',
                plot_bgcolor: 'transparent',
                font: {
                  family: 'Inter, system-ui, sans-serif'
                }
              }}
              className="w-full"
              useResizeHandler={true}
              config={{
                responsive: true,
                displayModeBar: true,
                displaylogo: false,
                modeBarButtonsToRemove: ['lasso2d', 'select2d']
              }}
            />
            <p className="text-sm text-gray-600 mt-4 italic">{analysis.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};