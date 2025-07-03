import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CallToActionSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const translations = {
    en: {
      ctaTitle: 'Ready to Get Started?',
      ctaSubtitle: 'Join thousands of satisfied customers who trust Authencity with their German document needs.',
      personalizedTitle: 'Continue Your Journey',
      personalizedSubtitle: 'You\'re just one step away from completing your document application.',
      startApplication: 'Start Your Application',
      contactExpert: 'Contact an Expert',
      viewDashboard: 'View Dashboard',
      browseServices: 'Browse Services',
      guarantees: {
        secure: 'Secure & Encrypted',
        fast: 'Fast Processing',
        support: '24/7 Support',
        satisfaction: 'Satisfaction Guaranteed'
      }
    },
    de: {
      ctaTitle: 'Bereit anzufangen?',
      ctaSubtitle: 'Schließen Sie sich tausenden zufriedenen Kunden an, die Authencity mit ihren deutschen Dokumentenanforderungen vertrauen.',
      personalizedTitle: 'Setzen Sie Ihre Reise fort',
      personalizedSubtitle: 'Sie sind nur einen Schritt davon entfernt, Ihren Dokumentenantrag abzuschließen.',
      startApplication: 'Ihren Antrag starten',
      contactExpert: 'Experten kontaktieren',
      viewDashboard: 'Dashboard anzeigen',
      browseServices: 'Services durchsuchen',
      guarantees: {
        secure: 'Sicher & Verschlüsselt',
        fast: 'Schnelle Bearbeitung',
        support: '24/7 Support',
        satisfaction: 'Zufriedenheitsgarantie'
      }
    }
  };

  const t = translations[currentLanguage];

  const guarantees = [
    {
      icon: 'Shield',
      title: t.guarantees.secure,
      description: 'Bank-level security',
      color: 'primary'
    },
    {
      icon: 'Zap',
      title: t.guarantees.fast,
      description: '24-48 hour processing',
      color: 'success'
    },
    {
      icon: 'Headphones',
      title: t.guarantees.support,
      description: 'Always available',
      color: 'accent'
    },
    {
      icon: 'Star',
      title: t.guarantees.satisfaction,
      description: '98% success rate',
      color: 'warning'
    }
  ];

  const handleStartApplication = () => {
    navigate('/document-application-form');
  };

  const handleContactExpert = () => {
    // You can implement this to open a chat widget or contact form
    console.log('Contact expert clicked');
  };

  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  const handleBrowseServices = () => {
    navigate('/document-gallery');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <div className="bg-surface rounded-3xl border border-border shadow-elevation-3 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="text-center space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary">
                    {user ? t.personalizedTitle : t.ctaTitle}
                  </h2>
                  <p className="text-xl text-text-secondary font-body max-w-3xl mx-auto">
                    {user ? t.personalizedSubtitle : t.ctaSubtitle}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {user ? (
                    <>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleViewDashboard}
                        iconName="LayoutDashboard"
                        iconPosition="left"
                        className="text-lg px-8 py-4"
                      >
                        {t.viewDashboard}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleBrowseServices}
                        iconName="Grid"
                        iconPosition="left"
                        className="text-lg px-8 py-4"
                      >
                        {t.browseServices}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleStartApplication}
                        iconName="ArrowRight"
                        iconPosition="right"
                        className="text-lg px-8 py-4"
                      >
                        {t.startApplication}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleContactExpert}
                        iconName="MessageCircle"
                        iconPosition="left"
                        className="text-lg px-8 py-4"
                      >
                        {t.contactExpert}
                      </Button>
                    </>
                  )}
                </div>

                {/* Guarantees Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                  {guarantees.map((guarantee, index) => (
                    <div key={index} className="text-center space-y-3">
                      <div className={`w-16 h-16 rounded-2xl bg-${guarantee.color}/10 flex items-center justify-center mx-auto`}>
                        <Icon name={guarantee.icon} size={28} className={`text-${guarantee.color}`} />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-text-primary">
                          {guarantee.title}
                        </h4>
                        <p className="text-sm text-text-secondary font-body">
                          {guarantee.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Border with Gradient */}
            <div className="h-2 bg-gradient-to-r from-primary via-accent to-secondary" />
          </div>

          {/* Additional Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Emergency Support */}
            <div className="bg-surface rounded-2xl border border-border p-8 hover:shadow-elevation-2 transition-smooth">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-error/10 rounded-2xl flex items-center justify-center">
                  <Icon name="AlertCircle" size={32} className="text-error" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-heading font-semibold text-text-primary">
                    Emergency Processing
                  </h3>
                  <p className="text-text-secondary font-body">
                    Need your documents urgently? We offer same-day processing for emergency situations.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Phone"
                    iconPosition="left"
                    className="text-error border-error hover:bg-error/5"
                  >
                    Call Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Corporate Solutions */}
            <div className="bg-surface rounded-2xl border border-border p-8 hover:shadow-elevation-2 transition-smooth">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
                  <Icon name="Building" size={32} className="text-secondary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-heading font-semibold text-text-primary">
                    Corporate Solutions
                  </h3>
                  <p className="text-text-secondary font-body">
                    Bulk document processing for businesses and organizations with special pricing.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="text-secondary border-secondary hover:bg-secondary/5"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;