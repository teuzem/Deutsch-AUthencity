import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';

const ApplicationQueue = ({ 
  applications, 
  selectedApplication, 
  onSelectApplication, 
  currentLanguage 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');

  const translations = {
    en: {
      applicationQueue: 'Application Queue',
      search: 'Search applications...',
      sortBy: 'Sort by',
      filterBy: 'Filter by Status',
      all: 'All',
      pending: 'Pending',
      inProgress: 'In Progress',
      completed: 'Completed',
      urgent: 'Urgent',
      date: 'Date',
      priority: 'Priority',
      status: 'Status',
      applicationsFound: 'applications found'
    },
    de: {
      applicationQueue: 'Antragsqueue',
      search: 'Anträge suchen...',
      sortBy: 'Sortieren nach',
      filterBy: 'Nach Status filtern',
      all: 'Alle',
      pending: 'Ausstehend',
      inProgress: 'In Bearbeitung',
      completed: 'Abgeschlossen',
      urgent: 'Dringend',
      date: 'Datum',
      priority: 'Priorität',
      status: 'Status',
      applicationsFound: 'Anträge gefunden'
    }
  };

  const t = translations[currentLanguage];

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return 'bg-error text-error-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'in-progress': return 'bg-accent text-accent-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      default: return 'bg-text-secondary text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'urgent': return 'AlertTriangle';
      case 'pending': return 'Clock';
      case 'in-progress': return 'RefreshCw';
      case 'completed': return 'CheckCircle';
      default: return 'FileText';
    }
  };

  const filteredAndSortedApplications = applications
    .filter(app => {
      const matchesSearch = app.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.documentType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.submissionDate) - new Date(a.submissionDate);
        case 'priority':
          const priorityOrder = { urgent: 4, pending: 3, 'in-progress': 2, completed: 1 };
          return priorityOrder[b.status] - priorityOrder[a.status];
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  return (
    <div className="h-full bg-surface border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-primary mb-4">
          {t.applicationQueue}
        </h2>
        
        {/* Search */}
        <div className="mb-4">
          <Input
            type="search"
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="date">{t.date}</option>
            <option value="priority">{t.priority}</option>
            <option value="status">{t.status}</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">{t.all}</option>
            <option value="urgent">{t.urgent}</option>
            <option value="pending">{t.pending}</option>
            <option value="in-progress">{t.inProgress}</option>
            <option value="completed">{t.completed}</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm text-text-secondary">
          {filteredAndSortedApplications.length} {t.applicationsFound}
        </p>
      </div>

      {/* Application List */}
      <div className="flex-1 overflow-y-auto">
        {filteredAndSortedApplications.map((application) => (
          <div
            key={application.applicationId}
            onClick={() => onSelectApplication(application)}
            className={`p-4 border-b border-border cursor-pointer transition-quick hover:bg-accent/5 ${
              selectedApplication?.applicationId === application.applicationId
                ? 'bg-accent/10 border-l-4 border-l-accent' :''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-body font-medium text-text-primary truncate">
                  {application.clientName}
                </h3>
                <p className="text-sm text-text-secondary truncate">
                  {application.applicationId}
                </p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-caption ${getStatusColor(application.status)}`}>
                <Icon name={getStatusIcon(application.status)} size={12} className="inline mr-1" />
                {t[application.status.replace('-', '')]}
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-text-primary font-medium">
                {application.documentType}
              </p>
              <p className="text-xs text-text-secondary">
                {new Date(application.submissionDate).toLocaleDateString(
                  currentLanguage === 'de' ? 'de-DE' : 'en-US'
                )}
              </p>
              {application.paymentStatus && (
                <div className="flex items-center">
                  <Icon 
                    name={application.paymentStatus === 'paid' ? 'CheckCircle' : 'Clock'} 
                    size={12} 
                    className={`mr-1 ${
                      application.paymentStatus === 'paid' ? 'text-success' : 'text-warning'
                    }`} 
                  />
                  <span className={`text-xs ${
                    application.paymentStatus === 'paid' ? 'text-success' : 'text-warning'
                  }`}>
                    €{application.amount}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationQueue;