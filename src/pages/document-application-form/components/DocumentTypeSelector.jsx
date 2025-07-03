import React from 'react';
import Icon from '../../../components/AppIcon';


const DocumentTypeSelector = ({ selectedType, onTypeSelect, translations }) => {
  const documentTypes = [
    {
      id: 'id-card',
      name: translations.idCard,
      description: translations.idCardDescription,
      icon: 'CreditCard',
      processingTime: translations.processingTime3to5,
      price: '€89.99',
      requirements: [
        translations.biometricPhoto,
        translations.proofOfResidence,
        translations.birthCertificate
      ]
    },
    {
      id: 'passport',
      name: translations.passport,
      description: translations.passportDescription,
      icon: 'BookOpen',
      processingTime: translations.processingTime5to7,
      price: '€119.99',
      requirements: [
        translations.biometricPhoto,
        translations.proofOfResidence,
        translations.birthCertificate,
        translations.previousPassport
      ]
    },
    {
      id: 'drivers-license',
      name: translations.driversLicense,
      description: translations.driversLicenseDescription,
      icon: 'Car',
      processingTime: translations.processingTime7to10,
      price: '€149.99',
      requirements: [
        translations.biometricPhoto,
        translations.proofOfResidence,
        translations.medicalCertificate,
        translations.drivingTest
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          {translations.selectDocumentType}
        </h2>
        <p className="text-text-secondary font-body">
          {translations.selectDocumentTypeDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {documentTypes.map((type) => (
          <div
            key={type.id}
            className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-elevation-2 ${
              selectedType === type.id
                ? 'border-accent bg-accent/5 shadow-elevation-1'
                : 'border-border bg-surface hover:border-accent/50'
            }`}
            onClick={() => onTypeSelect(type.id)}
          >
            {selectedType === type.id && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Check" size={16} className="text-white" />
                </div>
              </div>
            )}

            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                selectedType === type.id ? 'bg-accent text-white' : 'bg-accent/10 text-accent'
              }`}>
                <Icon name={type.icon} size={32} />
              </div>

              <div>
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
                  {type.name}
                </h3>
                <p className="text-sm text-text-secondary font-body">
                  {type.description}
                </p>
              </div>

              <div className="w-full space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-body text-text-secondary">
                    {translations.price}:
                  </span>
                  <span className="text-lg font-heading font-semibold text-accent">
                    {type.price}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-body text-text-secondary">
                    {translations.processingTime}:
                  </span>
                  <span className="text-sm font-body text-text-primary">
                    {type.processingTime}
                  </span>
                </div>
              </div>

              <div className="w-full">
                <h4 className="text-sm font-body font-medium text-text-primary mb-2">
                  {translations.requiredDocuments}:
                </h4>
                <ul className="space-y-1">
                  {type.requirements.map((req, index) => (
                    <li key={index} className="flex items-center text-xs text-text-secondary">
                      <Icon name="Check" size={12} className="text-success mr-2 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentTypeSelector;