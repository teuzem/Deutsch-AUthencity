import React from 'react';

import Button from '../../../components/ui/Button';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isVisible, 
  onToggle,
  currentLanguage 
}) => {
  const translations = {
    en: {
      filters: 'Filters',
      documentType: 'Document Type',
      processingTime: 'Processing Time',
      clientLocation: 'Client Location',
      category: 'Category',
      clearAll: 'Clear All',
      apply: 'Apply Filters',
      allTypes: 'All Types',
      idCard: 'ID Card',
      passport: 'Passport',
      driversLicense: 'Driver\'s License',
      birthCertificate: 'Birth Certificate',
      marriageCertificate: 'Marriage Certificate',
      allTimes: 'All Times',
      fast: '1-3 days',
      standard: '1-2 weeks',
      extended: '2-4 weeks',
      allLocations: 'All Locations',
      berlin: 'Berlin',
      munich: 'Munich',
      hamburg: 'Hamburg',
      cologne: 'Cologne',
      frankfurt: 'Frankfurt',
      allCategories: 'All Categories',
      successStory: 'Success Stories',
      sampleDocument: 'Sample Documents',
      testimonial: 'Testimonials'
    },
    de: {
      filters: 'Filter',
      documentType: 'Dokumenttyp',
      processingTime: 'Bearbeitungszeit',
      clientLocation: 'Kundenstandort',
      category: 'Kategorie',
      clearAll: 'Alle löschen',
      apply: 'Filter anwenden',
      allTypes: 'Alle Typen',
      idCard: 'Personalausweis',
      passport: 'Reisepass',
      driversLicense: 'Führerschein',
      birthCertificate: 'Geburtsurkunde',
      marriageCertificate: 'Heiratsurkunde',
      allTimes: 'Alle Zeiten',
      fast: '1-3 Tage',
      standard: '1-2 Wochen',
      extended: '2-4 Wochen',
      allLocations: 'Alle Standorte',
      berlin: 'Berlin',
      munich: 'München',
      hamburg: 'Hamburg',
      cologne: 'Köln',
      frankfurt: 'Frankfurt',
      allCategories: 'Alle Kategorien',
      successStory: 'Erfolgsgeschichten',
      sampleDocument: 'Musterdokumente',
      testimonial: 'Testimonials'
    }
  };

  const t = translations[currentLanguage];

  const filterOptions = {
    documentType: [
      { value: '', label: t.allTypes },
      { value: 'id-card', label: t.idCard },
      { value: 'passport', label: t.passport },
      { value: 'drivers-license', label: t.driversLicense },
      { value: 'birth-certificate', label: t.birthCertificate },
      { value: 'marriage-certificate', label: t.marriageCertificate }
    ],
    processingTime: [
      { value: '', label: t.allTimes },
      { value: 'fast', label: t.fast },
      { value: 'standard', label: t.standard },
      { value: 'extended', label: t.extended }
    ],
    clientLocation: [
      { value: '', label: t.allLocations },
      { value: 'berlin', label: t.berlin },
      { value: 'munich', label: t.munich },
      { value: 'hamburg', label: t.hamburg },
      { value: 'cologne', label: t.cologne },
      { value: 'frankfurt', label: t.frankfurt }
    ],
    category: [
      { value: '', label: t.allCategories },
      { value: 'success-story', label: t.successStory },
      { value: 'sample-document', label: t.sampleDocument },
      { value: 'testimonial', label: t.testimonial }
    ]
  };

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          fullWidth
        >
          {t.filters}
        </Button>
      </div>

      {/* Filter Sidebar */}
      <div className={`
        ${isVisible ? 'block' : 'hidden'} lg:block
        lg:sticky lg:top-20 lg:h-fit
        bg-surface border border-border rounded-lg p-6
        ${isVisible ? 'fixed inset-x-4 top-20 z-50 lg:relative lg:inset-auto lg:top-auto lg:z-auto' : ''}
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">{t.filters}</h3>
          <Button
            variant="ghost"
            onClick={onToggle}
            iconName="X"
            className="p-2"
          />
        </div>

        {/* Desktop Title */}
        <div className="hidden lg:flex justify-between items-center mb-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary">{t.filters}</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
              className="text-sm text-text-secondary hover:text-error"
            >
              {t.clearAll}
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Document Type Filter */}
          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-3">
              {t.documentType}
            </label>
            <div className="space-y-2">
              {filterOptions.documentType.map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="documentType"
                    value={option.value}
                    checked={filters.documentType === option.value}
                    onChange={(e) => handleFilterChange('documentType', e.target.value)}
                    className="w-4 h-4 text-accent border-border focus:ring-accent focus:ring-2"
                  />
                  <span className="ml-3 text-sm font-body text-text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Processing Time Filter */}
          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-3">
              {t.processingTime}
            </label>
            <div className="space-y-2">
              {filterOptions.processingTime.map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="processingTime"
                    value={option.value}
                    checked={filters.processingTime === option.value}
                    onChange={(e) => handleFilterChange('processingTime', e.target.value)}
                    className="w-4 h-4 text-accent border-border focus:ring-accent focus:ring-2"
                  />
                  <span className="ml-3 text-sm font-body text-text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Client Location Filter */}
          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-3">
              {t.clientLocation}
            </label>
            <div className="space-y-2">
              {filterOptions.clientLocation.map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="clientLocation"
                    value={option.value}
                    checked={filters.clientLocation === option.value}
                    onChange={(e) => handleFilterChange('clientLocation', e.target.value)}
                    className="w-4 h-4 text-accent border-border focus:ring-accent focus:ring-2"
                  />
                  <span className="ml-3 text-sm font-body text-text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-3">
              {t.category}
            </label>
            <div className="space-y-2">
              {filterOptions.category.map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={option.value}
                    checked={filters.category === option.value}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-4 h-4 text-accent border-border focus:ring-accent focus:ring-2"
                  />
                  <span className="ml-3 text-sm font-body text-text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Apply Button */}
        <div className="lg:hidden mt-6 pt-4 border-t border-border">
          <div className="flex space-x-3">
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={onClearFilters}
                fullWidth
              >
                {t.clearAll}
              </Button>
            )}
            <Button
              variant="primary"
              onClick={onToggle}
              fullWidth
            >
              {t.apply}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isVisible && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default FilterSidebar;