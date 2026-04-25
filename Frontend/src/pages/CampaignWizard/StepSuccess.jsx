import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Users, AlertTriangle, FileCheck } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const StepSuccess = ({ formData }) => {
  const navigate = useNavigate();
  const { result } = formData;

  if (!result) return null;

  const stats = [
    { label: 'Total Processed', value: result.totalProcessed, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Successfully Imported', value: result.successfullyImported, icon: FileCheck, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Duplicates Skipped', value: result.duplicatesSkipped, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center space-y-8">
      <motion.div 
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center shadow-inner"
      >
        <CheckCircle size={56} strokeWidth={2.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Campaign Ready!</h2>
        <p className="text-slate-500 mt-3 text-lg max-w-md mx-auto leading-relaxed">
          Your campaign <span className="font-bold text-slate-900 italic">"{formData.name}"</span> has been created and leads have been imported successfully.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (i * 0.1) }}
            className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center group hover:bg-white hover:shadow-xl transition-all duration-300"
          >
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} mb-3`}>
              <stat.icon size={24} />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="pt-8 flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={() => navigate('/')}>
          Go to Dashboard
        </Button>
        <Button onClick={() => navigate(`/campaign/${formData.campaignId}/leads`)}>
          View Leads <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default StepSuccess;
