import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FloatingActionButton = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      startApplication: 'Start New Application',
      quickActions: 'Quick Actions',
      newApplication: 'New Application',
      viewDocuments: 'View Documents',
      contactSupport: 'Contact Support',
      uploadDocs: 'Upload Documents'
    },
    de: {
      startApplication: 'Neuen Antrag Starten',
      quickActions: 'Schnellaktionen',
      newApplication: 'Neuer Antrag',
      viewDocuments: 'Dokumente Anzeigen',
      contactSupport: 'Support Kontaktieren',
      uploadDocs: 'Dokumente Hochladen'
    }
  };

  const t = translations[currentLanguage];

  const quickActions = [
    {
      label: t.newApplication,
      icon: 'Plus',
      color: 'bg-primary',
      action: () => {
        navigate('/document-application-form');
        setIsExpanded(false);
      }
    },
    {
      label: t.viewDocuments,
      icon: 'FileText',
      color: 'bg-secondary',
      action: () => {
        navigate('/document-gallery');
        setIsExpanded(false);
      }
    },
    {
      label: t.uploadDocs,
      icon: 'Upload',
      color: 'bg-accent',
      action: () => {
        navigate('/document-application-form');
        setIsExpanded(false);
      }
    },
    {
      label: t.contactSupport,
      icon: 'MessageCircle',
      color: 'bg-success',
      action: () => {
        console.log('Open support chat');
        setIsExpanded(false);
      }
    }
  ];

  const handleMainAction = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      navigate('/document-application-form');
    }
  };

  const toggleExpanded = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Floating Action Button Container */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Quick Actions Menu */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 space-y-3 animate-fade-in">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="bg-surface text-text-primary px-3 py-2 rounded-lg shadow-elevation-2 text-sm font-body whitespace-nowrap border border-border">
                  {action.label}
                </span>
                <button
                  onClick={action.action}
                  className={`w-12 h-12 ${action.color} rounded-full shadow-elevation-2 flex items-center justify-center hover:scale-110 transition-transform text-white`}
                >
                  <Icon name={action.icon} size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main FAB */}
        <div className="relative">
          <button
            onClick={handleMainAction}
            className="w-14 h-14 bg-gradient-to-r from-primary via-secondary to-accent rounded-full shadow-elevation-2 flex items-center justify-center text-white hover:scale-110 transition-transform group"
            aria-label={t.startApplication}
          >
            <Icon 
              name={isExpanded ? "X" : "Plus"} 
              size={24} 
              className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'group-hover:rotate-90'}`}
            />
          </button>

          {/* Expand/Collapse Button */}
          <button
            onClick={toggleExpanded}
            className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full shadow-elevation-1 flex items-center justify-center text-white hover:scale-110 transition-transform lg:hidden"
            aria-label={t.quickActions}
          >
            <Icon 
              name={isExpanded ? "ChevronDown" : "ChevronUp"} 
              size={12} 
            />
          </button>
        </div>

        {/* Desktop Tooltip */}
        <div className="hidden lg:block absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-text-primary text-white px-3 py-2 rounded-lg text-sm font-body whitespace-nowrap">
            {t.startApplication}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-text-primary" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingActionButton;