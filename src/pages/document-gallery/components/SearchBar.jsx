import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchTerm, onSearchChange, onClearSearch, currentLanguage }) => {
  const translations = {
    en: {
      searchPlaceholder: 'Search documents, success stories, or testimonials...',
      clear: 'Clear'
    },
    de: {
      searchPlaceholder: 'Dokumente, Erfolgsgeschichten oder Testimonials suchen...',
      clear: 'Löschen'
    }
  };

  const t = translations[currentLanguage];

  return (
    <div className="relative mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={20} className="text-text-secondary" />
        </div>
        <Input
          type="search"
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-12 py-3 w-full text-base"
        />
        {searchTerm && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Button
              variant="ghost"
              onClick={onClearSearch}
              iconName="X"
              className="p-1 hover:bg-error/10 hover:text-error"
              aria-label={t.clear}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;