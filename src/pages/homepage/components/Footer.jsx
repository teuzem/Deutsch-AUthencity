import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      companyDescription: 'Your trusted partner for German document authentication and services. We help thousands of customers worldwide with their German document needs.',
      quickLinks: 'Quick Links',
      services: 'Services',
      support: 'Support',
      company: 'Company',
      contact: 'Contact Information',
      followUs: 'Follow Us',
      newsletter: 'Newsletter',
      newsletterText: 'Stay updated with our latest news and offers',
      subscribe: 'Subscribe',
      emailPlaceholder: 'Enter your email',
      allRightsReserved: 'All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      cookiePolicy: 'Cookie Policy',
      links: {
        home: 'Home',
        about: 'About Us',
        services: 'Services',
        contact: 'Contact',
        blog: 'Blog',
        careers: 'Careers',
        passport: 'German Passport',
        idCard: 'German ID Card',
        visa: 'Visa Application',
        birthCertificate: 'Birth Certificate',
        marriageCertificate: 'Marriage Certificate',
        residencePermit: 'Residence Permit',
        helpCenter: 'Help Center',
        faq: 'FAQ',
        documentation: 'Documentation',
        apiReference: 'API Reference',
        statusPage: 'Status Page',
        security: 'Security'
      }
    },
    de: {
      companyDescription: 'Ihr vertrauensvoller Partner für deutsche Dokumentenauthentifizierung und -dienstleistungen. Wir helfen tausenden Kunden weltweit mit ihren deutschen Dokumentenanforderungen.',
      quickLinks: 'Schnellzugriff',
      services: 'Dienstleistungen',
      support: 'Support',
      company: 'Unternehmen',
      contact: 'Kontaktinformationen',
      followUs: 'Folgen Sie uns',
      newsletter: 'Newsletter',
      newsletterText: 'Bleiben Sie über unsere neuesten Nachrichten und Angebote auf dem Laufenden',
      subscribe: 'Abonnieren',
      emailPlaceholder: 'E-Mail eingeben',
      allRightsReserved: 'Alle Rechte vorbehalten.',
      privacyPolicy: 'Datenschutzrichtlinie',
      termsOfService: 'Nutzungsbedingungen',
      cookiePolicy: 'Cookie-Richtlinie',
      links: {
        home: 'Startseite',
        about: 'Über uns',
        services: 'Dienstleistungen',
        contact: 'Kontakt',
        blog: 'Blog',
        careers: 'Karriere',
        passport: 'Deutscher Reisepass',
        idCard: 'Deutscher Personalausweis',
        visa: 'Visa-Antrag',
        birthCertificate: 'Geburtsurkunde',
        marriageCertificate: 'Heiratsurkunde',
        residencePermit: 'Aufenthaltserlaubnis',
        helpCenter: 'Hilfe-Center',
        faq: 'FAQ',
        documentation: 'Dokumentation',
        apiReference: 'API-Referenz',
        statusPage: 'Status-Seite',
        security: 'Sicherheit'
      }
    }
  };

  const t = translations[currentLanguage];

  const quickLinks = [
    { label: t.links.home, path: '/' },
    { label: t.links.about, path: '/about' },
    { label: t.links.services, path: '/document-gallery' },
    { label: t.links.contact, path: '/contact' },
    { label: t.links.blog, path: '/blog' },
    { label: t.links.careers, path: '/careers' }
  ];

  const serviceLinks = [
    { label: t.links.passport, path: '/document-gallery?service=passport' },
    { label: t.links.idCard, path: '/document-gallery?service=id-card' },
    { label: t.links.visa, path: '/document-gallery?service=visa' },
    { label: t.links.birthCertificate, path: '/document-gallery?service=birth-certificate' },
    { label: t.links.marriageCertificate, path: '/document-gallery?service=marriage-certificate' },
    { label: t.links.residencePermit, path: '/document-gallery?service=residence-permit' }
  ];

  const supportLinks = [
    { label: t.links.helpCenter, path: '/help' },
    { label: t.links.faq, path: '/faq' },
    { label: t.links.documentation, path: '/docs' },
    { label: t.links.apiReference, path: '/api' },
    { label: t.links.statusPage, path: '/status' },
    { label: t.links.security, path: '/security' }
  ];

  const companyLinks = [
    { label: t.links.about, path: '/about' },
    { label: t.links.careers, path: '/careers' },
    { label: t.links.blog, path: '/blog' },
    { label: t.privacyPolicy, path: '/privacy' },
    { label: t.termsOfService, path: '/terms' },
    { label: t.cookiePolicy, path: '/cookies' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/authencity' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/authencity' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/authencity' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/authencity' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-text-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary via-accent to-warning rounded-lg flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-xl">A</span>
                </div>
                <span className="text-2xl font-heading font-bold">Authencity Portal</span>
              </div>
              <p className="text-gray-300 font-body leading-relaxed max-w-md">
                {t.companyDescription}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <h4 className="font-heading font-semibold text-lg">{t.contact}</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={18} className="text-accent" />
                    <span className="text-gray-300 font-body">+49 30 12345678</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={18} className="text-accent" />
                    <span className="text-gray-300 font-body">support@authencity.de</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="MapPin" size={18} className="text-accent" />
                    <span className="text-gray-300 font-body">Berlin, Germany</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="font-heading font-semibold text-lg">{t.quickLinks}</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="text-gray-300 hover:text-accent transition-quick font-body"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="font-heading font-semibold text-lg">{t.services}</h4>
              <ul className="space-y-3">
                {serviceLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="text-gray-300 hover:text-accent transition-quick font-body"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Support and Company Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Support */}
            <div className="space-y-6">
              <h4 className="font-heading font-semibold text-lg">{t.support}</h4>
              <ul className="grid grid-cols-2 gap-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="text-gray-300 hover:text-accent transition-quick font-body"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-6">
              <h4 className="font-heading font-semibold text-lg">{t.company}</h4>
              <ul className="grid grid-cols-2 gap-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="text-gray-300 hover:text-accent transition-quick font-body"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="max-w-md mx-auto text-center space-y-4">
              <h4 className="font-heading font-semibold text-lg">{t.newsletter}</h4>
              <p className="text-gray-300 font-body">{t.newsletterText}</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent"
                />
                <button className="px-6 py-3 bg-accent text-white rounded-r-lg hover:bg-accent/90 transition-quick font-body font-medium">
                  {t.subscribe}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-300 font-body">
              © {new Date().getFullYear()} Authencity Portal. {t.allRightsReserved}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-300 font-body text-sm">{t.followUs}</span>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <button
                    key={index}
                    onClick={() => handleSocialClick(social.url)}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-smooth"
                  >
                    <Icon name={social.icon} size={20} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;