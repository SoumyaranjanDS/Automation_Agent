import React, { useState } from 'react';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import api from '../../api/axios';
import Button from '../../components/ui/Button';

const StepUpload = ({ formData, onUpdate, onNext, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      onUpdate({ file: selectedFile });
      setError('');
    } else {
      setError('Please upload a valid CSV file');
    }
  };

  const handleUpload = async () => {
    if (!formData.file) return;

    setLoading(true);
    setError('');

    const uploadData = new FormData();
    uploadData.append('csvFile', formData.file);

    try {
      const response = await api.post(`/campaigns/${formData.campaignId}/upload-preview`, uploadData);
      onUpdate({ preview: response.data });
      onNext();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process CSV');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Upload Leads</h2>
        <p className="text-slate-500 mt-1">Upload your CSV file containing lead information.</p>
      </div>

      <div className="space-y-4">
        {!formData.file ? (
          <label className="border-2 border-dashed border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all group">
            <input type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload size={32} />
            </div>
            <p className="text-lg font-medium text-slate-700">Click to upload or drag and drop</p>
            <p className="text-sm text-slate-400 mt-1">Only .CSV files are supported (max 5MB)</p>
          </label>
        ) : (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm">
                <FileText size={24} />
              </div>
              <div>
                <p className="font-medium text-slate-900">{formData.file.name}</p>
                <p className="text-xs text-slate-500">{(formData.file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button 
              onClick={() => onUpdate({ file: null })}
              className="text-slate-400 hover:text-red-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {error && (
          <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-4 rounded-lg">
            <AlertCircle size={18} />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="pt-6 flex justify-between">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button 
            onClick={handleUpload} 
            disabled={!formData.file || loading}
            loading={loading}
          >
            Process CSV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepUpload;
