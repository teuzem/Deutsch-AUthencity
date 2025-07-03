import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FormNavigation = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onSubmit,
  canProceed,
  isSubmitting,
  translations 
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="bg-surface border-t border-border py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <div className="flex-1">
            {!isFirstStep && (
              <Button
                variant="outline"
                onClick={onPrevious}
                iconName="ChevronLeft"
                iconPosition="left"
                className="w-auto"
              >
                {translations.previous}
              </Button>
            )}
          </div>

          {/* Step Indicator */}
          <div className="flex-1 text-center">
            <p className="text-sm font-body text-text-secondary">
              {translations.step} {currentStep} {translations.of} {totalSteps}
            </p>
          </div>

          {/* Next/Submit Button */}
          <div className="flex-1 flex justify-end">
            {isLastStep ? (
              <Button
                variant="primary"
                onClick={onSubmit}
                disabled={!canProceed || isSubmitting}
                loading={isSubmitting}
                iconName="Send"
                iconPosition="right"
                className="w-auto"
              >
                {isSubmitting ? translations.submitting : translations.submitApplication}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={onNext}
                disabled={!canProceed}
                iconName="ChevronRight"
                iconPosition="right"
                className="w-auto"
              >
                {translations.next}
              </Button>
            )}
          </div>
        </div>

        {/* Auto-save Indicator */}
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs text-text-secondary font-body">
            <Icon name="Save" size={14} className="text-success" />
            <span>{translations.autoSaved}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormNavigation;