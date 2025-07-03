import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, translations }) => {
  const steps = [
    {
      id: 1,
      title: translations.selectDocument,
      icon: 'FileText'
    },
    {
      id: 2,
      title: translations.personalInfo,
      icon: 'User'
    },
    {
      id: 3,
      title: translations.uploadDocs,
      icon: 'Upload'
    },
    {
      id: 4,
      title: translations.reviewSubmit,
      icon: 'CheckCircle'
    }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-surface border-b border-border py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      status === 'completed'
                        ? 'bg-success border-success text-white'
                        : status === 'current' ?'bg-accent border-accent text-white' :'bg-surface border-border text-text-secondary'
                    }`}
                  >
                    {status === 'completed' ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      <Icon name={step.icon} size={20} />
                    )}
                  </div>

                  {/* Step Title */}
                  <div className="mt-2 text-center">
                    <p
                      className={`text-sm font-body font-medium ${
                        status === 'current' ?'text-accent'
                          : status === 'completed' ?'text-success' :'text-text-secondary'
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-text-secondary font-body mt-1">
                      {translations.step} {step.id}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div className="flex-1 mx-4 mt-[-20px]">
                    <div
                      className={`h-0.5 transition-all duration-300 ${
                        step.id < currentStep ? 'bg-success' : 'bg-border'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm font-body text-text-secondary mb-2">
            <span>{translations.progress}</span>
            <span>{Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)}%</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;