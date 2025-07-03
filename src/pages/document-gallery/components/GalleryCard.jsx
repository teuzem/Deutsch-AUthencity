import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GalleryCard = ({ item, onCardClick, onShare, currentLanguage }) => {
  const translations = {
    en: {
      viewDetails: 'View Details',
      share: 'Share',
      processingTime: 'Processing Time',
      location: 'Location',
      documentType: 'Document Type',
      category: 'Category',
      successStory: 'Success Story',
      sampleDocument: 'Sample Document',
      testimonial: 'Testimonial',
      days: 'days',
      weeks: 'weeks',
      readMore: 'Read More'
    },
    de: {
      viewDetails: 'Details anzeigen',
      share: 'Teilen',
      processingTime: 'Bearbeitungszeit',
      location: 'Standort',
      documentType: 'Dokumenttyp',
      category: 'Kategorie',
      successStory: 'Erfolgsgeschichte',
      sampleDocument: 'Musterdokument',
      testimonial: 'Testimonial',
      days: 'Tage',
      weeks: 'Wochen',
      readMore: 'Mehr lesen'
    }
  };

  const t = translations[currentLanguage];

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

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-smooth hover-scale group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-body font-medium rounded-full ${getCategoryColor(item.category)}`}>
            {getCategoryLabel(item.category)}
          </span>
        </div>

        {/* Share Button */}
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onShare(item);
            }}
            iconName="Share2"
            className="p-2 bg-white/90 hover:bg-white text-text-primary shadow-elevation-1"
            aria-label={t.share}
          />
        </div>

        {/* Document Type Badge */}
        {item.documentType && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 text-xs font-body font-medium bg-primary text-primary-foreground rounded-full">
              {item.documentType}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-sm font-body text-text-secondary mb-4 line-clamp-3">
          {truncateText(item.description)}
        </p>

        {/* Metadata */}
        <div className="space-y-2 mb-4">
          {item.processingTime && (
            <div className="flex items-center text-xs font-body text-text-secondary">
              <Icon name="Clock" size={14} className="mr-2" />
              <span>{t.processingTime}: {formatProcessingTime(item.processingTime)}</span>
            </div>
          )}
          
          {item.location && (
            <div className="flex items-center text-xs font-body text-text-secondary">
              <Icon name="MapPin" size={14} className="mr-2" />
              <span>{t.location}: {item.location}</span>
            </div>
          )}

          {item.clientName && (
            <div className="flex items-center text-xs font-body text-text-secondary">
              <Icon name="User" size={14} className="mr-2" />
              <span>{item.clientName}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          onClick={() => onCardClick(item)}
          iconName="ArrowRight"
          iconPosition="right"
          fullWidth
          className="text-sm"
        >
          {t.viewDetails}
        </Button>
      </div>
    </div>
  );
};

export default GalleryCard;