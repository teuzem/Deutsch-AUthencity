import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ClientTestimonials = ({ currentLanguage }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const translations = {
    en: {
      clientStories: 'Client Success Stories',
      verified: 'Verified Client',
      nextTestimonial: 'Next testimonial',
      previousTestimonial: 'Previous testimonial'
    },
    de: {
      clientStories: 'Erfolgsgeschichten unserer Kunden',
      verified: 'Verifizierter Kunde',
      nextTestimonial: 'Nächstes Testimonial',
      previousTestimonial: 'Vorheriges Testimonial'
    }
  };

  const t = translations[currentLanguage];

  const testimonials = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      location: 'Berlin, Germany',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      text: `The document application process was incredibly smooth. I received my German ID card within 3 weeks, and the team kept me updated throughout the entire process. Highly recommended!`,
      document: 'German ID Card',
      processTime: '3 weeks',
      verified: true
    },
    {
      id: 2,
      name: 'Ahmed Hassan',
      location: 'Munich, Germany',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      text: `Excellent service for passport renewal. The online platform made everything easy to understand, and the multilingual support was very helpful for my family.`,
      document: 'German Passport',
      processTime: '4 weeks',
      verified: true
    },
    {
      id: 3,
      name: 'Sophie Chen',
      location: 'Hamburg, Germany',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      text: `Professional and efficient service. The team guided me through the driver's license application process step by step. Great experience overall!`,
      document: 'German Driver\'s License',
      processTime: '5 weeks',
      verified: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrevious = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          {t.clientStories}
        </h3>
        <div className="flex items-center justify-center space-x-1">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-quick ${
                index === currentTestimonial ? 'bg-accent' : 'bg-border'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <Image
              src={currentTestimonialData.avatar}
              alt={`${currentTestimonialData.name} avatar`}
              className="w-12 h-12 rounded-full object-cover"
            />
            {currentTestimonialData.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} className="text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-body font-semibold text-text-primary">
                {currentTestimonialData.name}
              </h4>
              <div className="flex items-center space-x-1">
                {[...Array(currentTestimonialData.rating)].map((_, i) => (
                  <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
                ))}
              </div>
            </div>
            <p className="text-sm font-body text-text-secondary">
              {currentTestimonialData.location}
            </p>
            {currentTestimonialData.verified && (
              <div className="flex items-center mt-1">
                <Icon name="CheckCircle" size={14} className="text-success mr-1" />
                <span className="text-xs font-caption text-success">{t.verified}</span>
              </div>
            )}
          </div>
        </div>

        <blockquote className="text-sm font-body text-text-primary mb-4 leading-relaxed">
          "{currentTestimonialData.text}"
        </blockquote>

        <div className="flex items-center justify-between text-xs font-caption text-text-secondary">
          <span className="bg-accent/10 text-accent px-2 py-1 rounded">
            {currentTestimonialData.document}
          </span>
          <span>Processed in {currentTestimonialData.processTime}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          className="flex items-center space-x-2 text-sm font-body text-text-secondary hover:text-accent transition-quick"
          aria-label={t.previousTestimonial}
        >
          <Icon name="ChevronLeft" size={16} />
          <span>Previous</span>
        </button>
        
        <span className="text-sm font-caption text-text-secondary">
          {currentTestimonial + 1} of {testimonials.length}
        </span>
        
        <button
          onClick={handleNext}
          className="flex items-center space-x-2 text-sm font-body text-text-secondary hover:text-accent transition-quick"
          aria-label={t.nextTestimonial}
        >
          <span>Next</span>
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
    </div>
  );
};

export default ClientTestimonials;