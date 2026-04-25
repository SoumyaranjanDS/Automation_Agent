import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import StepDetails from './StepDetails';
import StepUpload from './StepUpload';
import StepMapping from './StepMapping';
import StepSuccess from './StepSuccess';

const steps = [
  { id: 1, title: 'Campaign Info' },
  { id: 2, title: 'Upload Leads' },
  { id: 3, title: 'Map Fields' },
  { id: 4, title: 'Finished' },
];

const CampaignWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    campaignId: null,
    file: null,
    preview: null,
    mapping: {},
    result: null
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-size-[20px_20px] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Create Campaign</h1>
          <p className="text-slate-500 mt-2 text-lg">Launch your outreach in minutes</p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-12 relative px-4">
          <div className="flex justify-between items-center relative z-10">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: currentStep >= s.id ? '#2563eb' : '#ffffff',
                    color: currentStep >= s.id ? '#ffffff' : '#94a3b8',
                    scale: currentStep === s.id ? 1.1 : 1,
                  }}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${
                    currentStep >= s.id ? 'border-blue-600 shadow-xl shadow-blue-500/20' : 'border-slate-200'
                  }`}
                >
                  {currentStep > s.id ? <Check size={24} strokeWidth={3} /> : <span className="text-lg font-bold">{s.id}</span>}
                </motion.div>
                <span className={`mt-3 text-xs font-bold uppercase tracking-widest ${currentStep >= s.id ? 'text-blue-600' : 'text-slate-400'}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
          {/* Progress Line */}
          <div className="absolute top-6 left-0 w-full h-1 bg-slate-200 z-0 rounded-full">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: "circOut" }}
            />
          </div>
        </div>

        {/* Wizard Card */}
        <Card className="p-8 md:p-12 min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grow"
            >
              {currentStep === 1 && (
                <StepDetails formData={formData} onUpdate={updateFormData} onNext={nextStep} />
              )}
              {currentStep === 2 && (
                <StepUpload formData={formData} onUpdate={updateFormData} onNext={nextStep} onBack={prevStep} />
              )}
              {currentStep === 3 && (
                <StepMapping formData={formData} onUpdate={updateFormData} onNext={nextStep} onBack={prevStep} />
              )}
              {currentStep === 4 && (
                <StepSuccess formData={formData} />
              )}
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
};

export default CampaignWizard;
