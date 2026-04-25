import React, { useState } from 'react';
import api from '../../api/axios';
import Button from '../../components/ui/Button';

const StepDetails = ({ formData, onUpdate, onNext }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) return;

    setLoading(true);
    setError('');
    try {
      const response = await api.post('/campaigns', {
        name: formData.name,
        description: formData.description
      });
      onUpdate({ campaignId: response.data._id });
      onNext();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Campaign Details</h2>
        <p className="text-slate-500 mt-1">Start by giving your campaign a name and description.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Name</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="E.g. Q2 Summer Sale"
            value={formData.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea
            rows="4"
            required
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="What is this campaign about?"
            value={formData.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="pt-6 flex justify-end">
          <Button type="submit" loading={loading} disabled={!formData.name || !formData.description}>
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StepDetails;
