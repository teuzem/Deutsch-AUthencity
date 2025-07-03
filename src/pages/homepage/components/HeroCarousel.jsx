import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      learnMore: 'Learn More',
      applyNow: 'Apply Now',
      viewDetails: 'View Details'
    },
    de: {
      learnMore: 'Mehr erfahren',
      applyNow: 'Jetzt beantragen',
      viewDetails: 'Details anzeigen'
    }
  };

  const t = translations[currentLanguage];

  const documents = [
    {
      id: 1,
      title: 'German Passport',
      titleDe: 'Deutscher Reisepass',
      description: 'Fast and secure German passport application service with expert guidance.',
      descriptionDe: 'Schneller und sicherer deutscher Reisepass-Antragsservice mit Expertenberatung.',
      image: '/api/placeholder/600/400',
      color: 'primary',
      icon: 'FileText',
      features: ['24h Processing', 'Document Verification', 'Expert Review'],
      featuresDe: ['24h Bearbeitung', 'Dokumentenprüfung', 'Expertenprüfung']
    },
    {
      id: 2,
      title: 'German ID Card',
      titleDe: 'Deutscher Personalausweis',
      description: 'Streamlined German identity card services with comprehensive support.',
      descriptionDe: 'Optimierte deutsche Personalausweis-Services mit umfassender Unterstützung.',
      image: '/api/placeholder/600/400',
      color: 'success',
      icon: 'CreditCard',
      features: ['Quick Application', 'Digital Process', 'Secure Handling'],
      featuresDe: ['Schnelle Beantragung', 'Digitaler Prozess', 'Sichere Bearbeitung']
    },
    {
      id: 3,
      title: 'Birth Certificate',
      titleDe: 'Geburtsurkunde',
      description: 'Official German birth certificate authentication and translation services.',
      descriptionDe: 'Offizielle deutsche Geburtsurkunden-Authentifizierung und Übersetzungsdienste.',
      image: '/api/placeholder/600/400',
      color: 'warning',
      icon: 'Award',
      features: ['Certified Translation', 'Legal Authentication', 'Fast Delivery'],
      featuresDe: ['Beglaubigte Übersetzung', 'Rechtliche Beglaubigung', 'Schnelle Lieferung']
    },
    {
      id: 4,
      title: 'Marriage Certificate',
      titleDe: 'Heiratsurkunde',
      description: 'Complete marriage certificate services for German legal requirements.',
      descriptionDe: 'Komplette Heiratsurkunden-Services für deutsche Rechtsanforderungen.',
      image: '/api/placeholder/600/400',
      color: 'secondary',
      icon: 'Heart',
      features: ['Official Recognition', 'Apostille Service', 'International Validity'],
      featuresDe: ['Offizielle Anerkennung', 'Apostille-Service', 'Internationale Gültigkeit']
    },
    {
      id: 5,
      title: 'Visa Application',
      titleDe: 'Visa-Antrag',
      description: 'Expert assistance for German visa applications with high success rates.',
      descriptionDe: 'Expertenhilfe für deutsche Visa-Anträge mit hohen Erfolgsquoten.',
      image: '/api/placeholder/600/400',
      color: 'info',
      icon: 'Plane',
      features: ['Expert Consultation', 'Document Preparation', 'Application Tracking'],
      featuresDe: ['Expertenberatung', 'Dokumentenvorbereitung', 'Antragsverfolgung']
    }
  ];

  const currentDocument = documents[currentSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % documents.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [documents.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % documents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + documents.length) % documents.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleLearnMore = (documentId) => {
    navigate(`/document-gallery?document=${documentId}`);
  };

  const handleApplyNow = (documentId) => {
    navigate(`/document-application-form?type=${documentId}`);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main Carousel */}
      <div className="relative bg-surface rounded-2xl shadow-elevation-3 overflow-hidden">
        <div className="relative h-96 sm:h-[28rem]">
          {/* Background Pattern */}
          <div className={`absolute inset-0 bg-gradient-to-br from-${currentDocument.color}/10 via-transparent to-${currentDocument.color}/5`} />
          
          {/* Content */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className={`w-16 h-16 rounded-xl bg-${currentDocument.color}/10 flex items-center justify-center`}>
                <Icon name={currentDocument.icon} size={32} className={`text-${currentDocument.color}`} />
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-caption rounded-full">
                  {currentSlide + 1} / {documents.length}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary">
                  {currentLanguage === 'de' ? currentDocument.titleDe : currentDocument.title}
                </h3>
                <p className="text-text-secondary font-body text-lg leading-relaxed">
                  {currentLanguage === 'de' ? currentDocument.descriptionDe : currentDocument.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2">
                {(currentLanguage === 'de' ? currentDocument.featuresDe : currentDocument.features).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-text-secondary text-sm font-body">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  onClick={() => handleApplyNow(currentDocument.id)}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="flex-1"
                >
                  {t.applyNow}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleLearnMore(currentDocument.id)}
                  iconName="Info"
                  iconPosition="left"
                  className="flex-1"
                >
                  {t.learnMore}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-surface/80 backdrop-blur-sm rounded-full border border-border flex items-center justify-center hover:bg-surface transition-smooth shadow-elevation-2"
        >
          <Icon name="ChevronLeft" size={20} className="text-text-primary" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-surface/80 backdrop-blur-sm rounded-full border border-border flex items-center justify-center hover:bg-surface transition-smooth shadow-elevation-2"
        >
          <Icon name="ChevronRight" size={20} className="text-text-primary" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {documents.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-smooth ${
              index === currentSlide 
                ? 'bg-accent' :'bg-border hover:bg-text-muted'
            }`}
          />
        ))}
      </div>

      {/* Mini Previews */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {documents.slice(0, 3).map((doc, index) => (
          <button
            key={doc.id}
            onClick={() => goToSlide(index)}
            className={`p-4 rounded-lg border transition-smooth text-left ${
              index === currentSlide 
                ? 'border-accent bg-accent/5' :'border-border bg-surface hover:border-accent/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg bg-${doc.color}/10 flex items-center justify-center`}>
                <Icon name={doc.icon} size={16} className={`text-${doc.color}`} />
              </div>
              <div>
                <h4 className="text-sm font-body font-medium text-text-primary">
                  {currentLanguage === 'de' ? doc.titleDe : doc.title}
                </h4>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;