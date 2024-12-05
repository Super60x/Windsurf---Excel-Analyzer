import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="w-full max-w-2xl p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center space-x-2 text-red-600">
        <AlertCircle className="w-5 h-5" />
        <span className="font-medium">Error</span>
      </div>
      <p className="mt-2 text-sm text-red-600">{message}</p>
    </div>
  );
};