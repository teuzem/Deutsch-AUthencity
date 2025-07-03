import React from 'react';
import Icon from '../../../components/AppIcon';

const AdminStats = ({ applications, currentLanguage }) => {
  const translations = {
    en: {
      totalApplications: 'Total Applications',
      pendingReview: 'Pending Review',
      inProgress: 'In Progress',
      completed: 'Completed',
      urgentItems: 'Urgent Items',
      todaySubmissions: 'Today\'s Submissions',
      averageProcessingTime: 'Avg Processing Time',
      paymentsPending: 'Payments Pending',
      days: 'days'
    },
    de: {
      totalApplications: 'Gesamte Anträge',
      pendingReview: 'Ausstehende Prüfung',
      inProgress: 'In Bearbeitung',
      completed: 'Abgeschlossen',
      urgentItems: 'Dringende Elemente',
      todaySubmissions: 'Heutige Einreichungen',
      averageProcessingTime: 'Durchschn. Bearbeitungszeit',
      paymentsPending: 'Ausstehende Zahlungen',
      days: 'Tage'
    }
  };

  const t = translations[currentLanguage];

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    inProgress: applications.filter(app => app.status === 'in-progress').length,
    completed: applications.filter(app => app.status === 'completed').length,
    urgent: applications.filter(app => app.status === 'urgent').length,
    todaySubmissions: applications.filter(app => {
      const today = new Date().toDateString();
      return new Date(app.submissionDate).toDateString() === today;
    }).length,
    paymentsPending: applications.filter(app => app.paymentStatus === 'pending').length
  };

  const statCards = [
    {
      title: t.totalApplications,
      value: stats.total,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: t.pendingReview,
      value: stats.pending,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: t.inProgress,
      value: stats.inProgress,
      icon: 'RefreshCw',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: t.completed,
      value: stats.completed,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: t.urgentItems,
      value: stats.urgent,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      title: t.todaySubmissions,
      value: stats.todaySubmissions,
      icon: 'Calendar',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: t.averageProcessingTime,
      value: `7 ${t.days}`,
      icon: 'Timer',
      color: 'text-text-secondary',
      bgColor: 'bg-text-secondary/10'
    },
    {
      title: t.paymentsPending,
      value: stats.paymentsPending,
      icon: 'CreditCard',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-surface rounded-lg border border-border p-4 hover-scale transition-smooth"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            <span className={`text-2xl font-heading font-bold ${stat.color}`}>
              {stat.value}
            </span>
          </div>
          <p className="text-sm font-body text-text-secondary">{stat.title}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;