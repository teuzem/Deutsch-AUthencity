import React from 'react';
import GalleryCard from './GalleryCard';
import SkeletonCard from './SkeletonCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';



const GalleryGrid = ({ 
  items, 
  loading, 
  onCardClick, 
  onShare, 
  currentLanguage,
  hasMore,
  onLoadMore 
}) => {
  const translations = {
    en: {
      noResults: 'No documents found',
      noResultsDescription: 'Try adjusting your search terms or filters to find what you\'re looking for.',
      loadMore: 'Load More',
      loading: 'Loading...'
    },
    de: {
      noResults: 'Keine Dokumente gefunden',
      noResultsDescription: 'Versuchen Sie, Ihre Suchbegriffe oder Filter anzupassen, um zu finden, wonach Sie suchen.',
      loadMore: 'Mehr laden',
      loading: 'Wird geladen...'
    }
  };

  const t = translations[currentLanguage];

  if (!loading && items.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-text-secondary/10 rounded-full flex items-center justify-center mb-4">
          <Icon name="FileText" size={32} className="text-text-secondary" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          {t.noResults}
        </h3>
        <p className="text-sm font-body text-text-secondary max-w-md">
          {t.noResultsDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item) => (
          <GalleryCard
            key={item.id}
            item={item}
            onCardClick={onCardClick}
            onShare={onShare}
            currentLanguage={currentLanguage}
          />
        ))}
        
        {/* Loading Skeleton Cards */}
        {loading && (
          <>
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </>
        )}
      </div>

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={onLoadMore}
            iconName="ChevronDown"
            iconPosition="right"
            className="px-8 py-3"
          >
            {t.loadMore}
          </Button>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && items.length > 0 && (
        <div className="flex justify-center py-8">
          <div className="flex items-center space-x-2 text-text-secondary">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-accent border-t-transparent"></div>
            <span className="text-sm font-body">{t.loading}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;