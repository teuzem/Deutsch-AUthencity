import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ApplicationDetails = ({ application, currentLanguage }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDocument, setSelectedDocument] = useState(null);

  if (!application) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <Icon name="FileText" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary font-body">
            {currentLanguage === 'de' ? 'Wählen Sie einen Antrag aus der Liste aus' : 'Select an application from the list'}
          </p>
        </div>
      </div>
    );
  }

  const translations = {
    en: {
      applicationDetails: 'Application Details',
      overview: 'Overview',
      documents: 'Documents',
      history: 'History',
      communication: 'Communication',
      clientInformation: 'Client Information',
      applicationInfo: 'Application Information',
      paymentInfo: 'Payment Information',
      documentType: 'Document Type',
      submissionDate: 'Submission Date',
      status: 'Status',
      priority: 'Priority',
      amount: 'Amount',
      paymentStatus: 'Payment Status',
      paymentMethod: 'Payment Method',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      uploadedDocuments: 'Uploaded Documents',
      viewDocument: 'View Document',
      downloadDocument: 'Download Document',
      processingHistory: 'Processing History',
      clientMessages: 'Client Messages',
      internalNotes: 'Internal Notes',
      addNote: 'Add Note',
      sendMessage: 'Send Message'
    },
    de: {
      applicationDetails: 'Antragsdetails',
      overview: 'Übersicht',
      documents: 'Dokumente',
      history: 'Verlauf',
      communication: 'Kommunikation',
      clientInformation: 'Kundeninformationen',
      applicationInfo: 'Antragsinformationen',
      paymentInfo: 'Zahlungsinformationen',
      documentType: 'Dokumenttyp',
      submissionDate: 'Einreichungsdatum',
      status: 'Status',
      priority: 'Priorität',
      amount: 'Betrag',
      paymentStatus: 'Zahlungsstatus',
      paymentMethod: 'Zahlungsmethode',
      name: 'Name',
      email: 'E-Mail',
      phone: 'Telefon',
      address: 'Adresse',
      uploadedDocuments: 'Hochgeladene Dokumente',
      viewDocument: 'Dokument anzeigen',
      downloadDocument: 'Dokument herunterladen',
      processingHistory: 'Bearbeitungsverlauf',
      clientMessages: 'Kundennachrichten',
      internalNotes: 'Interne Notizen',
      addNote: 'Notiz hinzufügen',
      sendMessage: 'Nachricht senden'
    }
  };

  const t = translations[currentLanguage];

  const tabs = [
    { id: 'overview', label: t.overview, icon: 'Info' },
    { id: 'documents', label: t.documents, icon: 'FileText' },
    { id: 'history', label: t.history, icon: 'Clock' },
    { id: 'communication', label: t.communication, icon: 'MessageSquare' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return 'text-error bg-error/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'in-progress': return 'text-accent bg-accent/10';
      case 'completed': return 'text-success bg-success/10';
      default: return 'text-text-secondary bg-text-secondary/10';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      currentLanguage === 'de' ? 'de-DE' : 'en-US',
      { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Client Information */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-primary mb-4 flex items-center">
          <Icon name="User" size={20} className="mr-2" />
          {t.clientInformation}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-body font-medium text-text-secondary">{t.name}</label>
            <p className="text-text-primary font-body">{application.clientName}</p>
          </div>
          <div>
            <label className="text-sm font-body font-medium text-text-secondary">{t.email}</label>
            <p className="text-text-primary font-body">{application.clientEmail}</p>
          </div>
          <div>
            <label className="text-sm font-body font-medium text-text-secondary">{t.phone}</label>
            <p className="text-text-primary font-body">{application.clientPhone}</p>
          </div>
          <div>
            <label className="text-sm font-body font-medium text-text-secondary">{t.address}</label>
            <p className="text-text-primary font-body">{application.clientAddress}</p>
          </div>
        </div>
      </div>

      {/* Application Information */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-primary mb-4 flex items-center">
          <Icon name="FileText" size={20} className="mr-2" />
          {t.applicationInfo}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-body font-medium text-text-secondary">{t.documentType}</label>
            <p className="text-text-primary font-body">{application.documentType}</p>
          </div>
          <div>
            <label className="text-sm font-body font-medium text-text-secondary">{t.submissionDate}</label>
            <p className="text-text-primary font-body">{formatDate(application.submissionDate)}</p>
          </div>
          <div>
            <label className="text-sm font-body font-medium text-text-secondary">{t.status}</label>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-caption ${getStatusColor(application.status)}`}>
              {application.status}
            </span>
          </div>
          <div>
            <label className="text-sm font-body font-medium text-text-secondary">ID</label>
            <p className="text-text-primary font-data">{application.applicationId}</p>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-primary mb-4 flex items-center">
          <Icon name="CreditCard" size={20} className="mr-2" />
          {t.paymentInfo}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-body font-medium text-text-secondary">{t.amount}</label>
            <p className="text-text-primary font-body font-semibold">€{application.amount}</p>
          </div>
          <div>
            <label className="text-sm font-body font-medium text-text-secondary">{t.paymentStatus}</label>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-caption ${
              application.paymentStatus === 'paid' ? 'text-success bg-success/10' : 'text-warning bg-warning/10'
            }`}>
              {application.paymentStatus}
            </span>
          </div>
          <div>
            <label className="text-sm font-body font-medium text-text-secondary">{t.paymentMethod}</label>
            <p className="text-text-primary font-body">{application.paymentMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold text-primary flex items-center">
        <Icon name="FileText" size={20} className="mr-2" />
        {t.uploadedDocuments}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {application.documents.map((doc, index) => (
          <div key={index} className="bg-surface rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Icon name="File" size={20} className="text-accent mr-2" />
                <span className="font-body font-medium text-text-primary">{doc.name}</span>
              </div>
              <span className="text-sm text-text-secondary">{doc.size}</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                onClick={() => setSelectedDocument(doc)}
              >
                {t.viewDocument}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                {t.downloadDocument}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold text-primary flex items-center">
        <Icon name="Clock" size={20} className="mr-2" />
        {t.processingHistory}
      </h3>
      <div className="space-y-4">
        {application.history.map((event, index) => (
          <div key={index} className="flex items-start space-x-4 p-4 bg-surface rounded-lg border border-border">
            <div className={`w-3 h-3 rounded-full mt-2 ${
              event.type === 'status_change' ? 'bg-accent' :
              event.type === 'payment' ? 'bg-success' :
              event.type === 'document' ? 'bg-warning' : 'bg-text-secondary'
            }`} />
            <div className="flex-1">
              <p className="font-body font-medium text-text-primary">{event.description}</p>
              <p className="text-sm text-text-secondary">{formatDate(event.timestamp)}</p>
              {event.user && (
                <p className="text-sm text-text-secondary">by {event.user}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCommunication = () => (
    <div className="space-y-6">
      {/* Client Messages */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-primary mb-4 flex items-center">
          <Icon name="MessageSquare" size={20} className="mr-2" />
          {t.clientMessages}
        </h3>
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {application.messages.map((message, index) => (
            <div key={index} className={`p-4 rounded-lg ${
              message.sender === 'client' ? 'bg-accent/10 ml-8' : 'bg-surface border border-border mr-8'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-body font-medium text-text-primary">{message.sender}</span>
                <span className="text-sm text-text-secondary">{formatDate(message.timestamp)}</span>
              </div>
              <p className="text-text-primary font-body">{message.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Internal Notes */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-primary mb-4 flex items-center">
          <Icon name="StickyNote" size={20} className="mr-2" />
          {t.internalNotes}
        </h3>
        <div className="space-y-4">
          {application.internalNotes.map((note, index) => (
            <div key={index} className="p-4 bg-warning/5 border-l-4 border-l-warning rounded-r-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-body font-medium text-text-primary">{note.author}</span>
                <span className="text-sm text-text-secondary">{formatDate(note.timestamp)}</span>
              </div>
              <p className="text-text-primary font-body">{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border bg-surface">
        <h2 className="text-xl font-heading font-semibold text-primary mb-2">
          {t.applicationDetails}
        </h2>
        <p className="text-text-secondary font-body">
          {application.clientName} - {application.applicationId}
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-surface">
        <div className="flex space-x-1 p-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-body font-medium transition-quick ${
                activeTab === tab.id
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'documents' && renderDocuments()}
        {activeTab === 'history' && renderHistory()}
        {activeTab === 'communication' && renderCommunication()}
      </div>

      {/* Document Preview Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-heading font-semibold text-primary">{selectedDocument.name}</h3>
              <Button
                variant="ghost"
                iconName="X"
                onClick={() => setSelectedDocument(null)}
              />
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="flex items-center justify-center h-96 bg-background rounded-lg">
                <div className="text-center">
                  <Icon name="FileText" size={48} className="text-text-secondary mx-auto mb-4" />
                  <p className="text-text-secondary font-body">Document preview would appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetails;