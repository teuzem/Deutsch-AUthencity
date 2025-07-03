import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ActionPanel = ({ application, onUpdateApplication, currentLanguage }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [noteText, setNoteText] = useState('');
  const [messageText, setMessageText] = useState('');
  const [showBulkActions, setShowBulkActions] = useState(false);

  const translations = {
    en: {
      actionPanel: 'Action Panel',
      quickActions: 'Quick Actions',
      statusUpdate: 'Status Update',
      communication: 'Communication',
      bulkActions: 'Bulk Actions',
      updateStatus: 'Update Status',
      addInternalNote: 'Add Internal Note',
      sendClientMessage: 'Send Client Message',
      approveApplication: 'Approve Application',
      rejectApplication: 'Reject Application',
      requestDocuments: 'Request Additional Documents',
      scheduleInterview: 'Schedule Interview',
      generateInvoice: 'Generate Invoice',
      markAsPaid: 'Mark as Paid',
      urgent: 'Urgent',
      pending: 'Pending',
      inProgress: 'In Progress',
      completed: 'Completed',
      rejected: 'Rejected',
      onHold: 'On Hold',
      selectStatus: 'Select new status',
      enterNote: 'Enter internal note...',
      enterMessage: 'Enter message to client...',
      save: 'Save',
      send: 'Send',
      cancel: 'Cancel',
      confirm: 'Confirm',
      selectApplications: 'Select applications for bulk actions',
      bulkApprove: 'Bulk Approve',
      bulkReject: 'Bulk Reject',
      bulkStatusUpdate: 'Bulk Status Update',
      exportData: 'Export Data',
      printReport: 'Print Report',
      assignTo: 'Assign To',
      priority: 'Priority',
      dueDate: 'Due Date',
      tags: 'Tags',
      workflow: 'Workflow Actions'
    },
    de: {
      actionPanel: 'Aktionsbereich',
      quickActions: 'Schnellaktionen',
      statusUpdate: 'Status-Update',
      communication: 'Kommunikation',
      bulkActions: 'Massenaktionen',
      updateStatus: 'Status aktualisieren',
      addInternalNote: 'Interne Notiz hinzufügen',
      sendClientMessage: 'Nachricht an Kunden senden',
      approveApplication: 'Antrag genehmigen',
      rejectApplication: 'Antrag ablehnen',
      requestDocuments: 'Zusätzliche Dokumente anfordern',
      scheduleInterview: 'Interview planen',
      generateInvoice: 'Rechnung erstellen',
      markAsPaid: 'Als bezahlt markieren',
      urgent: 'Dringend',
      pending: 'Ausstehend',
      inProgress: 'In Bearbeitung',
      completed: 'Abgeschlossen',
      rejected: 'Abgelehnt',
      onHold: 'Wartend',
      selectStatus: 'Neuen Status wählen',
      enterNote: 'Interne Notiz eingeben...',
      enterMessage: 'Nachricht an Kunden eingeben...',
      save: 'Speichern',
      send: 'Senden',
      cancel: 'Abbrechen',
      confirm: 'Bestätigen',
      selectApplications: 'Anträge für Massenaktionen auswählen',
      bulkApprove: 'Massengenehmigung',
      bulkReject: 'Massenablehnung',
      bulkStatusUpdate: 'Massen-Status-Update',
      exportData: 'Daten exportieren',
      printReport: 'Bericht drucken',
      assignTo: 'Zuweisen an',
      priority: 'Priorität',
      dueDate: 'Fälligkeitsdatum',
      tags: 'Tags',
      workflow: 'Workflow-Aktionen'
    }
  };

  const t = translations[currentLanguage];

  const statusOptions = [
    { value: 'urgent', label: t.urgent, color: 'text-error' },
    { value: 'pending', label: t.pending, color: 'text-warning' },
    { value: 'in-progress', label: t.inProgress, color: 'text-accent' },
    { value: 'completed', label: t.completed, color: 'text-success' },
    { value: 'rejected', label: t.rejected, color: 'text-error' },
    { value: 'on-hold', label: t.onHold, color: 'text-text-secondary' }
  ];

  const quickActions = [
    { id: 'approve', label: t.approveApplication, icon: 'CheckCircle', color: 'success' },
    { id: 'reject', label: t.rejectApplication, icon: 'XCircle', color: 'error' },
    { id: 'request-docs', label: t.requestDocuments, icon: 'FileText', color: 'warning' },
    { id: 'schedule', label: t.scheduleInterview, icon: 'Calendar', color: 'accent' },
    { id: 'invoice', label: t.generateInvoice, icon: 'Receipt', color: 'primary' },
    { id: 'mark-paid', label: t.markAsPaid, icon: 'CreditCard', color: 'success' }
  ];

  const handleStatusUpdate = (newStatus) => {
    if (application && onUpdateApplication) {
      onUpdateApplication({
        ...application,
        status: newStatus,
        history: [
          ...application.history,
          {
            type: 'status_change',
            description: `Status changed to ${newStatus}`,
            timestamp: new Date().toISOString(),
            user: 'Admin User'
          }
        ]
      });
    }
  };

  const handleAddNote = () => {
    if (noteText.trim() && application && onUpdateApplication) {
      onUpdateApplication({
        ...application,
        internalNotes: [
          ...application.internalNotes,
          {
            content: noteText,
            author: 'Admin User',
            timestamp: new Date().toISOString()
          }
        ]
      });
      setNoteText('');
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim() && application && onUpdateApplication) {
      onUpdateApplication({
        ...application,
        messages: [
          ...application.messages,
          {
            sender: 'admin',
            content: messageText,
            timestamp: new Date().toISOString()
          }
        ]
      });
      setMessageText('');
    }
  };

  const handleQuickAction = (actionId) => {
    if (!application || !onUpdateApplication) return;

    switch (actionId) {
      case 'approve': handleStatusUpdate('completed');
        break;
      case 'reject': handleStatusUpdate('rejected');
        break;
      case 'request-docs':
        handleSendMessage();
        setMessageText('Please provide additional documents for your application.');
        break;
      case 'schedule':
        // Handle interview scheduling
        break;
      case 'invoice':
        // Handle invoice generation
        break;
      case 'mark-paid':
        onUpdateApplication({
          ...application,
          paymentStatus: 'paid'
        });
        break;
      default:
        break;
    }
  };

  if (!application) {
    return (
      <div className="h-full bg-surface border-l border-border flex items-center justify-center">
        <div className="text-center">
          <Icon name="Settings" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary font-body">
            {currentLanguage === 'de' ? 'Wählen Sie einen Antrag aus' : 'Select an application'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-surface border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-primary mb-2">
          {t.actionPanel}
        </h2>
        <p className="text-sm text-text-secondary">
          {application.applicationId}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Quick Actions */}
        <div>
          <h3 className="text-base font-heading font-semibold text-primary mb-3 flex items-center">
            <Icon name="Zap" size={18} className="mr-2" />
            {t.quickActions}
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant={action.color === 'primary' ? 'primary' : 'outline'}
                size="sm"
                iconName={action.icon}
                iconPosition="left"
                onClick={() => handleQuickAction(action.id)}
                className={`justify-start ${
                  action.color === 'success' ? 'border-success text-success hover:bg-success/5' :
                  action.color === 'error' ? 'border-error text-error hover:bg-error/5' :
                  action.color === 'warning' ? 'border-warning text-warning hover:bg-warning/5' :
                  action.color === 'accent' ? 'border-accent text-accent hover:bg-accent/5' : ''
                }`}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Status Update */}
        <div>
          <h3 className="text-base font-heading font-semibold text-primary mb-3 flex items-center">
            <Icon name="RefreshCw" size={18} className="mr-2" />
            {t.statusUpdate}
          </h3>
          <div className="space-y-3">
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">{t.selectStatus}</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={() => {
                if (selectedAction) {
                  handleStatusUpdate(selectedAction);
                  setSelectedAction('');
                }
              }}
              disabled={!selectedAction}
            >
              {t.updateStatus}
            </Button>
          </div>
        </div>

        {/* Internal Notes */}
        <div>
          <h3 className="text-base font-heading font-semibold text-primary mb-3 flex items-center">
            <Icon name="StickyNote" size={18} className="mr-2" />
            {t.addInternalNote}
          </h3>
          <div className="space-y-3">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder={t.enterNote}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={handleAddNote}
              disabled={!noteText.trim()}
            >
              {t.save}
            </Button>
          </div>
        </div>

        {/* Client Communication */}
        <div>
          <h3 className="text-base font-heading font-semibold text-primary mb-3 flex items-center">
            <Icon name="MessageSquare" size={18} className="mr-2" />
            {t.sendClientMessage}
          </h3>
          <div className="space-y-3">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={t.enterMessage}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
            <Button
              variant="accent"
              size="sm"
              fullWidth
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
            >
              {t.send}
            </Button>
          </div>
        </div>

        {/* Workflow Actions */}
        <div>
          <h3 className="text-base font-heading font-semibold text-primary mb-3 flex items-center">
            <Icon name="GitBranch" size={18} className="mr-2" />
            {t.workflow}
          </h3>
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              iconName="User"
              iconPosition="left"
              className="justify-start"
            >
              {t.assignTo}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              iconName="Flag"
              iconPosition="left"
              className="justify-start"
            >
              {t.priority}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              className="justify-start"
            >
              {t.dueDate}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              iconName="Tag"
              iconPosition="left"
              className="justify-start"
            >
              {t.tags}
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        <div>
          <h3 className="text-base font-heading font-semibold text-primary mb-3 flex items-center">
            <Icon name="Package" size={18} className="mr-2" />
            {t.bulkActions}
          </h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="CheckSquare"
              iconPosition="left"
              className="justify-start"
            >
              {t.bulkApprove}
            </Button>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="XSquare"
              iconPosition="left"
              className="justify-start"
            >
              {t.bulkReject}
            </Button>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="Download"
              iconPosition="left"
              className="justify-start"
            >
              {t.exportData}
            </Button>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="Printer"
              iconPosition="left"
              className="justify-start"
            >
              {t.printReport}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;