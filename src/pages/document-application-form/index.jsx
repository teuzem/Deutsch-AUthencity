import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import DocumentTypeSelector from './components/DocumentTypeSelector';
import PersonalInformationForm from './components/PersonalInformationForm';
import DocumentUploadForm from './components/DocumentUploadForm';
import ReviewConfirmationForm from './components/ReviewConfirmationForm';
import ProgressIndicator from './components/ProgressIndicator';
import FormNavigation from './components/FormNavigation';
import Icon from '../../components/AppIcon';


const DocumentApplicationForm = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [formData, setFormData] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const navigate = useNavigate();

  const totalSteps = 4;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Load saved form data
    const savedFormData = localStorage.getItem('documentApplicationForm');
    if (savedFormData) {
      try {
        const parsed = JSON.parse(savedFormData);
        setCurrentStep(parsed.currentStep || 1);
        setSelectedDocumentType(parsed.selectedDocumentType || '');
        setFormData(parsed.formData || {});
        setUploadedFiles(parsed.uploadedFiles || []);
        setSelectedPaymentMethod(parsed.selectedPaymentMethod || '');
        setLastSaved(new Date(parsed.lastSaved));
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      const formState = {
        currentStep,
        selectedDocumentType,
        formData,
        uploadedFiles,
        selectedPaymentMethod,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('documentApplicationForm', JSON.stringify(formState));
      setLastSaved(new Date());
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [currentStep, selectedDocumentType, formData, uploadedFiles, selectedPaymentMethod]);

  const translations = {
    en: {
      documentApplicationForm: 'Document Application Form',
      selectDocument: 'Select Document',
      personalInfo: 'Personal Info',
      uploadDocs: 'Upload Documents',
      reviewSubmit: 'Review & Submit',
      step: 'Step',
      of: 'of',
      previous: 'Previous',
      next: 'Next',
      submitApplication: 'Submit Application',
      submitting: 'Submitting...',
      autoSaved: 'Auto-saved',
      progress: 'Progress',
      
      // Document Types
      selectDocumentType: 'Select Document Type',
      selectDocumentTypeDescription: 'Choose the type of German document you need to apply for',
      idCard: 'German ID Card',
      idCardDescription: 'Official German identity card for residents',
      passport: 'German Passport',
      passportDescription: 'German passport for international travel',
      driversLicense: 'German Driver\'s License',
      driversLicenseDescription: 'Official German driving license',
      
      // Pricing and Processing
      price: 'Price',
      processingTime: 'Processing Time',
      processingTime3to5: '3-5 business days',
      processingTime5to7: '5-7 business days',
      processingTime7to10: '7-10 business days',
      requiredDocuments: 'Required Documents',
      
      // Personal Information
      personalInformation: 'Personal Information',
      personalInformationDescription: 'Please provide your personal details accurately',
      basicInformation: 'Basic Information',
      contactInformation: 'Contact Information',
      addressInformation: 'Address Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      dateOfBirth: 'Date of Birth',
      placeOfBirth: 'Place of Birth',
      nationality: 'Nationality',
      gender: 'Gender',
      email: 'Email Address',
      phone: 'Phone Number',
      street: 'Street Address',
      postalCode: 'Postal Code',
      city: 'City',
      state: 'State',
      
      // Placeholders
      enterFirstName: 'Enter your first name',
      enterLastName: 'Enter your last name',
      enterPlaceOfBirth: 'Enter your place of birth',
      enterEmail: 'Enter your email address',
      enterPhone: 'Enter your phone number',
      enterStreet: 'Enter your street address',
      enterPostalCode: 'Enter postal code',
      enterCity: 'Enter your city',
      selectNationality: 'Select nationality',
      selectGender: 'Select gender',
      selectState: 'Select state',
      
      // Options
      german: 'German',
      other: 'Other',
      male: 'Male',
      female: 'Female',
      diverse: 'Diverse',
      
      // Document Upload
      uploadDocuments: 'Upload Documents',
      uploadDocumentsDescription: 'Please upload all required documents for your application',
      biometricPhoto: 'Biometric Photo',
      proofOfResidence: 'Proof of Residence',
      birthCertificate: 'Birth Certificate',
      previousPassport: 'Previous Passport (if applicable)',
      medicalCertificate: 'Medical Certificate',
      drivingTest: 'Driving Test Certificate',
      
      // File Upload
      dragDropFiles: 'Drag and drop files here',
      orClickToSelect: 'or click to select files',
      selectFiles: 'Select Files',
      uploading: 'Uploading',
      uploaded: 'Uploaded',
      filesUploaded: 'Files uploaded successfully',
      uploadedFiles: 'Uploaded Files',
      maxSize: 'Max size',
      formats: 'Formats',
      invalidFileFormat: 'Invalid file format. Accepted formats:',
      fileTooLarge: 'File too large. Maximum size:',
      
      // Upload Tips
      uploadTips: 'Upload Tips',
      uploadTip1: 'Ensure all documents are clear and readable',
      uploadTip2: 'Photos should be in color and high resolution',
      uploadTip3: 'Documents should be in PDF or image format',
      uploadTip4: 'File names should not contain special characters',
      
      // Review and Confirmation
      reviewConfirmation: 'Review & Confirmation',
      reviewConfirmationDescription: 'Please review your application before submitting',
      selectedDocument: 'Selected Document',
      fullName: 'Full Name',
      address: 'Address',
      uploadedDocuments: 'Uploaded Documents',
      
      // Payment
      paymentMethod: 'Payment Method',
      paypalDescription: 'Pay securely with PayPal',
      sepaDescription: 'European bank transfer',
      paystackDescription: 'Card payments via PayStack',
      coinbaseDescription: 'Pay with cryptocurrency',
      
      // Summary
      totalAmount: 'Total Amount',
      includesProcessingFee: 'Includes processing fee',
      vatIncluded: 'VAT included',
      
      // Terms
      importantNotice: 'Important Notice',
      termsCondition1: 'All information provided must be accurate and truthful',
      termsCondition2: 'Processing times may vary based on document verification',
      termsCondition3: 'Additional documents may be requested during processing',
      termsCondition4: 'Refunds are subject to our terms and conditions',
      
      // Messages
      applicationSubmitted: 'Application Submitted Successfully!',
      applicationSubmittedDescription: 'Your application has been received and is being processed.',
      applicationNumber: 'Application Number',
      estimatedCompletion: 'Estimated Completion',
      nextSteps: 'Next Steps',
      nextStep1: 'You will receive an email confirmation shortly',
      nextStep2: 'Our team will review your documents within 24 hours',
      nextStep3: 'You will be notified of any additional requirements',
      nextStep4: 'Track your application status in your dashboard',
      goToDashboard: 'Go to Dashboard',
      
      // Validation Messages
      fieldRequired: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number',
      selectDocumentFirst: 'Please select a document type first',
      uploadRequiredDocuments: 'Please upload all required documents',
      selectPaymentMethod: 'Please select a payment method'
    },
    de: {
      documentApplicationForm: 'Dokumentenantrag',
      selectDocument: 'Dokument auswählen',
      personalInfo: 'Persönliche Daten',
      uploadDocs: 'Dokumente hochladen',
      reviewSubmit: 'Überprüfen & Senden',
      step: 'Schritt',
      of: 'von',
      previous: 'Zurück',
      next: 'Weiter',
      submitApplication: 'Antrag senden',
      submitting: 'Wird gesendet...',
      autoSaved: 'Automatisch gespeichert',
      progress: 'Fortschritt',
      
      // Document Types
      selectDocumentType: 'Dokumenttyp auswählen',
      selectDocumentTypeDescription: 'Wählen Sie den Typ des deutschen Dokuments, das Sie beantragen möchten',
      idCard: 'Deutscher Personalausweis',
      idCardDescription: 'Offizieller deutscher Personalausweis für Einwohner',
      passport: 'Deutscher Reisepass',
      passportDescription: 'Deutscher Reisepass für internationale Reisen',
      driversLicense: 'Deutscher Führerschein',
      driversLicenseDescription: 'Offizieller deutscher Führerschein',
      
      // Pricing and Processing
      price: 'Preis',
      processingTime: 'Bearbeitungszeit',
      processingTime3to5: '3-5 Werktage',
      processingTime5to7: '5-7 Werktage',
      processingTime7to10: '7-10 Werktage',
      requiredDocuments: 'Erforderliche Dokumente',
      
      // Personal Information
      personalInformation: 'Persönliche Informationen',
      personalInformationDescription: 'Bitte geben Sie Ihre persönlichen Daten korrekt an',
      basicInformation: 'Grundinformationen',
      contactInformation: 'Kontaktinformationen',
      addressInformation: 'Adressinformationen',
      firstName: 'Vorname',
      lastName: 'Nachname',
      dateOfBirth: 'Geburtsdatum',
      placeOfBirth: 'Geburtsort',
      nationality: 'Staatsangehörigkeit',
      gender: 'Geschlecht',
      email: 'E-Mail-Adresse',
      phone: 'Telefonnummer',
      street: 'Straße',
      postalCode: 'Postleitzahl',
      city: 'Stadt',
      state: 'Bundesland',
      
      // Placeholders
      enterFirstName: 'Vorname eingeben',
      enterLastName: 'Nachname eingeben',
      enterPlaceOfBirth: 'Geburtsort eingeben',
      enterEmail: 'E-Mail-Adresse eingeben',
      enterPhone: 'Telefonnummer eingeben',
      enterStreet: 'Straße eingeben',
      enterPostalCode: 'Postleitzahl eingeben',
      enterCity: 'Stadt eingeben',
      selectNationality: 'Staatsangehörigkeit auswählen',
      selectGender: 'Geschlecht auswählen',
      selectState: 'Bundesland auswählen',
      
      // Options
      german: 'Deutsch',
      other: 'Andere',
      male: 'Männlich',
      female: 'Weiblich',
      diverse: 'Divers',
      
      // Document Upload
      uploadDocuments: 'Dokumente hochladen',
      uploadDocumentsDescription: 'Bitte laden Sie alle erforderlichen Dokumente für Ihren Antrag hoch',
      biometricPhoto: 'Biometrisches Foto',
      proofOfResidence: 'Wohnsitznachweis',
      birthCertificate: 'Geburtsurkunde',
      previousPassport: 'Vorheriger Reisepass (falls vorhanden)',
      medicalCertificate: 'Ärztliches Attest',
      drivingTest: 'Führerscheinprüfung',
      
      // File Upload
      dragDropFiles: 'Dateien hier hineinziehen',
      orClickToSelect: 'oder klicken zum Auswählen',
      selectFiles: 'Dateien auswählen',
      uploading: 'Wird hochgeladen',
      uploaded: 'Hochgeladen',
      filesUploaded: 'Dateien erfolgreich hochgeladen',
      uploadedFiles: 'Hochgeladene Dateien',
      maxSize: 'Max. Größe',
      formats: 'Formate',
      invalidFileFormat: 'Ungültiges Dateiformat. Akzeptierte Formate:',
      fileTooLarge: 'Datei zu groß. Maximale Größe:',
      
      // Upload Tips
      uploadTips: 'Upload-Tipps',
      uploadTip1: 'Stellen Sie sicher, dass alle Dokumente klar und lesbar sind',
      uploadTip2: 'Fotos sollten farbig und hochauflösend sein',
      uploadTip3: 'Dokumente sollten im PDF- oder Bildformat vorliegen',
      uploadTip4: 'Dateinamen sollten keine Sonderzeichen enthalten',
      
      // Review and Confirmation
      reviewConfirmation: 'Überprüfung & Bestätigung',
      reviewConfirmationDescription: 'Bitte überprüfen Sie Ihren Antrag vor dem Absenden',
      selectedDocument: 'Ausgewähltes Dokument',
      fullName: 'Vollständiger Name',
      address: 'Adresse',
      uploadedDocuments: 'Hochgeladene Dokumente',
      
      // Payment
      paymentMethod: 'Zahlungsmethode',
      paypalDescription: 'Sicher mit PayPal bezahlen',
      sepaDescription: 'Europäische Banküberweisung',
      paystackDescription: 'Kartenzahlung über PayStack',
      coinbaseDescription: 'Mit Kryptowährung bezahlen',
      
      // Summary
      totalAmount: 'Gesamtbetrag',
      includesProcessingFee: 'Inklusive Bearbeitungsgebühr',
      vatIncluded: 'MwSt. enthalten',
      
      // Terms
      importantNotice: 'Wichtiger Hinweis',
      termsCondition1: 'Alle Angaben müssen korrekt und wahrheitsgemäß sein',
      termsCondition2: 'Bearbeitungszeiten können je nach Dokumentenprüfung variieren',
      termsCondition3: 'Zusätzliche Dokumente können während der Bearbeitung angefordert werden',
      termsCondition4: 'Rückerstattungen unterliegen unseren Geschäftsbedingungen',
      
      // Messages
      applicationSubmitted: 'Antrag erfolgreich eingereicht!',
      applicationSubmittedDescription: 'Ihr Antrag wurde erhalten und wird bearbeitet.',
      applicationNumber: 'Antragsnummer',
      estimatedCompletion: 'Voraussichtliche Fertigstellung',
      nextSteps: 'Nächste Schritte',
      nextStep1: 'Sie erhalten in Kürze eine E-Mail-Bestätigung',
      nextStep2: 'Unser Team wird Ihre Dokumente innerhalb von 24 Stunden prüfen',
      nextStep3: 'Sie werden über zusätzliche Anforderungen benachrichtigt',
      nextStep4: 'Verfolgen Sie Ihren Antragsstatus in Ihrem Dashboard',
      goToDashboard: 'Zum Dashboard',
      
      // Validation Messages
      fieldRequired: 'Dieses Feld ist erforderlich',
      invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      invalidPhone: 'Bitte geben Sie eine gültige Telefonnummer ein',
      selectDocumentFirst: 'Bitte wählen Sie zuerst einen Dokumenttyp aus',
      uploadRequiredDocuments: 'Bitte laden Sie alle erforderlichen Dokumente hoch',
      selectPaymentMethod: 'Bitte wählen Sie eine Zahlungsmethode aus'
    }
  };

  const t = translations[currentLanguage];

  const validateCurrentStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 1:
        if (!selectedDocumentType) {
          newErrors.documentType = t.selectDocumentFirst;
        }
        break;
      
      case 2:
        if (!formData.firstName) newErrors.firstName = t.fieldRequired;
        if (!formData.lastName) newErrors.lastName = t.fieldRequired;
        if (!formData.dateOfBirth) newErrors.dateOfBirth = t.fieldRequired;
        if (!formData.placeOfBirth) newErrors.placeOfBirth = t.fieldRequired;
        if (!formData.nationality) newErrors.nationality = t.fieldRequired;
        if (!formData.gender) newErrors.gender = t.fieldRequired;
        if (!formData.email) {
          newErrors.email = t.fieldRequired;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = t.invalidEmail;
        }
        if (!formData.phone) newErrors.phone = t.fieldRequired;
        if (!formData.street) newErrors.street = t.fieldRequired;
        if (!formData.postalCode) newErrors.postalCode = t.fieldRequired;
        if (!formData.city) newErrors.city = t.fieldRequired;
        if (!formData.state) newErrors.state = t.fieldRequired;
        break;
      
      case 3:
        const requiredDocumentIds = ['biometric-photo', 'proof-of-residence', 'birth-certificate'];
        if (selectedDocumentType === 'drivers-license') {
          requiredDocumentIds.push('medical-certificate', 'driving-test');
        }
        
        const uploadedDocumentIds = [...new Set(uploadedFiles.map(file => file.documentId))];
        const missingDocuments = requiredDocumentIds.filter(id => !uploadedDocumentIds.includes(id));
        
        if (missingDocuments.length > 0) {
          newErrors.documents = t.uploadRequiredDocuments;
        }
        break;
      
      case 4:
        if (!selectedPaymentMethod) {
          newErrors.paymentMethod = t.selectPaymentMethod;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear saved form data
      localStorage.removeItem('documentApplicationForm');
      
      // Navigate to success page or dashboard
      navigate('/dashboard', { 
        state: { 
          message: t.applicationSubmitted,
          applicationNumber: `APP-${Date.now()}`,
          documentType: selectedDocumentType
        }
      });
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedDocumentType !== '';
      case 2:
        return Object.keys(errors).length === 0 && formData.firstName && formData.lastName && formData.email;
      case 3:
        return uploadedFiles.length > 0;
      case 4:
        return selectedPaymentMethod !== '';
      default:
        return false;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DocumentTypeSelector
            selectedType={selectedDocumentType}
            onTypeSelect={setSelectedDocumentType}
            translations={t}
          />
        );
      case 2:
        return (
          <PersonalInformationForm
            formData={formData}
            onFormDataChange={setFormData}
            errors={errors}
            translations={t}
          />
        );
      case 3:
        return (
          <DocumentUploadForm
            selectedDocumentType={selectedDocumentType}
            uploadedFiles={uploadedFiles}
            onFilesChange={setUploadedFiles}
            translations={t}
          />
        );
      case 4:
        return (
          <ReviewConfirmationForm
            selectedDocumentType={selectedDocumentType}
            formData={formData}
            uploadedFiles={uploadedFiles}
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentMethodChange={setSelectedPaymentMethod}
            translations={t}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation />
      <BreadcrumbNavigation />
      
      <div className="pt-16">
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          translations={t}
        />

        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                {t.documentApplicationForm}
              </h1>
              {lastSaved && (
                <p className="text-sm text-text-secondary font-body flex items-center justify-center">
                  <Icon name="Save" size={16} className="mr-1 text-success" />
                  {t.autoSaved} {lastSaved.toLocaleTimeString()}
                </p>
              )}
            </div>

            {/* Form Content */}
            <div className="bg-surface border border-border rounded-lg shadow-elevation-1 p-6 mb-8">
              {renderCurrentStep()}
            </div>

            {/* Error Messages */}
            {Object.keys(errors).length > 0 && (
              <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="AlertCircle" size={20} className="text-error" />
                  <h3 className="text-sm font-body font-medium text-error">
                    Please correct the following errors:
                  </h3>
                </div>
                <ul className="space-y-1 text-sm text-error font-body">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>

        <FormNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          canProceed={canProceed()}
          isSubmitting={isSubmitting}
          translations={t}
        />
      </div>
    </div>
  );
};

export default DocumentApplicationForm;