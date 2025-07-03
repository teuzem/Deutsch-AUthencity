import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll, currentLanguage }) => {
  const translations = {
    en: {
      activeFilters: 'Active Filters',
      clearAll: 'Clear All',
      documentType: 'Document Type',
      processingTime: 'Processing Time',
      clientLocation: 'Client Location',
      category: 'Category',
      idCard: 'ID Card',
      passport: 'Passport',
      driversLicense: 'Driver\'s License',
      birthCertificate: 'Birth Certificate',
      marriageCertificate: 'Marriage Certificate',
      fast: '1-3 days',
      standard: '1-2 weeks',
      extended: '2-4 weeks',
      berlin: 'Berlin',
      munich: 'Munich',
      hamburg: 'Hamburg',
      cologne: 'Cologne',
      frankfurt: 'Frankfurt',
      successStory: 'Success Stories',
      sampleDocument: 'Sample Documents',
      testimonial: 'Testimonials'
    },
    de: {
      activeFilters: 'Aktive Filter',
      clearAll: 'Alle löschen',
      documentType: 'Dokumenttyp',
      processingTime: 'Bearbeitungszeit',
      clientLocation: 'Kundenstandort',
      category: 'Kategorie',
      idCard: 'Personalausweis',
      passport: 'Reisepass',
      driversLicense: 'Führerschein',
      birthCertificate: 'Geburtsurkunde',
      marriageCertificate: 'Heiratsurkunde',
      fast: '1-3 Tage',
      standard: '1-2 Wochen',
      extended: '2-4 Wochen',
      berlin: 'Berlin',
      munich: 'München',
      hamburg: 'Hamburg',
      cologne: 'Köln',
      frankfurt: 'Frankfurt',
      successStory: 'Erfolgsgeschichten',
      sampleDocument: 'Musterdokumente',
      testimonial: 'Testimonials'
    }
  };

  const t = translations[currentLanguage];

  const filterLabels = {
    documentType: {
      'id-card': t.idCard,
      'passport': t.passport,
      'drivers-license': t.driversLicense,
      'birth-certificate': t.birthCertificate,
      'marriage-certificate': t.marriageCertificate
    },
    processingTime: {
      'fast': t.fast,
      'standard': t.standard,
      'extended': t.extended
    },
    clientLocation: {
      'berlin': t.berlin,
      'munich': t.munich,
      'hamburg': t.hamburg,
      'cologne': t.cologne,
      'frankfurt': t.frankfurt
    },
    category: {
      'success-story': t.successStory,
      'sample-document': t.sampleDocument,
      'testimonial': t.testimonial
    }
  };

  const filterTypeLabels = {
    documentType: t.documentType,
    processingTime: t.processingTime,
    clientLocation: t.clientLocation,
    category: t.category
  };

  const activeFilters = Object.entries(filters)
    .filter(([_, value]) => value !== '')
    .map(([key, value]) => ({
      type: key,
      value: value,
      label: filterLabels[key]?.[value] || value,
      typeLabel: filterTypeLabels[key]
    }));

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-body font-medium text-text-primary">
          {t.activeFilters}:
        </span>
        
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <div
              key={`${filter.type}-${filter.value}`}
              className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-white text-sm font-body rounded-full"
            >
              <span>{filter.typeLabel}: {filter.label}</span>
              <button
                onClick={() => onRemoveFilter(filter.type)}
                className="hover:bg-white/20 rounded-full p-0.5 transition-quick"
                aria-label={`Remove ${filter.typeLabel} filter`}
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          onClick={onClearAll}
          className="text-sm text-text-secondary hover:text-error ml-auto"
        >
          {t.clearAll}
        </Button>
      </div>
    </div>
  );
};

export default ActiveFilters;