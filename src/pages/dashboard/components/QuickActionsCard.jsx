import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActionsCard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      quickActions: 'Quick Actions',
      startNewApplication: 'Start New Application',
      viewDocuments: 'View Documents',
      manageProfile: 'Manage Profile',
      paymentHistory: 'Payment History',
      contactSupport: 'Contact Support',
      downloadCertificate: 'Download Certificate',
      scheduleAppointment: 'Schedule Appointment',
      trackApplication: 'Track Application'
    },
    de: {
      quickActions: 'Schnellaktionen',
      startNewApplication: 'Neuen Antrag Starten',
      viewDocuments: 'Dokumente Anzeigen',
      manageProfile: 'Profil Verwalten',
      paymentHistory: 'Zahlungshistorie',
      contactSupport: 'Support Kontaktieren',
      downloadCertificate: 'Zertifikat Herunterladen',
      scheduleAppointment: 'Termin Vereinbaren',
      trackApplication: 'Antrag Verfolgen'
    }
  };

  const t = translations[currentLanguage];

  const quickActions = [
    {
      title: t.startNewApplication,
      description: 'Begin a new document application',
      descriptionDE: 'Neuen Dokumentenantrag beginnen',
      icon: 'Plus',
      color: 'bg-primary',
      action: () => navigate('/document-application-form')
    },
    {
      title: t.viewDocuments,
      description: 'Browse available documents',
      descriptionDE: 'Verfügbare Dokumente durchsuchen',
      icon: 'FileText',
      color: 'bg-secondary',
      action: () => navigate('/document-gallery')
    },
    {
      title: t.manageProfile,
      description: 'Update your account settings',
      descriptionDE: 'Kontoeinstellungen aktualisieren',
      icon: 'Settings',
      color: 'bg-accent',
      action: () => navigate('/user-profile-management')
    },
    {
      title: t.paymentHistory,
      description: 'View payment records',
      descriptionDE: 'Zahlungsaufzeichnungen anzeigen',
      icon: 'CreditCard',
      color: 'bg-success',
      action: () => console.log('Navigate to payment history')
    },
    {
      title: t.contactSupport,
      description: 'Get help from our team',
      descriptionDE: 'Hilfe von unserem Team erhalten',
      icon: 'MessageCircle',
      color: 'bg-warning',
      action: () => console.log('Open support chat')
    },
    {
      title: t.downloadCertificate,
      description: 'Download completed documents',
      descriptionDE: 'Abgeschlossene Dokumente herunterladen',
      icon: 'Download',
      color: 'bg-blue-500',
      action: () => console.log('Download certificates')
    }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-1 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          {t.quickActions}
        </h2>
        <Icon name="Zap" size={24} className="text-accent" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="group p-4 rounded-lg border border-border hover:border-accent/50 hover:shadow-elevation-1 transition-smooth text-left hover-scale"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon name={action.icon} size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-body font-medium text-text-primary group-hover:text-accent transition-quick">
                  {action.title}
                </h3>
              </div>
            </div>
            <p className="text-sm text-text-secondary group-hover:text-text-primary transition-quick">
              {currentLanguage === 'de' ? action.descriptionDE : action.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;