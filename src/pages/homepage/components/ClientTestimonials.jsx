import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ClientTestimonials = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      testimonialsTitle: 'What Our Clients Say',
      testimonialsSubtitle: 'Join thousands of satisfied customers who trust Authencity',
      verified: 'Verified Client'
    },
    de: {
      testimonialsTitle: 'Was unsere Kunden sagen',
      testimonialsSubtitle: 'Schließen Sie sich tausenden zufriedenen Kunden an, die Authencity vertrauen',
      verified: 'Verifizierter Kunde'
    }
  };

  const t = translations[currentLanguage];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'Munich, Germany',
      locationDe: 'München, Deutschland',
      service: 'German Passport',
      serviceDe: 'Deutscher Reisepass',
      rating: 5,
      text: 'Exceptional service! The team guided me through every step of the passport application process. Everything was handled professionally and efficiently.',
      textDe: 'Außergewöhnlicher Service! Das Team hat mich durch jeden Schritt des Reisepass-Antragsverfahrens geführt. Alles wurde professionell und effizient abgewickelt.',
      avatar: '/api/placeholder/60/60',
      date: '2 weeks ago',
      dateDe: 'vor 2 Wochen'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Berlin, Germany',
      locationDe: 'Berlin, Deutschland',
      service: 'Visa Application',
      serviceDe: 'Visa-Antrag',
      rating: 5,
      text: 'Outstanding support throughout my visa application. The expert consultation was invaluable and helped me avoid common mistakes.',
      textDe: 'Hervorragende Unterstützung während meines Visa-Antrags. Die Expertenberatung war von unschätzbarem Wert und half mir, häufige Fehler zu vermeiden.',
      avatar: '/api/placeholder/60/60',
      date: '1 month ago',
      dateDe: 'vor 1 Monat'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      location: 'Hamburg, Germany',
      locationDe: 'Hamburg, Deutschland',
      service: 'Birth Certificate',
      serviceDe: 'Geburtsurkunde',
      rating: 5,
      text: 'Fast and reliable service. My birth certificate was processed and translated within 24 hours. Highly recommended!',
      textDe: 'Schneller und zuverlässiger Service. Meine Geburtsurkunde wurde innerhalb von 24 Stunden bearbeitet und übersetzt. Sehr empfehlenswert!',
      avatar: '/api/placeholder/60/60',
      date: '3 weeks ago',
      dateDe: 'vor 3 Wochen'
    },
    {
      id: 4,
      name: 'David Müller',
      location: 'Frankfurt, Germany',
      locationDe: 'Frankfurt, Deutschland',
      service: 'Marriage Certificate',
      serviceDe: 'Heiratsurkunde',
      rating: 5,
      text: 'Professional and caring service. The team understood our urgency and delivered our marriage certificate authentication ahead of schedule.',
      textDe: 'Professioneller und fürsorglicher Service. Das Team verstand unsere Dringlichkeit und lieferte unsere Heiratsurkunden-Beglaubigung vor dem Zeitplan.',
      avatar: '/api/placeholder/60/60',
      date: '1 week ago',
      dateDe: 'vor 1 Woche'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      location: 'Stuttgart, Germany',
      locationDe: 'Stuttgart, Deutschland',
      service: 'Residence Permit',
      serviceDe: 'Aufenthaltserlaubnis',
      rating: 5,
      text: 'The best document service I\'ve ever used. Clear communication, transparent pricing, and excellent results.',
      textDe: 'Der beste Dokumentenservice, den ich je genutzt habe. Klare Kommunikation, transparente Preise und hervorragende Ergebnisse.',
      avatar: '/api/placeholder/60/60',
      date: '2 months ago',
      dateDe: 'vor 2 Monaten'
    },
    {
      id: 6,
      name: 'Ahmed Hassan',
      location: 'Cologne, Germany',
      locationDe: 'Köln, Deutschland',
      service: 'German ID Card',
      serviceDe: 'Deutscher Personalausweis',
      rating: 5,
      text: 'Incredible attention to detail and customer service. The whole process was smooth and stress-free.',
      textDe: 'Unglaubliche Aufmerksamkeit für Details und Kundenservice. Der gesamte Prozess war reibungslos und stressfrei.',
      avatar: '/api/placeholder/60/60',
      date: '5 days ago',
      dateDe: 'vor 5 Tagen'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={`${index < rating ? 'text-warning fill-current' : 'text-border'}`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary">
            {t.testimonialsTitle}
          </h2>
          <p className="text-xl text-text-secondary font-body max-w-3xl mx-auto">
            {t.testimonialsSubtitle}
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-surface rounded-2xl border border-border shadow-elevation-2 p-8 md:p-12">
            <div className="text-center space-y-6">
              {/* Quote */}
              <div className="relative">
                <Icon name="Quote" size={48} className="text-accent/20 absolute -top-6 -left-6" />
                <blockquote className="text-xl md:text-2xl font-body text-text-primary leading-relaxed italic">
                  "{currentLanguage === 'de' ? testimonials[activeTestimonial]?.textDe : testimonials[activeTestimonial]?.text}"
                </blockquote>
              </div>

              {/* Rating */}
              <div className="flex justify-center space-x-1">
                {renderStars(testimonials[activeTestimonial]?.rating)}
              </div>

              {/* Client Info */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-lg">
                    {testimonials[activeTestimonial]?.name?.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <div className="font-heading font-semibold text-text-primary">
                    {testimonials[activeTestimonial]?.name}
                  </div>
                  <div className="text-text-secondary text-sm font-body">
                    {currentLanguage === 'de' ? testimonials[activeTestimonial]?.locationDe : testimonials[activeTestimonial]?.location}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Icon name="Shield" size={14} className="text-success" />
                    <span className="text-success text-xs font-body">{t.verified}</span>
                  </div>
                </div>
              </div>

              {/* Service Tag */}
              <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full">
                <span className="text-sm font-body font-medium">
                  {currentLanguage === 'de' ? testimonials[activeTestimonial]?.serviceDe : testimonials[activeTestimonial]?.service}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-surface rounded-xl border border-border p-6 cursor-pointer transition-smooth ${
                index === activeTestimonial 
                  ? 'border-accent shadow-elevation-2 scale-105' 
                  : 'hover:border-accent/50 hover:shadow-elevation-1'
              }`}
              onClick={() => setActiveTestimonial(index)}
            >
              {/* Client Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-body font-medium text-text-primary text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-text-secondary text-xs font-body">
                    {currentLanguage === 'de' ? testimonial.locationDe : testimonial.location}
                  </div>
                </div>
                <div className="flex space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-text-secondary font-body text-sm leading-relaxed mb-4 line-clamp-3">
                "{currentLanguage === 'de' ? testimonial.textDe : testimonial.text}"
              </blockquote>

              {/* Service & Date */}
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full font-body">
                  {currentLanguage === 'de' ? testimonial.serviceDe : testimonial.service}
                </span>
                <span className="text-xs text-text-muted font-body">
                  {currentLanguage === 'de' ? testimonial.dateDe : testimonial.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-smooth ${
                index === activeTestimonial 
                  ? 'bg-accent' :'bg-border hover:bg-text-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;