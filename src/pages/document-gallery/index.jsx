import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import ActiveFilters from './components/ActiveFilters';
import GalleryGrid from './components/GalleryGrid';
import DetailModal from './components/DetailModal';
import ShareModal from './components/ShareModal';

import Button from '../../components/ui/Button';

const DocumentGallery = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    documentType: '',
    processingTime: '',
    clientLocation: '',
    category: ''
  });
  const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareItem, setShareItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  // Mock gallery data
  const mockGalleryData = [
    {
      id: 1,
      title: "German ID Card - Berlin Success Story",
      description: "Successfully obtained German ID card for international student within 5 days. Complete documentation and expedited processing through our premium service.",
      fullDescription: `This success story showcases our efficient ID card processing service for international students in Berlin. The client, Maria Rodriguez, needed her German ID card urgently for university enrollment.\n\nOur team provided comprehensive support including document verification, appointment scheduling, and expedited processing. The entire process was completed in just 5 days, well ahead of the standard processing time.\n\nThe client was extremely satisfied with our professional service and attention to detail throughout the process.`,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop",
      additionalImages: [
        "https://images.unsplash.com/photo-1554224154-26032fced8bd?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=200&h=150&fit=crop"
      ],
      documentType: "ID Card",
      category: "success-story",
      processingTime: "5 days",
      location: "Berlin",
      clientName: "Maria Rodriguez",
      completedDate: "15.03.2024",
      testimonial: "Excellent service! The team was professional and helped me get my ID card much faster than expected. Highly recommended for anyone needing document services in Germany."
    },
    {
      id: 2,
      title: "Sample German Passport Document",
      description: "Official sample of German passport showing required format and security features. This template helps clients understand document requirements.",
      fullDescription: `This is an official sample of a German passport document that demonstrates the required format, security features, and layout that clients can expect.\n\nThe sample includes all standard pages and sections while maintaining privacy by using placeholder information. This helps clients understand what to expect and prepare their documentation accordingly.\n\nOur document samples are regularly updated to reflect current German government standards and requirements.`,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
      documentType: "Passport",
      category: "sample-document",
      processingTime: "2 weeks",
      location: "Munich",
      completedDate: "20.02.2024"
    },
    {
      id: 3,
      title: "Driver\'s License Renewal - Hamburg",
      description: "Quick renewal of German driver\'s license with updated photo and address. Professional service with same-day processing available.",
      fullDescription: `Professional driver's license renewal service completed in Hamburg with same-day processing. The client needed urgent renewal due to upcoming travel requirements.\n\nOur Hamburg office provided comprehensive support including photo services, document verification, and direct submission to local authorities. The renewed license was ready within 24 hours.\n\nThis case demonstrates our ability to handle urgent requests while maintaining full compliance with German regulations.`,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop",
      documentType: "Driver\'s License",
      category: "success-story",
      processingTime: "1 day",
      location: "Hamburg",
      clientName: "Thomas Mueller",
      completedDate: "10.03.2024",
      testimonial: "Amazing service! I needed my license renewed urgently and they delivered exactly as promised. The staff was helpful and the process was seamless."
    },
    {
      id: 4,
      title: "Birth Certificate Authentication",
      description: "Official authentication and translation of foreign birth certificate for German residency application. Certified translation included.",
      fullDescription: `Complete authentication and certified translation service for foreign birth certificate required for German residency application.\n\nThe process included document verification, official translation by certified translators, and authentication by relevant German authorities. All work was completed according to German legal requirements.\n\nThis service is essential for individuals applying for German residency or citizenship who need their foreign documents officially recognized.`,
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&h=300&fit=crop",
      documentType: "Birth Certificate",
      category: "sample-document",
      processingTime: "1 week",
      location: "Cologne",
      completedDate: "05.03.2024"
    },
    {
      id: 5,
      title: "Marriage Certificate Processing",
      description: "Complete processing of marriage certificate for visa application. Includes apostille and certified translation services.",
      fullDescription: `Comprehensive marriage certificate processing service including apostille certification and official translation for visa application purposes.\n\nThe service covered document collection, apostille processing, certified translation, and final verification. All steps were completed within the promised timeframe.\n\nThis type of processing is crucial for family visa applications and other legal procedures requiring official marriage documentation.`,
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&h=300&fit=crop",
      documentType: "Marriage Certificate",
      category: "testimonial",
      processingTime: "10 days",
      location: "Frankfurt",
      clientName: "Anna Schmidt",
      completedDate: "28.02.2024",
      testimonial: "Professional and reliable service. They handled all the complex requirements for my marriage certificate processing. Everything was perfect and delivered on time."
    },
    {
      id: 6,
      title: "Student Visa Document Package",
      description: "Complete document package preparation for German student visa application. All required documents processed and verified.",
      fullDescription: `Comprehensive document package preparation service for German student visa application, including all required documents processed and verified according to German embassy requirements.\n\nThe package included academic transcripts, financial statements, health insurance documentation, and accommodation proof. All documents were properly formatted and certified.\n\nOur student visa document service has a 98% success rate for visa approvals, helping students achieve their educational goals in Germany.`,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=300&fit=crop",
      documentType: "Visa Documents",
      category: "success-story",
      processingTime: "2 weeks",
      location: "Berlin",
      clientName: "Ahmed Hassan",
      completedDate: "22.02.2024",
      testimonial: "Excellent support throughout the entire process. They made sure every document was perfect for my student visa application. Highly professional team!"
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Filter and search logic
  const filteredItems = useMemo(() => {
    let filtered = mockGalleryData;

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.documentType.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower) ||
        (item.clientName && item.clientName.toLowerCase().includes(searchLower))
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(item => {
          switch (key) {
            case 'documentType':
              return item.documentType.toLowerCase().replace(/\s+/g, '-').includes(value);
            case 'processingTime':
              if (value === 'fast') return item.processingTime.includes('day') || item.processingTime.includes('1-3');
              if (value === 'standard') return item.processingTime.includes('week') && !item.processingTime.includes('2-4');
              if (value === 'extended') return item.processingTime.includes('2-4');
              return true;
            case 'clientLocation':
              return item.location.toLowerCase() === value;
            case 'category':
              return item.category === value;
            default:
              return true;
          }
        });
      }
    });

    return filtered;
  }, [searchTerm, filters]);

  // Pagination logic
  const itemsPerPage = 6;
  const paginatedItems = filteredItems.slice(0, currentPage * itemsPerPage);
  const hasMoreItems = filteredItems.length > currentPage * itemsPerPage;

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setLoading(false);
    }, 1000);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleRemoveFilter = (filterType) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: ''
    }));
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setFilters({
      documentType: '',
      processingTime: '',
      clientLocation: '',
      category: ''
    });
    setCurrentPage(1);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  const handleShare = (item) => {
    setShareItem(item);
    setIsShareModalOpen(true);
  };

  const handleApplyForService = () => {
    navigate('/document-application-form');
  };

  const translations = {
    en: {
      pageTitle: 'Document Gallery',
      pageDescription: 'Explore our collection of sample documents and client success stories',
      applyNow: 'Apply for Document Service',
      showingResults: 'Showing {count} of {total} documents',
      noResults: 'No documents found matching your criteria'
    },
    de: {
      pageTitle: 'Dokumentengalerie',
      pageDescription: 'Entdecken Sie unsere Sammlung von Musterdokumenten und Kundenerfolgsgeschichten',
      applyNow: 'Für Dokumentenservice bewerben',
      showingResults: '{count} von {total} Dokumenten angezeigt',
      noResults: 'Keine Dokumente gefunden, die Ihren Kriterien entsprechen'
    }
  };

  const t = translations[currentLanguage];

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation />
      <BreadcrumbNavigation />
      
      <div className="pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                  {t.pageTitle}
                </h1>
                <p className="text-lg font-body text-text-secondary">
                  {t.pageDescription}
                </p>
              </div>
              
              <Button
                variant="primary"
                onClick={handleApplyForService}
                iconName="FileEdit"
                iconPosition="left"
                className="lg:ml-4"
              >
                {t.applyNow}
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:w-1/4">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearAllFilters}
                isVisible={true}
                onToggle={() => {}}
                currentLanguage={currentLanguage}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:w-3/4">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearAllFilters}
                  isVisible={isFilterSidebarVisible}
                  onToggle={() => setIsFilterSidebarVisible(!isFilterSidebarVisible)}
                  currentLanguage={currentLanguage}
                />
              </div>

              {/* Search Bar */}
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
                currentLanguage={currentLanguage}
              />

              {/* Active Filters */}
              <ActiveFilters
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAllFilters}
                currentLanguage={currentLanguage}
              />

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm font-body text-text-secondary">
                  {t.showingResults
                    .replace('{count}', paginatedItems.length)
                    .replace('{total}', filteredItems.length)}
                </p>
              </div>

              {/* Gallery Grid */}
              <GalleryGrid
                items={paginatedItems}
                loading={loading}
                onCardClick={handleCardClick}
                onShare={handleShare}
                currentLanguage={currentLanguage}
                hasMore={hasMoreItems}
                onLoadMore={handleLoadMore}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal
        item={selectedItem}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedItem(null);
        }}
        onShare={handleShare}
        currentLanguage={currentLanguage}
      />

      {/* Share Modal */}
      <ShareModal
        item={shareItem}
        isOpen={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false);
          setShareItem(null);
        }}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default DocumentGallery;