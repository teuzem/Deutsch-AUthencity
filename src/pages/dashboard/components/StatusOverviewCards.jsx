import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StatusOverviewCards = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      activeApplications: 'Active Applications',
      pendingDocuments: 'Pending Documents',
      completedThisMonth: 'Completed This Month',
      totalSpent: 'Total Spent',
      viewAll: 'View All',
      inProgress: 'In Progress',
      awaitingReview: 'Awaiting Review',
      completed: 'Completed'
    },
    de: {
      activeApplications: 'Aktive Anträge',
      pendingDocuments: 'Ausstehende Dokumente',
      completedThisMonth: 'Diesen Monat Abgeschlossen',
      totalSpent: 'Gesamtausgaben',
      viewAll: 'Alle Anzeigen',
      inProgress: 'In Bearbeitung',
      awaitingReview: 'Warten auf Prüfung',
      completed: 'Abgeschlossen'
    }
  };

  const t = translations[currentLanguage];

  const statusCards = [
    {
      title: t.activeApplications,
      value: '3',
      subtitle: t.inProgress,
      icon: 'FileText',
      color: 'bg-blue-500',
      trend: '+2',
      trendColor: 'text-green-600'
    },
    {
      title: t.pendingDocuments,
      value: '2',
      subtitle: t.awaitingReview,
      icon: 'Clock',
      color: 'bg-warning',
      trend: '-1',
      trendColor: 'text-green-600'
    },
    {
      title: t.completedThisMonth,
      value: '5',
      subtitle: t.completed,
      icon: 'CheckCircle',
      color: 'bg-success',
      trend: '+3',
      trendColor: 'text-green-600'
    },
    {
      title: t.totalSpent,
      value: '€1,250',
      subtitle: 'This year',
      icon: 'Euro',
      color: 'bg-accent',
      trend: '+€450',
      trendColor: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statusCards.map((card, index) => (
        <div
          key={index}
          className="bg-surface rounded-lg p-6 border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-smooth hover-scale"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
              <Icon name={card.icon} size={24} className="text-white" />
            </div>
            <button className="text-text-secondary hover:text-accent transition-quick">
              <Icon name="MoreVertical" size={20} />
            </button>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-heading font-bold text-text-primary">
              {card.value}
            </h3>
            <p className="text-sm font-body text-text-secondary">
              {card.title}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">
                {card.subtitle}
              </span>
              <span className={`text-xs font-medium ${card.trendColor} flex items-center space-x-1`}>
                <Icon name="TrendingUp" size={12} />
                <span>{card.trend}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusOverviewCards;