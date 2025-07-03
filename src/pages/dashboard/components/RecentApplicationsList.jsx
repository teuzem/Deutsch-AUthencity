import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentApplicationsList = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      recentApplications: 'Recent Applications',
      viewAll: 'View All',
      viewDetails: 'View Details',
      uploadDocs: 'Upload Documents',
      contactSupport: 'Contact Support',
      submitted: 'Submitted',
      inReview: 'In Review',
      approved: 'Approved',
      completed: 'Completed',
      rejected: 'Rejected',
      noApplications: 'No applications found',
      startFirst: 'Start your first application'
    },
    de: {
      recentApplications: 'Aktuelle Anträge',
      viewAll: 'Alle Anzeigen',
      viewDetails: 'Details Anzeigen',
      uploadDocs: 'Dokumente Hochladen',
      contactSupport: 'Support Kontaktieren',
      submitted: 'Eingereicht',
      inReview: 'In Prüfung',
      approved: 'Genehmigt',
      completed: 'Abgeschlossen',
      rejected: 'Abgelehnt',
      noApplications: 'Keine Anträge gefunden',
      startFirst: 'Starten Sie Ihren ersten Antrag'
    }
  };

  const t = translations[currentLanguage];

  const mockApplications = [
    {
      id: 'APP-2024-001',
      documentType: 'German ID Card',
      documentTypeDE: 'Deutscher Personalausweis',
      submissionDate: '2024-01-15',
      status: 'inReview',
      progress: 65,
      nextAction: 'Upload additional documents',
      nextActionDE: 'Zusätzliche Dokumente hochladen',
      estimatedCompletion: '2024-02-01',
      icon: 'CreditCard'
    },
    {
      id: 'APP-2024-002',
      documentType: 'German Passport',
      documentTypeDE: 'Deutscher Reisepass',
      submissionDate: '2024-01-10',
      status: 'approved',
      progress: 90,
      nextAction: 'Collect from office',
      nextActionDE: 'Im Büro abholen',
      estimatedCompletion: '2024-01-25',
      icon: 'BookOpen'
    },
    {
      id: 'APP-2024-003',
      documentType: 'Driver License',
      documentTypeDE: 'Führerschein',
      submissionDate: '2024-01-08',
      status: 'completed',
      progress: 100,
      nextAction: 'Download certificate',
      nextActionDE: 'Zertifikat herunterladen',
      estimatedCompletion: '2024-01-20',
      icon: 'Car'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      submitted: 'bg-blue-100 text-blue-800',
      inReview: 'bg-warning/20 text-warning',
      approved: 'bg-success/20 text-success',
      completed: 'bg-green-100 text-green-800',
      rejected: 'bg-error/20 text-error'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-success';
    if (progress >= 60) return 'bg-warning';
    return 'bg-blue-500';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'de' ? 'de-DE' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleViewDetails = (applicationId) => {
    // Navigate to application details or show modal
    console.log('View details for:', applicationId);
  };

  const handleUploadDocs = (applicationId) => {
    navigate('/document-application-form', { state: { applicationId } });
  };

  const handleContactSupport = (applicationId) => {
    // Open support chat or contact form
    console.log('Contact support for:', applicationId);
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-1 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          {t.recentApplications}
        </h2>
        <Button
          variant="ghost"
          onClick={() => navigate('/document-gallery')}
          iconName="ArrowRight"
          iconPosition="right"
          className="text-sm"
        >
          {t.viewAll}
        </Button>
      </div>

      {mockApplications.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="FileText" size={32} className="text-accent" />
          </div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
            {t.noApplications}
          </h3>
          <p className="text-text-secondary mb-4">
            {t.startFirst}
          </p>
          <Button
            variant="primary"
            onClick={() => navigate('/document-application-form')}
            iconName="Plus"
            iconPosition="left"
          >
            Start Application
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {mockApplications.map((application) => (
            <div
              key={application.id}
              className="border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-smooth"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name={application.icon} size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-body font-medium text-text-primary">
                      {currentLanguage === 'de' ? application.documentTypeDE : application.documentType}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      ID: {application.id}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                  {t[application.status]}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">Progress</span>
                  <span className="text-sm font-medium text-text-primary">
                    {application.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(application.progress)}`}
                    style={{ width: `${application.progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                <div>
                  <span className="text-text-secondary">Submitted: </span>
                  <span className="text-text-primary font-medium">
                    {formatDate(application.submissionDate)}
                  </span>
                </div>
                <div>
                  <span className="text-text-secondary">Expected: </span>
                  <span className="text-text-primary font-medium">
                    {formatDate(application.estimatedCompletion)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-text-secondary mb-1">Next Action:</p>
                <p className="text-sm font-medium text-accent">
                  {currentLanguage === 'de' ? application.nextActionDE : application.nextAction}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleViewDetails(application.id)}
                  iconName="Eye"
                  iconPosition="left"
                  className="text-xs"
                >
                  {t.viewDetails}
                </Button>
                {application.status === 'inReview' && (
                  <Button
                    variant="secondary"
                    onClick={() => handleUploadDocs(application.id)}
                    iconName="Upload"
                    iconPosition="left"
                    className="text-xs"
                  >
                    {t.uploadDocs}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => handleContactSupport(application.id)}
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="text-xs"
                >
                  {t.contactSupport}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentApplicationsList;