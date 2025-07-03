import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ServicesOverview = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      servicesTitle: 'Our German Document Services',
      servicesSubtitle: 'Comprehensive solutions for all your German document needs',
      viewAllServices: 'View All Services',
      startApplication: 'Start Application',
      processingTime: 'Processing Time',
      successRate: 'Success Rate',
      expertSupport: 'Expert Support',
      days: 'days',
      hours: 'hours'
    },
    de: {
      servicesTitle: 'Unsere deutschen Dokumentenservices',
      servicesSubtitle: 'Umfassende Lösungen für alle Ihre deutschen Dokumentenanforderungen',
      viewAllServices: 'Alle Services anzeigen',
      startApplication: 'Antrag starten',
      processingTime: 'Bearbeitungszeit',
      successRate: 'Erfolgsquote',
      expertSupport: 'Expertenunterstützung',
      days: 'Tage',
      hours: 'Stunden'
    }
  };

  const t = translations[currentLanguage];

  const services = [
    {
      id: 'passport',
      title: 'German Passport',
      titleDe: 'Deutscher Reisepass',
      description: 'Complete passport application assistance with document verification and expert guidance.',
      descriptionDe: 'Komplette Reisepass-Antragsunterstützung mit Dokumentenprüfung und Expertenberatung.',
      icon: 'FileText',
      color: 'primary',
      processingTime: '2-3',
      timeUnit: 'days',
      successRate: '98%',
      price: '€149',
      features: ['Document Review', 'Application Filing', 'Status Tracking', 'Expert Consultation'],
      featuresDe: ['Dokumentenprüfung', 'Antragsstellung', 'Statusverfolgung', 'Expertenberatung']
    },
    {
      id: 'id-card',
      title: 'German ID Card',
      titleDe: 'Deutscher Personalausweis',
      description: 'Streamlined ID card services with comprehensive support and fast processing.',
      descriptionDe: 'Optimierte Personalausweis-Services mit umfassender Unterstützung und schneller Bearbeitung.',
      icon: 'CreditCard',
      color: 'success',
      processingTime: '1-2',
      timeUnit: 'days',
      successRate: '99%',
      price: '€89',
      features: ['Quick Processing', 'Digital Application', 'Secure Handling', 'Priority Support'],
      featuresDe: ['Schnelle Bearbeitung', 'Digitaler Antrag', 'Sichere Bearbeitung', 'Prioritätssupport']
    },
    {
      id: 'birth-certificate',
      title: 'Birth Certificate',
      titleDe: 'Geburtsurkunde',
      description: 'Official birth certificate authentication and translation services.',
      descriptionDe: 'Offizielle Geburtsurkunden-Authentifizierung und Übersetzungsdienste.',
      icon: 'Award',
      color: 'warning',
      processingTime: '24',
      timeUnit: 'hours',
      successRate: '100%',
      price: '€59',
      features: ['Certified Translation', 'Legal Authentication', 'Apostille Service', 'Fast Delivery'],
      featuresDe: ['Beglaubigte Übersetzung', 'Rechtliche Beglaubigung', 'Apostille-Service', 'Schnelle Lieferung']
    },
    {
      id: 'marriage-certificate',
      title: 'Marriage Certificate',
      titleDe: 'Heiratsurkunde',
      description: 'Complete marriage certificate services for German legal requirements.',
      descriptionDe: 'Komplette Heiratsurkunden-Services für deutsche Rechtsanforderungen.',
      icon: 'Heart',
      color: 'secondary',
      processingTime: '1-2',
      timeUnit: 'days',
      successRate: '97%',
      price: '€79',
      features: ['Official Recognition', 'Document Preparation', 'Legal Compliance', 'International Validity'],
      featuresDe: ['Offizielle Anerkennung', 'Dokumentenvorbereitung', 'Rechtskonformität', 'Internationale Gültigkeit']
    },
    {
      id: 'visa',
      title: 'Visa Application',
      titleDe: 'Visa-Antrag',
      description: 'Expert assistance for German visa applications with high success rates.',
      descriptionDe: 'Expertenhilfe für deutsche Visa-Anträge mit hohen Erfolgsquoten.',
      icon: 'Plane',
      color: 'info',
      processingTime: '5-7',
      timeUnit: 'days',
      successRate: '94%',
      price: '€199',
      features: ['Expert Consultation', 'Document Preparation', 'Application Tracking', 'Interview Prep'],
      featuresDe: ['Expertenberatung', 'Dokumentenvorbereitung', 'Antragsverfolgung', 'Interviewvorbereitung']
    },
    {
      id: 'residence-permit',
      title: 'Residence Permit',
      titleDe: 'Aufenthaltserlaubnis',
      description: 'Comprehensive residence permit application services with legal support.',
      descriptionDe: 'Umfassende Aufenthaltserlaubnis-Antragsservices mit rechtlicher Unterstützung.',
      icon: 'Home',
      color: 'accent',
      processingTime: '7-10',
      timeUnit: 'days',
      successRate: '92%',
      price: '€299',
      features: ['Legal Consultation', 'Document Assembly', 'Application Review', 'Follow-up Support'],
      featuresDe: ['Rechtsberatung', 'Dokumentenzusammenstellung', 'Antragsprüfung', 'Nachbetreuung']
    }
  ];

  const handleStartApplication = (serviceId) => {
    navigate(`/document-application-form?type=${serviceId}`);
  };

  const handleViewDetails = (serviceId) => {
    navigate(`/document-gallery?service=${serviceId}`);
  };

  const handleViewAllServices = () => {
    navigate('/document-gallery');
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary">
            {t.servicesTitle}
          </h2>
          <p className="text-xl text-text-secondary font-body max-w-3xl mx-auto">
            {t.servicesSubtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-surface rounded-xl border border-border shadow-elevation-1 hover:shadow-elevation-3 transition-smooth hover-lift overflow-hidden"
            >
              {/* Service Header */}
              <div className={`p-6 bg-gradient-to-r from-${service.color}/10 to-${service.color}/5 border-b border-border`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-${service.color}/10 flex items-center justify-center`}>
                    <Icon name={service.icon} size={32} className={`text-${service.color}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-heading font-bold text-text-primary">
                      {service.price}
                    </div>
                    <div className="text-sm text-text-secondary font-body">
                      Starting from
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                  {currentLanguage === 'de' ? service.titleDe : service.title}
                </h3>
                <p className="text-text-secondary font-body text-sm leading-relaxed">
                  {currentLanguage === 'de' ? service.descriptionDe : service.description}
                </p>
              </div>

              {/* Service Stats */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-heading font-bold text-text-primary">
                      {service.processingTime}
                    </div>
                    <div className="text-xs text-text-secondary font-body">
                      {t.processingTime}
                    </div>
                    <div className="text-xs text-text-muted font-body">
                      {currentLanguage === 'de' && service.timeUnit === 'days' ? t.days : 
                       currentLanguage === 'de' && service.timeUnit === 'hours' ? t.hours : 
                       service.timeUnit}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-heading font-bold text-success">
                      {service.successRate}
                    </div>
                    <div className="text-xs text-text-secondary font-body">
                      {t.successRate}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-heading font-bold text-accent">
                      24/7
                    </div>
                    <div className="text-xs text-text-secondary font-body">
                      {t.expertSupport}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {(currentLanguage === 'de' ? service.featuresDe : service.features).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-success" />
                      <span className="text-text-secondary text-sm font-body">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-3 pt-4">
                  <Button
                    variant="primary"
                    onClick={() => handleStartApplication(service.id)}
                    iconName="ArrowRight"
                    iconPosition="right"
                    fullWidth
                  >
                    {t.startApplication}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleViewDetails(service.id)}
                    iconName="Info"
                    iconPosition="left"
                    fullWidth
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleViewAllServices}
            iconName="Grid"
            iconPosition="left"
            className="px-8"
          >
            {t.viewAllServices}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;