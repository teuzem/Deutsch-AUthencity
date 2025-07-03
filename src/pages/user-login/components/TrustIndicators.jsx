import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustIndicators = ({ currentLanguage }) => {
  const translations = {
    en: {
      secureLogin: 'Secure Login',
      sslProtected: 'SSL Protected',
      gdprCompliant: 'GDPR Compliant',
      trustedBy: 'Trusted by 10,000+ clients',
      securityFeatures: 'Security Features',
      dataProtection: 'Your data is protected with bank-level security',
      encryptedConnection: 'All connections are encrypted',
      regularAudits: 'Regular security audits',
      certifications: 'Certifications & Compliance'
    },
    de: {
      secureLogin: 'Sichere Anmeldung',
      sslProtected: 'SSL-geschützt',
      gdprCompliant: 'DSGVO-konform',
      trustedBy: 'Vertraut von 10.000+ Kunden',
      securityFeatures: 'Sicherheitsmerkmale',
      dataProtection: 'Ihre Daten sind mit bankähnlicher Sicherheit geschützt',
      encryptedConnection: 'Alle Verbindungen sind verschlüsselt',
      regularAudits: 'Regelmäßige Sicherheitsaudits',
      certifications: 'Zertifizierungen & Compliance'
    }
  };

  const t = translations[currentLanguage];

  const securityFeatures = [
    {
      icon: 'Shield',
      title: t.sslProtected,
      description: t.encryptedConnection
    },
    {
      icon: 'Lock',
      title: t.gdprCompliant,
      description: t.dataProtection
    },
    {
      icon: 'CheckCircle',
      title: t.regularAudits,
      description: 'ISO 27001 certified'
    }
  ];

  const certifications = [
    {
      name: 'SSL Certificate',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=60&fit=crop&crop=center',
      alt: 'SSL Certificate Badge'
    },
    {
      name: 'GDPR Compliance',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=100&h=60&fit=crop&crop=center',
      alt: 'GDPR Compliance Badge'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Security Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-3">
          <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="Shield" size={24} className="text-success" />
          </div>
        </div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          {t.secureLogin}
        </h3>
        <p className="text-sm font-body text-text-secondary">
          {t.trustedBy}
        </p>
      </div>

      {/* Security Features */}
      <div className="space-y-4">
        <h4 className="text-sm font-heading font-semibold text-text-primary">
          {t.securityFeatures}
        </h4>
        <div className="space-y-3">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={feature.icon} size={16} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-body font-medium text-text-primary">
                  {feature.title}
                </p>
                <p className="text-xs font-body text-text-secondary mt-1">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="space-y-4">
        <h4 className="text-sm font-heading font-semibold text-text-primary">
          {t.certifications}
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-background border border-border rounded-lg p-3 text-center">
              <div className="w-full h-12 bg-gray-100 rounded mb-2 overflow-hidden">
                <Image
                  src={cert.image}
                  alt={cert.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-caption text-text-secondary">
                {cert.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Stats */}
      <div className="bg-accent/5 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <Icon name="Users" size={20} className="text-accent mr-2" />
          <span className="text-lg font-heading font-bold text-accent">10,000+</span>
        </div>
        <p className="text-sm font-body text-text-secondary">
          Successful document applications processed
        </p>
      </div>
    </div>
  );
};

export default TrustIndicators;