import React, { useState, useEffect } from 'react';
import { Table, ArrowRight, AlertCircle } from 'lucide-react';
import api from '../../api/axios';
import Button from '../../components/ui/Button';

const DB_FIELDS = [
  { value: 'name', label: 'Full Name' },
  { value: 'email', label: 'Email Address', required: true },
  { value: 'phone', label: 'Phone Number' },
  { value: 'niche', label: 'Domain/Niche (e.g. Real Estate)' },
  { value: 'personalizationDescription', label: 'Personalization Info (Description)' },
  { value: 'personalizationInstruction', label: 'Custom Instruction' },
];

const StepMapping = ({ formData, onUpdate, onNext, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapping, setMapping] = useState({});

  const headers = formData.preview?.headers || [];
  const previewData = formData.preview?.previewData || [];

  // Auto-map based on similar names
  useEffect(() => {
    const initialMapping = {};
    headers.forEach(header => {
      const lowerHeader = header.toLowerCase();
      const match = DB_FIELDS.find(field => 
        lowerHeader.includes(field.value) || 
        lowerHeader.includes(field.label.toLowerCase())
      );
      if (match) {
        initialMapping[header] = match.value;
      }
    });
    setMapping(initialMapping);
  }, [headers]);

  const handleMapChange = (header, value) => {
    setMapping(prev => ({ ...prev, [header]: value }));
  };

  const handleConfirm = async () => {
    // Validate required fields
    const mappedFields = Object.values(mapping);
    if (!mappedFields.includes('email')) {
      setError('You must map a column to "Email Address"');
      return;
    }

    setLoading(true);
    setError('');

    const confirmData = new FormData();
    confirmData.append('csvFile', formData.file);
    confirmData.append('mapping', JSON.stringify(mapping));

    try {
      const response = await api.post(`/campaigns/${formData.campaignId}/confirm-upload`, confirmData);
      onUpdate({ result: response.data });
      onNext();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to import leads');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Map Fields</h2>
        <p className="text-slate-500 mt-1">Match your CSV columns to the campaign fields.</p>
      </div>

      <div className="border border-slate-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 font-medium">
            <tr>
              <th className="px-4 py-3">CSV Column</th>
              <th className="px-4 py-3">Sample Value</th>
              <th className="px-4 py-3 text-center w-10"><ArrowRight size={16} className="mx-auto" /></th>
              <th className="px-4 py-3">Target Field</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {headers.map((header) => (
              <tr key={header} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-4 font-medium text-slate-700">{header}</td>
                <td className="px-4 py-4 text-slate-500 truncate max-w-[150px]">
                  {previewData[0]?.[header] || '—'}
                </td>
                <td className="px-4 py-4 text-center">
                  <ArrowRight size={14} className="text-slate-300 mx-auto" />
                </td>
                <td className="px-4 py-4">
                  <select
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={mapping[header] || ''}
                    onChange={(e) => handleMapChange(header, e.target.value)}
                  >
                    <option value="">Ignore Column</option>
                    {DB_FIELDS.map(f => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-4 rounded-lg">
          <AlertCircle size={18} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="pt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={handleConfirm} loading={loading}>
          Import Leads
        </Button>
      </div>
    </div>
  );
};

export default StepMapping;
