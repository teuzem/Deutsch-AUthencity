import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DetailModal = ({ item, isOpen, onClose, onShare, currentLanguage }) => {
  const translations = {
    en: {
      close: 'Close',
      share: 'Share',
      processingTime: 'Processing Time',
      location: 'Location',
      documentType: 'Document Type',
      clientName: 'Client',
      completedDate: 'Completed',
      category: 'Category',
      successStory: 'Success Story',
      sampleDocument: 'Sample Document',
      testimonial: 'Testimonial',
      days: 'days',
      weeks: 'weeks',
      viewFullSize: 'View Full Size',
      downloadSample: 'Download Sample',
      contactUs: 'Contact Us for Similar Service',
      relatedDocuments: 'Related Documents'
    },
    de: {
      close: 'Schließen',
      share: 'Teilen',
      processingTime: 'Bearbeitungszeit',
      location: 'Standort',
      documentType: 'Dokumenttyp',
      clientName: 'Kunde',
      completedDate: 'Abgeschlossen',
      category: 'Kategorie',
      successStory: 'Erfolgsgeschichte',
      sampleDocument: 'Musterdokument',
      testimonial: 'Testimonial',
      days: 'Tage',
      weeks: 'Wochen',
      viewFullSize: 'Vollbild anzeigen',
      downloadSample: 'Muster herunterladen',
      contactUs: 'Kontaktieren Sie uns für ähnliche Dienstleistungen',
      relatedDocuments: 'Verwandte Dokumente'
    }
  };

  const t = translations[currentLanguage];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const getCategoryLabel = (category) => {
    const labels = {
      'success-story': t.successStory,
      'sample-document': t.sampleDocument,
      'testimonial': t.testimonial
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'success-story': 'bg-success text-success-foreground',
      'sample-document': 'bg-accent text-accent-foreground',
      'testimonial': 'bg-secondary text-secondary-foreground'
    };
    return colors[category] || 'bg-text-secondary text-white';
  };

  const formatProcessingTime = (time) => {
    if (time.includes('day')) {
      return time.replace('days', t.days).replace('day', t.days);
    }
    if (time.includes('week')) {
      return time.replace('weeks', t.weeks).replace('week', t.weeks);
    }
    return time;
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-surface rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 text-sm font-body font-medium rounded-full ${getCategoryColor(item.category)}`}>
              {getCategoryLabel(item.category)}
            </span>
            {item.documentType && (
              <span className="px-3 py-1 text-sm font-body font-medium bg-primary text-primary-foreground rounded-full">
                {item.documentType}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => onShare(item)}
              iconName="Share2"
              className="p-2"
              aria-label={t.share}
            />
            <Button
              variant="ghost"
              onClick={onClose}
              iconName="X"
              className="p-2"
              aria-label={t.close}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  iconName="Maximize2"
                  className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white text-text-primary shadow-elevation-1"
                  aria-label={t.viewFullSize}
                />
              </div>

              {/* Additional Images */}
              {item.additionalImages && item.additionalImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {item.additionalImages.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-quick"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                  {item.title}
                </h2>
                
                <div className="prose prose-sm max-w-none">
                  <p className="text-base font-body text-text-primary leading-relaxed">
                    {item.fullDescription || item.description}
                  </p>
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {item.processingTime && (
                  <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                    <Icon name="Clock" size={20} className="text-accent" />
                    <div>
                      <div className="text-xs font-body text-text-secondary">{t.processingTime}</div>
                      <div className="text-sm font-body font-medium text-text-primary">
                        {formatProcessingTime(item.processingTime)}
                      </div>
                    </div>
                  </div>
                )}

                {item.location && (
                  <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                    <Icon name="MapPin" size={20} className="text-accent" />
                    <div>
                      <div className="text-xs font-body text-text-secondary">{t.location}</div>
                      <div className="text-sm font-body font-medium text-text-primary">{item.location}</div>
                    </div>
                  </div>
                )}

                {item.clientName && (
                  <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                    <Icon name="User" size={20} className="text-accent" />
                    <div>
                      <div className="text-xs font-body text-text-secondary">{t.clientName}</div>
                      <div className="text-sm font-body font-medium text-text-primary">{item.clientName}</div>
                    </div>
                  </div>
                )}

                {item.completedDate && (
                  <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                    <Icon name="Calendar" size={20} className="text-accent" />
                    <div>
                      <div className="text-xs font-body text-text-secondary">{t.completedDate}</div>
                      <div className="text-sm font-body font-medium text-text-primary">{item.completedDate}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {item.category === 'sample-document' && (
                  <Button
                    variant="primary"
                    iconName="Download"
                    iconPosition="left"
                    fullWidth
                  >
                    {t.downloadSample}
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  iconName="MessageCircle"
                  iconPosition="left"
                  fullWidth
                >
                  {t.contactUs}
                </Button>
              </div>

              {/* Client Testimonial */}
              {item.testimonial && (
                <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="Quote" size={20} className="text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-body text-text-primary italic mb-2">
                        "{item.testimonial}"
                      </p>
                      {item.clientName && (
                        <p className="text-xs font-body text-text-secondary">
                          — {item.clientName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;