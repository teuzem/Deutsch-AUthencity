import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DocumentPreview = ({ currentLanguage }) => {
  const translations = {
    en: {
      sampleDocuments: 'Sample Documents',
      viewSample: 'View Sample',
      secureProcessing: 'Secure Processing',
      documentTypes: 'Document Types We Process'
    },
    de: {
      sampleDocuments: 'Beispieldokumente',
      viewSample: 'Beispiel ansehen',
      secureProcessing: 'Sichere Bearbeitung',
      documentTypes: 'Dokumenttypen, die wir bearbeiten'
    }
  };

  const t = translations[currentLanguage];

  const documentTypes = [
    {
      id: 'id-card',
      name: currentLanguage === 'de' ? 'Personalausweis' : 'German ID Card',
      icon: 'CreditCard',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop&crop=center',
      description: currentLanguage === 'de' ?'Offizieller deutscher Personalausweis mit Chip-Technologie' :'Official German ID card with chip technology',
      processingTime: currentLanguage === 'de' ? '2-4 Wochen' : '2-4 weeks',
      features: [
        currentLanguage === 'de' ? 'Biometrische Daten' : 'Biometric data',
        currentLanguage === 'de' ? 'RFID-Chip' : 'RFID chip',
        currentLanguage === 'de' ? 'EU-weit gültig' : 'EU-wide validity'
      ]
    },
    {
      id: 'passport',
      name: currentLanguage === 'de' ? 'Reisepass' : 'German Passport',
      icon: 'BookOpen',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&crop=center',
      description: currentLanguage === 'de' ?'Biometrischer deutscher Reisepass für internationale Reisen' :'Biometric German passport for international travel',
      processingTime: currentLanguage === 'de' ? '3-6 Wochen' : '3-6 weeks',
      features: [
        currentLanguage === 'de' ? 'Biometrische Fotos' : 'Biometric photos',
        currentLanguage === 'de' ? 'Fingerabdrücke' : 'Fingerprints',
        currentLanguage === 'de' ? 'Weltweit gültig' : 'Worldwide validity'
      ]
    },
    {
      id: 'drivers-license',
      name: currentLanguage === 'de' ? 'Führerschein' : 'Driver\'s License',
      icon: 'Car',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop&crop=center',
      description: currentLanguage === 'de' ?'Deutscher EU-Führerschein mit verschiedenen Fahrzeugklassen' :'German EU driver\'s license with various vehicle categories',
      processingTime: currentLanguage === 'de' ? '4-8 Wochen' : '4-8 weeks',
      features: [
        currentLanguage === 'de' ? 'EU-Standard' : 'EU standard',
        currentLanguage === 'de' ? 'Mehrere Klassen' : 'Multiple categories',
        currentLanguage === 'de' ? 'Digitale Sicherheit' : 'Digital security'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          {t.documentTypes}
        </h3>
        <p className="text-sm font-body text-text-secondary">
          {t.secureProcessing}
        </p>
      </div>

      <div className="space-y-4">
        {documentTypes.map((document) => (
          <div key={document.id} className="bg-surface border border-border rounded-lg overflow-hidden shadow-elevation-1 hover-scale transition-smooth">
            <div className="relative h-32 overflow-hidden">
              <Image
                src={document.image}
                alt={`${document.name} sample`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon name={document.icon} size={16} className="text-white" />
                    </div>
                    <h4 className="font-body font-semibold text-white text-sm">
                      {document.name}
                    </h4>
                  </div>
                  <button className="text-xs font-caption text-white/80 hover:text-white transition-quick">
                    {t.viewSample}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-sm font-body text-text-secondary mb-3 leading-relaxed">
                {document.description}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} className="text-accent" />
                  <span className="text-sm font-caption text-text-secondary">
                    {document.processingTime}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={14} className="text-success" />
                  <span className="text-sm font-caption text-success">Secure</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-xs font-heading font-semibold text-text-primary uppercase tracking-wide">
                  Key Features
                </h5>
                <div className="flex flex-wrap gap-1">
                  {document.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs font-caption bg-accent/10 text-accent px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg p-4 text-center">
        <Icon name="FileCheck" size={24} className="text-accent mx-auto mb-2" />
        <p className="text-sm font-body text-text-primary font-medium mb-1">
          {currentLanguage === 'de' ? 'Über 10.000 Dokumente erfolgreich bearbeitet' : 'Over 10,000 documents successfully processed'}
        </p>
        <p className="text-xs font-caption text-text-secondary">
          {currentLanguage === 'de' ? 'Vertrauenswürdiger Service seit 2018' : 'Trusted service since 2018'}
        </p>
      </div>
    </div>
  );
};

export default DocumentPreview;