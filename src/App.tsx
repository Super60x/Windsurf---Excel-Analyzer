import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FileUpload } from './components/FileUpload';
import { DataVisualizer } from './components/DataVisualizer';
import { ErrorDisplay } from './components/ErrorDisplay';
import Timer from './components/Timer';
import { parseExcelFile } from './utils/excelParser';
import { analyzeData } from './utils/dataAnalyzer';
import { handleAnalysisError } from './utils/error';
import { validateExcelData } from './utils/validation';
import { AnalysisResult, DataSummary } from './types';
import { LineChart } from 'lucide-react';
import RequestFullAccess from './components/RequestFullAccess';

function App() {
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);
  const [summary, setSummary] = useState<DataSummary[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTimer, setShowTimer] = useState(false);

  const handleFileUpload = async (file: File) => {
    setShowTimer(true);
    try {
      setIsAnalyzing(true);
      setError(null);
      
      const rawData = await parseExcelFile(file);
      const validData = validateExcelData(rawData);
      const results = analyzeData(validData);
      
      setAnalyses(results.analyses);
      setSummary(results.summary);
    } catch (err) {
      const errorMessage = handleAnalysisError(err);
      setError(errorMessage);
      setAnalyses([]);
      setSummary([]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {showTimer && (
        <Timer
          initialSeconds={600}
          onComplete={() => {
            setShowTimer(false);
            navigate('/request-full-access');
          }}
        />
      )}
      <Routes>
        <Route path="/request-full-access" element={<RequestFullAccess />} />
        <Route path="/" element={
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center mb-8">
              <LineChart className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-3xl font-bold text-gray-800">
                Advanced Excel Data Analyzer
              </h1>
            </div>

            <div className="flex flex-col items-center space-y-8">
              <FileUpload onFileUpload={handleFileUpload} />
              
              {error && <ErrorDisplay message={error} />}
              
              {isAnalyzing && (
                <div className="flex items-center space-x-2 text-lg text-gray-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />
                  <span>Analyzing your data...</span>
                </div>
              )}

              {analyses.length > 0 && !error && (
                <div className="w-full">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                    Data Analysis Results
                  </h2>
                  <DataVisualizer analyses={analyses} summary={summary} />
                </div>
              )}
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;