import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      onFileUpload(files[0]);
    }
  };

  return (
    <div
      className="w-full max-w-2xl p-8 border-2 border-dashed border-gray-300 rounded-lg 
                 bg-white hover:border-blue-500 transition-colors cursor-pointer"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => document.getElementById('fileInput')?.click()}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <Upload className="w-12 h-12 text-gray-400" />
        <p className="text-lg font-medium text-gray-600">
          Drop your Excel file here or click to browse
        </p>
        <p className="text-sm text-gray-400">
          Supports .xlsx and .xls files
        </p>
      </div>
      <input
        id="fileInput"
        type="file"
        className="hidden"
        accept=".xlsx,.xls"
        onChange={handleFileInput}
      />
    </div>
  );
};