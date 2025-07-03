import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import HeroCarousel from './components/HeroCarousel';
import ServicesOverview from './components/ServicesOverview';
import ClientTestimonials from './components/ClientTestimonials';
import FAQSection from './components/FAQSection';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';

const Homepage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Check authentication
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const translations = {
    en: {
      welcome: 'Welcome to Authencity',
      personalizedWelcome: 'Welcome back',
      subtitle: 'Your trusted partner for German document authentication and services',
      personalizedSubtitle: 'Your document services at a glance',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      viewDashboard: 'View Dashboard',
      applyNow: 'Apply Now',
      browseServices: 'Browse Services',
      whyChooseUs: 'Why Choose Authencity?',
      trustedBy: 'Trusted by thousands of customers',
      yearsExperience: 'Years of Experience',
      documentsProcessed: 'Documents Processed',
      customerSatisfaction: 'Customer Satisfaction',
      supportTeam: '24/7 Support Team'
    },
    de: {
      welcome: 'Willkommen bei Authencity',
      personalizedWelcome: 'Willkommen zurück',
      subtitle: 'Ihr vertrauensvoller Partner für deutsche Dokumentenauthentifizierung und -dienstleistungen',
      personalizedSubtitle: 'Ihre Dokumentenservices im Überblick',
      getStarted: 'Jetzt beginnen',
      learnMore: 'Mehr erfahren',
      viewDashboard: 'Dashboard anzeigen',
      applyNow: 'Jetzt beantragen',
      browseServices: 'Services durchsuchen',
      whyChooseUs: 'Warum Authencity wählen?',
      trustedBy: 'Vertraut von tausenden Kunden',
      yearsExperience: 'Jahre Erfahrung',
      documentsProcessed: 'Bearbeitete Dokumente',
      customerSatisfaction: 'Kundenzufriedenheit',
      supportTeam: '24/7 Support Team'
    }
  };

  const t = translations[currentLanguage];

  const stats = [
    {
      icon: 'Calendar',
      value: '10+',
      label: t.yearsExperience,
      color: 'primary'
    },
    {
      icon: 'FileText',
      value: '50K+',
      label: t.documentsProcessed,
      color: 'success'
    },
    {
      icon: 'Star',
      value: '98%',
      label: t.customerSatisfaction,
      color: 'warning'
    },
    {
      icon: 'Headphones',
      value: '24/7',
      label: t.supportTeam,
      color: 'info'
    }
  ];

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/user-login');
    }
  };

  const handleViewServices = () => {
    navigate('/document-gallery');
  };

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary">
                  {user ? (
                    <>
                      {t.personalizedWelcome}, <span className="text-accent">{user.name}</span>
                    </>
                  ) : (
                    t.welcome
                  )}
                </h1>
                <p className="text-xl text-text-secondary font-body max-w-2xl">
                  {user ? t.personalizedSubtitle : t.subtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleGetStarted}
                  iconName={user ? "LayoutDashboard" : "ArrowRight"}
                  iconPosition="right"
                  className="text-lg px-8 py-4"
                >
                  {user ? t.viewDashboard : t.getStarted}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleViewServices}
                  iconName="FileText"
                  iconPosition="left"
                  className="text-lg px-8 py-4"
                >
                  {t.browseServices}
                </Button>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className={`w-12 h-12 rounded-full bg-${stat.color}/10 flex items-center justify-center mx-auto`}>
                      <Icon name={stat.icon} size={24} className={`text-${stat.color}`} />
                    </div>
                    <div className="text-2xl font-heading font-bold text-text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-text-secondary font-body">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Hero Carousel */}
            <div className="animate-fade-in">
              <HeroCarousel />
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      </section>

      {/* Services Overview */}
      <ServicesOverview />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary">
              {t.whyChooseUs}
            </h2>
            <p className="text-xl text-text-secondary font-body max-w-3xl mx-auto">
              {t.trustedBy}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'Shield',
                title: 'Secure & Trusted',
                description: 'Bank-level security with SSL encryption and secure data handling.',
                color: 'primary'
              },
              {
                icon: 'Clock',
                title: 'Fast Processing',
                description: 'Most documents processed within 24-48 hours.',
                color: 'success'
              },
              {
                icon: 'Users',
                title: 'Expert Support',
                description: 'Dedicated support team available 24/7 to assist you.',
                color: 'warning'
              },
              {
                icon: 'Globe',
                title: 'International Coverage',
                description: 'Serving customers worldwide with local expertise.',
                color: 'info'
              },
              {
                icon: 'Award',
                title: 'Certified Quality',
                description: 'ISO certified processes ensuring highest quality standards.',
                color: 'secondary'
              },
              {
                icon: 'Smartphone',
                title: 'Mobile Friendly',
                description: 'Access your documents and services from any device.',
                color: 'accent'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-background rounded-xl p-8 hover:shadow-elevation-2 transition-smooth hover-lift">
                <div className={`w-16 h-16 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-6`}>
                  <Icon name={feature.icon} size={32} className={`text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                  {feature.title}
                </h3>
                <p className="text-text-secondary font-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <ClientTestimonials />

      {/* FAQ Section */}
      <FAQSection />

      {/* Call to Action */}
      <CallToActionSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;