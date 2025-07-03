import React from 'react';
import Icon from '../../../components/AppIcon';


const ReviewConfirmationForm = ({ 
  selectedDocumentType, 
  formData, 
  uploadedFiles, 
  selectedPaymentMethod,
  onPaymentMethodChange,
  translations 
}) => {
  const getDocumentTypeInfo = () => {
    const documentTypes = {
      'id-card': {
        name: translations.idCard,
        price: '€89.99',
        processingTime: translations.processingTime3to5,
        icon: 'CreditCard'
      },
      'passport': {
        name: translations.passport,
        price: '€119.99',
        processingTime: translations.processingTime5to7,
        icon: 'BookOpen'
      },
      'drivers-license': {
        name: translations.driversLicense,
        price: '€149.99',
        processingTime: translations.processingTime7to10,
        icon: 'Car'
      }
    };
    return documentTypes[selectedDocumentType];
  };

  const documentInfo = getDocumentTypeInfo();

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'CreditCard',
      description: translations.paypalDescription
    },
    {
      id: 'sepa',
      name: 'SEPA Bank Transfer',
      icon: 'Building2',
      description: translations.sepaDescription
    },
    {
      id: 'paystack',
      name: 'PayStack',
      icon: 'Smartphone',
      description: translations.paystackDescription
    },
    {
      id: 'coinbase',
      name: 'Coinbase (Crypto)',
      icon: 'Coins',
      description: translations.coinbaseDescription
    }
  ];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const groupFilesByDocument = () => {
    const grouped = {};
    uploadedFiles.forEach(file => {
      if (!grouped[file.documentId]) {
        grouped[file.documentId] = [];
      }
      grouped[file.documentId].push(file);
    });
    return grouped;
  };

  const groupedFiles = groupFilesByDocument();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          {translations.reviewConfirmation}
        </h2>
        <p className="text-text-secondary font-body">
          {translations.reviewConfirmationDescription}
        </p>
      </div>

      {/* Document Type Summary */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
          <Icon name="FileText" size={20} className="mr-2 text-accent" />
          {translations.selectedDocument}
        </h3>
        
        <div className="flex items-center justify-between p-4 bg-accent/5 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
              <Icon name={documentInfo.icon} size={24} className="text-white" />
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold text-text-primary">
                {documentInfo.name}
              </h4>
              <p className="text-sm text-text-secondary font-body">
                {translations.processingTime}: {documentInfo.processingTime}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-heading font-bold text-accent">
              {documentInfo.price}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information Summary */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
          <Icon name="User" size={20} className="mr-2 text-accent" />
          {translations.personalInformation}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-text-secondary font-body">{translations.fullName}</p>
            <p className="text-text-primary font-body font-medium">
              {formData.firstName} {formData.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-text-secondary font-body">{translations.dateOfBirth}</p>
            <p className="text-text-primary font-body font-medium">
              {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString('de-DE') : '-'}
            </p>
          </div>
          <div>
            <p className="text-sm text-text-secondary font-body">{translations.email}</p>
            <p className="text-text-primary font-body font-medium">{formData.email}</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary font-body">{translations.phone}</p>
            <p className="text-text-primary font-body font-medium">{formData.phone}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-text-secondary font-body">{translations.address}</p>
            <p className="text-text-primary font-body font-medium">
              {formData.street}, {formData.postalCode} {formData.city}, {formData.state}
            </p>
          </div>
        </div>
      </div>

      {/* Uploaded Documents Summary */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
          <Icon name="Upload" size={20} className="mr-2 text-accent" />
          {translations.uploadedDocuments}
        </h3>
        
        <div className="space-y-4">
          {Object.entries(groupedFiles).map(([documentId, files]) => (
            <div key={documentId} className="border border-border rounded-lg p-4">
              <h4 className="text-sm font-body font-medium text-text-primary mb-2">
                {translations[documentId.replace('-', '')] || documentId}
              </h4>
              <div className="space-y-2">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-2 bg-background rounded">
                    <div className="flex items-center space-x-2">
                      <Icon name="File" size={16} className="text-accent" />
                      <span className="text-sm font-body text-text-primary">{file.name}</span>
                    </div>
                    <span className="text-xs text-text-secondary font-body">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
          <Icon name="CreditCard" size={20} className="mr-2 text-accent" />
          {translations.paymentMethod}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                selectedPaymentMethod === method.id
                  ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
              }`}
              onClick={() => onPaymentMethodChange(method.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedPaymentMethod === method.id ? 'bg-accent text-white' : 'bg-accent/10 text-accent'
                }`}>
                  <Icon name={method.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-body font-medium text-text-primary">
                    {method.name}
                  </h4>
                  <p className="text-xs text-text-secondary font-body">
                    {method.description}
                  </p>
                </div>
                {selectedPaymentMethod === method.id && (
                  <Icon name="CheckCircle" size={20} className="text-accent" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-body font-medium text-text-primary mb-2">
              {translations.importantNotice}
            </h3>
            <ul className="space-y-1 text-xs text-text-secondary font-body">
              <li>• {translations.termsCondition1}</li>
              <li>• {translations.termsCondition2}</li>
              <li>• {translations.termsCondition3}</li>
              <li>• {translations.termsCondition4}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Total Summary */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              {translations.totalAmount}
            </h3>
            <p className="text-sm text-text-secondary font-body">
              {translations.includesProcessingFee}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-heading font-bold text-accent">
              {documentInfo.price}
            </p>
            <p className="text-sm text-text-secondary font-body">
              {translations.vatIncluded}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewConfirmationForm;