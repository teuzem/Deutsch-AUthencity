import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import TrustIndicators from './components/TrustIndicators';
import ClientTestimonials from './components/ClientTestimonials';
import DocumentPreview from './components/DocumentPreview';

const UserLogin = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Check if user is already logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      navigate('/dashboard');
    }
  }, [navigate]);

  const translations = {
    en: {
      welcomeBack: 'Welcome Back',
      signInToAccount: 'Sign in to your Authencity account',
      newToAuthencity: 'New to Authencity?',
      createAccount: 'Create an account',
      getStarted: 'Get started with your document application',
      secureAccess: 'Secure access to your document services',
      mockCredentials: 'Demo Credentials',
      clientLogin: 'Client Login',
      advisorLogin: 'Advisor Login',
      adminLogin: 'Admin Login'
    },
    de: {
      welcomeBack: 'Willkommen zurück',
      signInToAccount: 'Melden Sie sich bei Ihrem Authencity-Konto an',
      newToAuthencity: 'Neu bei Authencity?',
      createAccount: 'Konto erstellen',
      getStarted: 'Beginnen Sie mit Ihrem Dokumentenantrag',
      secureAccess: 'Sicherer Zugang zu Ihren Dokumentenservices',
      mockCredentials: 'Demo-Anmeldedaten',
      clientLogin: 'Kunden-Anmeldung',
      advisorLogin: 'Berater-Anmeldung',
      adminLogin: 'Admin-Anmeldung'
    }
  };

  const t = translations[currentLanguage];

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleCreateAccount = () => {
    navigate('/document-application-form');
  };

  const mockCredentials = [
    {
      type: t.clientLogin,
      email: 'client@authencity.de',
      password: 'Client123!',
      role: 'client',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      type: t.advisorLogin,
      email: 'advisor@authencity.de',
      password: 'Advisor123!',
      role: 'advisor',
      color: 'bg-green-50 border-green-200'
    },
    {
      type: t.adminLogin,
      email: 'admin@authencity.de',
      password: 'Admin123!',
      role: 'admin',
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation />
      <BreadcrumbNavigation />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Login Section */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary via-secondary via-accent to-warning rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="Shield" size={32} className="text-white" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary mb-2">
                    {t.welcomeBack}
                  </h1>
                  <p className="text-base font-body text-text-secondary">
                    {t.signInToAccount}
                  </p>
                </div>

                {/* Social Login */}
                <div className="mb-6">
                  <SocialLogin currentLanguage={currentLanguage} />
                </div>

                {/* Login Form */}
                <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1 mb-6">
                  <LoginForm 
                    currentLanguage={currentLanguage}
                    onLogin={handleLogin}
                  />
                </div>

                {/* Registration Prompt */}
                <div className="text-center">
                  <p className="text-sm font-body text-text-secondary mb-4">
                    {t.newToAuthencity}
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleCreateAccount}
                    iconName="UserPlus"
                    iconPosition="left"
                    fullWidth
                  >
                    {t.createAccount}
                  </Button>
                  <p className="text-xs font-caption text-text-secondary mt-2">
                    {t.getStarted}
                  </p>
                </div>

                {/* Mock Credentials for Demo */}
                <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-heading font-semibold text-text-primary mb-3 flex items-center">
                    <Icon name="Info" size={16} className="mr-2 text-accent" />
                    {t.mockCredentials}
                  </h3>
                  <div className="space-y-2">
                    {mockCredentials.map((cred, index) => (
                      <div key={index} className={`p-3 rounded border ${cred.color}`}>
                        <p className="text-xs font-caption font-semibold text-gray-700 mb-1">
                          {cred.type}
                        </p>
                        <p className="text-xs font-data text-gray-600">
                          Email: {cred.email}
                        </p>
                        <p className="text-xs font-data text-gray-600">
                          Password: {cred.password}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Trust & Security Section */}
            <div className="lg:col-span-3 xl:col-span-3">
              <div className="sticky top-24">
                <TrustIndicators currentLanguage={currentLanguage} />
              </div>
            </div>

            {/* Testimonials & Document Preview */}
            <div className="lg:col-span-4 xl:col-span-5 space-y-8">
              {/* Client Testimonials */}
              <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
                <ClientTestimonials currentLanguage={currentLanguage} />
              </div>

              {/* Document Preview */}
              <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
                <DocumentPreview currentLanguage={currentLanguage} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-secondary via-accent to-warning rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-heading font-bold text-sm">A</span>
                </div>
                <span className="text-lg font-heading font-semibold">Authencity Portal</span>
              </div>
              <p className="text-sm font-body text-white/80">
                {t.secureAccess}
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm font-body text-white/80">
                <p>submit@authencity.de</p>
                <p>contact@authencity.de</p>
                <p>@deutschauthencity</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Security</h4>
              <div className="flex items-center space-x-4">
                <Icon name="Shield" size={20} className="text-success" />
                <Icon name="Lock" size={20} className="text-success" />
                <Icon name="CheckCircle" size={20} className="text-success" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-sm font-caption text-white/60">
              © {new Date().getFullYear()} Authencity Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLogin;