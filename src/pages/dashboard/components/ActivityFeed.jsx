import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      recentActivity: 'Recent Activity',
      viewAll: 'View All',
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This Week',
      noActivity: 'No recent activity'
    },
    de: {
      recentActivity: 'Aktuelle Aktivitäten',
      viewAll: 'Alle Anzeigen',
      today: 'Heute',
      yesterday: 'Gestern',
      thisWeek: 'Diese Woche',
      noActivity: 'Keine aktuellen Aktivitäten'
    }
  };

  const t = translations[currentLanguage];

  const mockActivities = [
    {
      id: 1,
      type: 'application_submitted',
      title: 'Application Submitted',
      titleDE: 'Antrag Eingereicht',
      description: 'German ID Card application has been submitted for review',
      descriptionDE: 'Deutscher Personalausweis-Antrag wurde zur Prüfung eingereicht',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: 'FileText',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'document_uploaded',
      title: 'Documents Uploaded',
      titleDE: 'Dokumente Hochgeladen',
      description: 'Additional documents uploaded for passport application',
      descriptionDE: 'Zusätzliche Dokumente für Reisepass-Antrag hochgeladen',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      icon: 'Upload',
      color: 'bg-success'
    },
    {
      id: 3,
      type: 'status_updated',
      title: 'Status Updated',
      titleDE: 'Status Aktualisiert',
      description: 'Driver license application status changed to "Approved"',
      descriptionDE: 'Führerschein-Antragsstatus geändert zu "Genehmigt"',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      icon: 'CheckCircle',
      color: 'bg-success'
    },
    {
      id: 4,
      type: 'payment_processed',
      title: 'Payment Processed',
      titleDE: 'Zahlung Verarbeitet',
      description: 'Payment of €85.00 processed successfully',
      descriptionDE: 'Zahlung von €85,00 erfolgreich verarbeitet',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: 'CreditCard',
      color: 'bg-accent'
    },
    {
      id: 5,
      type: 'appointment_scheduled',
      title: 'Appointment Scheduled',
      titleDE: 'Termin Vereinbart',
      description: 'Appointment scheduled for document collection',
      descriptionDE: 'Termin für Dokumentenabholung vereinbart',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      icon: 'Calendar',
      color: 'bg-warning'
    }
  ];

  const getTimeLabel = (timestamp) => {
    const now = new Date();
    const diffInHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 24) {
      return t.today;
    } else if (diffInDays === 1) {
      return t.yesterday;
    } else if (diffInDays <= 7) {
      return t.thisWeek;
    } else {
      return timestamp.toLocaleDateString(currentLanguage === 'de' ? 'de-DE' : 'en-US');
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString(currentLanguage === 'de' ? 'de-DE' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const groupActivitiesByDate = (activities) => {
    const groups = {};
    activities.forEach(activity => {
      const label = getTimeLabel(activity.timestamp);
      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(activity);
    });
    return groups;
  };

  const groupedActivities = groupActivitiesByDate(mockActivities);

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          {t.recentActivity}
        </h2>
        <button className="text-sm text-accent hover:text-accent/80 transition-quick font-body">
          {t.viewAll}
        </button>
      </div>

      {mockActivities.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Activity" size={24} className="text-accent" />
          </div>
          <p className="text-text-secondary font-body">
            {t.noActivity}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedActivities).map(([dateLabel, activities]) => (
            <div key={dateLabel}>
              <h3 className="text-sm font-body font-medium text-text-secondary mb-3 sticky top-0 bg-surface">
                {dateLabel}
              </h3>
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-background transition-quick">
                    <div className={`w-8 h-8 ${activity.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <Icon name={activity.icon} size={16} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-body font-medium text-text-primary">
                          {currentLanguage === 'de' ? activity.titleDE : activity.title}
                        </h4>
                        <span className="text-xs text-text-secondary flex-shrink-0 ml-2">
                          {formatTime(activity.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">
                        {currentLanguage === 'de' ? activity.descriptionDE : activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;