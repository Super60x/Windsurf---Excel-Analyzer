export interface DataPoint {
  [key: string]: string | number;
}

export interface AnalysisResult {
  type: 'scatter' | 'bar' | 'pie' | 'box' | 'histogram' | 'heatmap';
  title: string;
  data: any[];
  layout: Partial<Plotly.Layout>;
  description: string;
}

export interface DataSummary {
  columnName: string;
  type: 'numeric' | 'categorical' | 'datetime';
  summary: {
    count?: number;
    mean?: number;
    median?: number;
    std?: number;
    min?: number;
    max?: number;
    uniqueValues?: number;
    topCategories?: { value: string; count: number }[];
  };
}