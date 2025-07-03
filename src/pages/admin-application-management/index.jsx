import React, { useState, useEffect } from 'react';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ApplicationQueue from './components/ApplicationQueue';
import ApplicationDetails from './components/ApplicationDetails';
import ActionPanel from './components/ActionPanel';
import AdminStats from './components/AdminStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminApplicationManagement = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [activePanel, setActivePanel] = useState('queue'); // queue, details, actions

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Check if user is admin
    const userData = localStorage.getItem('user');
    if (!userData) {
      window.location.href = '/user-login';
      return;
    }

    const user = JSON.parse(userData);
    if (user.role !== 'admin') {
      window.location.href = '/dashboard';
      return;
    }

    // Mock applications data
    const mockApplications = [
      {
        applicationId: "APP-2024-001",
        clientName: "Hans Mueller",
        clientEmail: "hans.mueller@email.com",
        clientPhone: "+49 30 12345678",
        clientAddress: "Berliner Str. 123, 10115 Berlin, Germany",
        documentType: "German Passport",
        submissionDate: "2024-01-15T10:30:00Z",
        status: "urgent",
        amount: 150,
        paymentStatus: "paid",
        paymentMethod: "SEPA Bank Transfer",
        documents: [
          { name: "passport_photo.jpg", size: "2.1 MB", type: "image" },
          { name: "birth_certificate.pdf", size: "1.5 MB", type: "document" },
          { name: "proof_of_residence.pdf", size: "0.8 MB", type: "document" }
        ],
        history: [
          {
            type: "status_change",
            description: "Application submitted",
            timestamp: "2024-01-15T10:30:00Z",
            user: "System"
          },
          {
            type: "payment",
            description: "Payment received - €150",
            timestamp: "2024-01-15T11:00:00Z",
            user: "Payment Gateway"
          },
          {
            type: "status_change",
            description: "Status changed to urgent",
            timestamp: "2024-01-16T09:15:00Z",
            user: "Admin User"
          }
        ],
        messages: [
          {
            sender: "client",
            content: "I need my passport urgently for travel next week. Please expedite the process.",
            timestamp: "2024-01-15T14:30:00Z"
          },
          {
            sender: "admin",
            content: "We have received your request and marked it as urgent. We will process it within 2 business days.",
            timestamp: "2024-01-16T09:20:00Z"
          }
        ],
        internalNotes: [
          {
            content: "Client has urgent travel requirements. Prioritize processing.",
            author: "Admin User",
            timestamp: "2024-01-16T09:15:00Z"
          }
        ]
      },
      {
        applicationId: "APP-2024-002",
        clientName: "Maria Schmidt",
        clientEmail: "maria.schmidt@email.com",
        clientPhone: "+49 40 87654321",
        clientAddress: "Hamburger Allee 456, 20095 Hamburg, Germany",
        documentType: "German ID Card",
        submissionDate: "2024-01-14T15:45:00Z",
        status: "pending",
        amount: 75,
        paymentStatus: "pending",
        paymentMethod: "PayPal",
        documents: [
          { name: "id_photo.jpg", size: "1.8 MB", type: "image" },
          { name: "utility_bill.pdf", size: "1.2 MB", type: "document" }
        ],
        history: [
          {
            type: "status_change",
            description: "Application submitted",
            timestamp: "2024-01-14T15:45:00Z",
            user: "System"
          }
        ],
        messages: [
          {
            sender: "client",
            content: "When can I expect my ID card to be ready?",
            timestamp: "2024-01-14T16:00:00Z"
          }
        ],
        internalNotes: [
          {
            content: "Waiting for payment confirmation before processing.",
            author: "Admin User",
            timestamp: "2024-01-14T16:30:00Z"
          }
        ]
      },
      {
        applicationId: "APP-2024-003",
        clientName: "Thomas Weber",
        clientEmail: "thomas.weber@email.com",
        clientPhone: "+49 89 11223344",
        clientAddress: "Münchener Str. 789, 80331 München, Germany",
        documentType: "Driver\'s License",
        submissionDate: "2024-01-13T11:20:00Z",
        status: "in-progress",
        amount: 120,
        paymentStatus: "paid",
        paymentMethod: "Credit Card",
        documents: [
          { name: "license_photo.jpg", size: "2.3 MB", type: "image" },
          { name: "medical_certificate.pdf", size: "0.9 MB", type: "document" },
          { name: "driving_test_certificate.pdf", size: "1.1 MB", type: "document" }
        ],
        history: [
          {
            type: "status_change",
            description: "Application submitted",
            timestamp: "2024-01-13T11:20:00Z",
            user: "System"
          },
          {
            type: "payment",
            description: "Payment received - €120",
            timestamp: "2024-01-13T11:45:00Z",
            user: "Payment Gateway"
          },
          {
            type: "status_change",
            description: "Status changed to in-progress",
            timestamp: "2024-01-14T10:00:00Z",
            user: "Admin User"
          }
        ],
        messages: [],
        internalNotes: [
          {
            content: "All documents verified. Processing license renewal.",
            author: "Admin User",
            timestamp: "2024-01-14T10:00:00Z"
          }
        ]
      },
      {
        applicationId: "APP-2024-004",
        clientName: "Anna Fischer",
        clientEmail: "anna.fischer@email.com",
        clientPhone: "+49 711 55667788",
        clientAddress: "Stuttgarter Platz 321, 70173 Stuttgart, Germany",
        documentType: "Birth Certificate",
        submissionDate: "2024-01-12T09:15:00Z",
        status: "completed",
        amount: 50,
        paymentStatus: "paid",
        paymentMethod: "Bank Transfer",
        documents: [
          { name: "application_form.pdf", size: "0.7 MB", type: "document" },
          { name: "identity_proof.pdf", size: "1.0 MB", type: "document" }
        ],
        history: [
          {
            type: "status_change",
            description: "Application submitted",
            timestamp: "2024-01-12T09:15:00Z",
            user: "System"
          },
          {
            type: "payment",
            description: "Payment received - €50",
            timestamp: "2024-01-12T10:00:00Z",
            user: "Payment Gateway"
          },
          {
            type: "status_change",
            description: "Status changed to completed",
            timestamp: "2024-01-13T14:30:00Z",
            user: "Admin User"
          }
        ],
        messages: [
          {
            sender: "admin",
            content: "Your birth certificate has been processed and is ready for collection.",
            timestamp: "2024-01-13T14:35:00Z"
          }
        ],
        internalNotes: [
          {
            content: "Certificate processed and ready for delivery.",
            author: "Admin User",
            timestamp: "2024-01-13T14:30:00Z"
          }
        ]
      }
    ];

    setApplications(mockApplications);
    setSelectedApplication(mockApplications[0]);

    // Check for mobile view
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);

    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const translations = {
    en: {
      adminApplicationManagement: 'Admin Application Management',
      applicationManagement: 'Application Management',
      queue: 'Queue',
      details: 'Details',
      actions: 'Actions',
      backToQueue: 'Back to Queue',
      refresh: 'Refresh',
      settings: 'Settings',
      notifications: 'Notifications'
    },
    de: {
      adminApplicationManagement: 'Admin-Antragsverwaltung',
      applicationManagement: 'Antragsverwaltung',
      queue: 'Warteschlange',
      details: 'Details',
      actions: 'Aktionen',
      backToQueue: 'Zurück zur Warteschlange',
      refresh: 'Aktualisieren',
      settings: 'Einstellungen',
      notifications: 'Benachrichtigungen'
    }
  };

  const t = translations[currentLanguage];

  const handleSelectApplication = (application) => {
    setSelectedApplication(application);
    if (isMobileView) {
      setActivePanel('details');
    }
  };

  const handleUpdateApplication = (updatedApplication) => {
    setApplications(prev => 
      prev.map(app => 
        app.applicationId === updatedApplication.applicationId 
          ? updatedApplication 
          : app
      )
    );
    setSelectedApplication(updatedApplication);
  };

  const renderMobileNavigation = () => (
    <div className="lg:hidden bg-surface border-b border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-heading font-semibold text-primary">
          {t.applicationManagement}
        </h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            iconName="RefreshCw"
            onClick={() => window.location.reload()}
          />
          <Button
            variant="ghost"
            iconName="Settings"
          />
        </div>
      </div>
      
      <div className="flex space-x-1">
        {[
          { id: 'queue', label: t.queue, icon: 'List' },
          { id: 'details', label: t.details, icon: 'FileText' },
          { id: 'actions', label: t.actions, icon: 'Settings' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePanel(tab.id)}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-body font-medium transition-quick ${
              activePanel === tab.id
                ? 'bg-accent text-accent-foreground'
                : 'text-text-secondary hover:text-accent hover:bg-accent/5'
            }`}
          >
            <Icon name={tab.icon} size={16} className="mr-2" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );

  const renderDesktopLayout = () => (
    <div className="flex h-full">
      {/* Application Queue - 25% */}
      <div className="w-1/4 min-w-80">
        <ApplicationQueue
          applications={applications}
          selectedApplication={selectedApplication}
          onSelectApplication={handleSelectApplication}
          currentLanguage={currentLanguage}
        />
      </div>

      {/* Application Details - 50% */}
      <div className="flex-1">
        <ApplicationDetails
          application={selectedApplication}
          currentLanguage={currentLanguage}
        />
      </div>

      {/* Action Panel - 25% */}
      <div className="w-1/4 min-w-80">
        <ActionPanel
          application={selectedApplication}
          onUpdateApplication={handleUpdateApplication}
          currentLanguage={currentLanguage}
        />
      </div>
    </div>
  );

  const renderMobileLayout = () => (
    <div className="h-full">
      {activePanel === 'queue' && (
        <ApplicationQueue
          applications={applications}
          selectedApplication={selectedApplication}
          onSelectApplication={handleSelectApplication}
          currentLanguage={currentLanguage}
        />
      )}
      
      {activePanel === 'details' && (
        <div className="h-full">
          <div className="lg:hidden p-4 border-b border-border bg-surface">
            <Button
              variant="ghost"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => setActivePanel('queue')}
            >
              {t.backToQueue}
            </Button>
          </div>
          <ApplicationDetails
            application={selectedApplication}
            currentLanguage={currentLanguage}
          />
        </div>
      )}
      
      {activePanel === 'actions' && (
        <div className="h-full">
          <div className="lg:hidden p-4 border-b border-border bg-surface">
            <Button
              variant="ghost"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => setActivePanel('details')}
            >
              {t.details}
            </Button>
          </div>
          <ActionPanel
            application={selectedApplication}
            onUpdateApplication={handleUpdateApplication}
            currentLanguage={currentLanguage}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation />
      <BreadcrumbNavigation />
      
      <main className="pt-16">
        {/* Desktop Header */}
        <div className="hidden lg:block bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-heading font-bold text-primary">
                  {t.adminApplicationManagement}
                </h1>
                <p className="text-text-secondary font-body mt-1">
                  {currentLanguage === 'de' ?'Verwalten Sie Kundenanträge und verfolgen Sie den Bearbeitungsfortschritt' :'Manage client applications and track processing progress'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  iconName="RefreshCw"
                  onClick={() => window.location.reload()}
                >
                  {t.refresh}
                </Button>
                <Button
                  variant="ghost"
                  iconName="Bell"
                >
                  {t.notifications}
                </Button>
                <Button
                  variant="outline"
                  iconName="Settings"
                >
                  {t.settings}
                </Button>
              </div>
            </div>
            
            <AdminStats applications={applications} currentLanguage={currentLanguage} />
          </div>
        </div>

        {/* Mobile Navigation */}
        {renderMobileNavigation()}

        {/* Main Content */}
        <div className="h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)]">
          {isMobileView ? renderMobileLayout() : renderDesktopLayout()}
        </div>
      </main>
    </div>
  );
};

export default AdminApplicationManagement;