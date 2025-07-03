import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import PersonalInformationSection from './components/PersonalInformationSection';
import ContactDetailsSection from './components/ContactDetailsSection';
import DocumentPreferencesSection from './components/DocumentPreferencesSection';
import PaymentMethodsSection from './components/PaymentMethodsSection';
import PrivacySettingsSection from './components/PrivacySettingsSection';
import AccountSecuritySection from './components/AccountSecuritySection';

import Icon from '../../components/AppIcon';

const UserProfileManagement = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [editingSections, setEditingSections] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Check authentication
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/user-login');
      return;
    }
    setUser(JSON.parse(userData));

    // Check mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [navigate]);

  const translations = {
    en: {
      userProfileManagement: 'User Profile Management',
      personalInformation: 'Personal Information',
      contactDetails: 'Contact Details',
      documentPreferences: 'Document Preferences',
      paymentMethods: 'Payment Methods',
      privacySettings: 'Privacy Settings',
      accountSecurity: 'Account Security',
      profileUpdated: 'Profile updated successfully',
      unsavedChanges: 'You have unsaved changes. Are you sure you want to leave?'
    },
    de: {
      userProfileManagement: 'Benutzerprofilverwaltung',
      personalInformation: 'Persönliche Informationen',
      contactDetails: 'Kontaktdaten',
      documentPreferences: 'Dokumenteneinstellungen',
      paymentMethods: 'Zahlungsmethoden',
      privacySettings: 'Datenschutzeinstellungen',
      accountSecurity: 'Kontosicherheit',
      profileUpdated: 'Profil erfolgreich aktualisiert',
      unsavedChanges: 'Sie haben ungespeicherte Änderungen. Sind Sie sicher, dass Sie die Seite verlassen möchten?'
    }
  };

  const t = translations[currentLanguage];

  // Mock user data
  const [profileData, setProfileData] = useState({
    personalInfo: {
      firstName: 'Max',
      lastName: 'Mustermann',
      dateOfBirth: '1990-05-15',
      nationality: 'German',
      address: {
        street: 'Musterstraße 123',
        city: 'Berlin',
        postalCode: '10115',
        country: 'Germany'
      }
    },
    contactInfo: {
      primaryEmail: 'max.mustermann@email.com',
      secondaryEmail: 'max.backup@email.com',
      primaryPhone: '+49 30 12345678',
      secondaryPhone: '+49 176 98765432',
      preferredCommunication: 'email'
    },
    documentPreferences: {
      emergencyContact: {
        name: 'Anna Mustermann',
        phone: '+49 30 87654321',
        relation: 'Spouse'
      },
      deliveryAddressType: 'current',
      deliveryAddress: {
        street: '',
        city: '',
        postalCode: '',
        country: ''
      },
      documentLanguage: 'de',
      deliveryMethod: 'registered'
    },
    paymentMethods: [
      {
        id: '1',
        type: 'credit_card',
        cardNumber: '4532123456789012',
        expiryDate: '12/25',
        cardholderName: 'Max Mustermann',
        isPrimary: true
      },
      {
        id: '2',
        type: 'bank_account',
        accountNumber: 'DE89370400440532013000',
        routingNumber: '37040044',
        accountHolderName: 'Max Mustermann',
        bankName: 'Deutsche Bank',
        isPrimary: false
      }
    ],
    privacySettings: {
      allowDataProcessing: true,
      allowAnalytics: true,
      allowThirdPartySharing: false,
      allowEmailMarketing: true,
      allowSmsNotifications: true,
      allowPushNotifications: false,
      dataRetention: '2years'
    },
    securitySettings: {
      twoFactorEnabled: false,
      lastPasswordChange: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
    }
  });

  const tabs = [
    { id: 'personal', label: t.personalInformation, icon: 'User' },
    { id: 'contact', label: t.contactDetails, icon: 'Phone' },
    { id: 'preferences', label: t.documentPreferences, icon: 'FileText' },
    { id: 'payment', label: t.paymentMethods, icon: 'CreditCard' },
    { id: 'privacy', label: t.privacySettings, icon: 'Shield' },
    { id: 'security', label: t.accountSecurity, icon: 'Lock' }
  ];

  const handleSectionEdit = (section, isEditing) => {
    setEditingSections(prev => ({
      ...prev,
      [section]: isEditing
    }));
  };

  const handleUpdatePersonalInfo = (updatedInfo) => {
    setProfileData(prev => ({
      ...prev,
      personalInfo: updatedInfo
    }));
  };

  const handleUpdateContactInfo = (updatedInfo) => {
    setProfileData(prev => ({
      ...prev,
      contactInfo: updatedInfo
    }));
  };

  const handleUpdateDocumentPreferences = (updatedPreferences) => {
    setProfileData(prev => ({
      ...prev,
      documentPreferences: updatedPreferences
    }));
  };

  const handleUpdatePaymentMethods = (updatedMethods) => {
    setProfileData(prev => ({
      ...prev,
      paymentMethods: updatedMethods
    }));
  };

  const handleAddPaymentMethod = (newMethod) => {
    const updatedMethods = [...profileData.paymentMethods, newMethod];
    if (updatedMethods.length === 1) {
      updatedMethods[0].isPrimary = true;
    }
    setProfileData(prev => ({
      ...prev,
      paymentMethods: updatedMethods
    }));
  };

  const handleRemovePaymentMethod = (methodId) => {
    const updatedMethods = profileData.paymentMethods.filter(method => method.id !== methodId);
    // If removed method was primary, make first remaining method primary
    if (updatedMethods.length > 0 && !updatedMethods.some(method => method.isPrimary)) {
      updatedMethods[0].isPrimary = true;
    }
    setProfileData(prev => ({
      ...prev,
      paymentMethods: updatedMethods
    }));
  };

  const handleUpdatePrivacySettings = (updatedSettings) => {
    setProfileData(prev => ({
      ...prev,
      privacySettings: updatedSettings
    }));
  };

  const handleUpdateSecuritySettings = (updatedSettings) => {
    setProfileData(prev => ({
      ...prev,
      securitySettings: updatedSettings
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInformationSection
            personalInfo={profileData.personalInfo}
            onUpdate={handleUpdatePersonalInfo}
            isEditing={editingSections.personal}
            onToggleEdit={() => handleSectionEdit('personal', !editingSections.personal)}
            currentLanguage={currentLanguage}
          />
        );
      case 'contact':
        return (
          <ContactDetailsSection
            contactInfo={profileData.contactInfo}
            onUpdate={handleUpdateContactInfo}
            isEditing={editingSections.contact}
            onToggleEdit={() => handleSectionEdit('contact', !editingSections.contact)}
            currentLanguage={currentLanguage}
          />
        );
      case 'preferences':
        return (
          <DocumentPreferencesSection
            preferences={profileData.documentPreferences}
            onUpdate={handleUpdateDocumentPreferences}
            isEditing={editingSections.preferences}
            onToggleEdit={() => handleSectionEdit('preferences', !editingSections.preferences)}
            currentLanguage={currentLanguage}
          />
        );
      case 'payment':
        return (
          <PaymentMethodsSection
            paymentMethods={profileData.paymentMethods}
            onUpdate={handleUpdatePaymentMethods}
            onAddPaymentMethod={handleAddPaymentMethod}
            onRemovePaymentMethod={handleRemovePaymentMethod}
            currentLanguage={currentLanguage}
          />
        );
      case 'privacy':
        return (
          <PrivacySettingsSection
            privacySettings={profileData.privacySettings}
            onUpdate={handleUpdatePrivacySettings}
            isEditing={editingSections.privacy}
            onToggleEdit={() => handleSectionEdit('privacy', !editingSections.privacy)}
            currentLanguage={currentLanguage}
          />
        );
      case 'security':
        return (
          <AccountSecuritySection
            securitySettings={profileData.securitySettings}
            onUpdate={handleUpdateSecuritySettings}
            currentLanguage={currentLanguage}
          />
        );
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="text-accent animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation />
      <BreadcrumbNavigation />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
              {t.userProfileManagement}
            </h1>
            <p className="text-text-secondary">
              Manage your personal information, preferences, and account settings
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation - Desktop */}
            {!isMobile && (
              <div className="lg:w-64 flex-shrink-0">
                <div className="bg-surface border border-border rounded-lg p-4 shadow-elevation-1 sticky top-24">
                  <nav className="space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 text-left text-sm font-body font-medium rounded-md transition-quick ${
                          activeTab === tab.id
                            ? 'bg-accent text-white' :'text-text-primary hover:bg-accent/10 hover:text-accent'
                        }`}
                      >
                        <Icon name={tab.icon} size={18} className="mr-3" />
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            )}

            {/* Mobile Tab Navigation */}
            {isMobile && (
              <div className="mb-6">
                <div className="bg-surface border border-border rounded-lg p-2 shadow-elevation-1">
                  <div className="flex overflow-x-auto scrollbar-hide space-x-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-shrink-0 flex flex-col items-center px-3 py-2 text-xs font-body font-medium rounded-md transition-quick ${
                          activeTab === tab.id
                            ? 'bg-accent text-white' :'text-text-primary hover:bg-accent/10 hover:text-accent'
                        }`}
                      >
                        <Icon name={tab.icon} size={16} className="mb-1" />
                        <span className="whitespace-nowrap">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileManagement;