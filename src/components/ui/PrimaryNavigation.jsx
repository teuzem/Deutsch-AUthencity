import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const PrimaryNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Mock user authentication check
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const translations = {
    en: {
      services: 'Services',
      dashboard: 'Dashboard',
      account: 'Account',
      admin: 'Admin',
      documentGallery: 'Document Gallery',
      applicationForm: 'Application Form',
      login: 'Login',
      profile: 'Profile',
      applicationManagement: 'Application Management',
      logout: 'Logout'
    },
    de: {
      services: 'Dienstleistungen',
      dashboard: 'Dashboard',
      account: 'Konto',
      admin: 'Verwaltung',
      documentGallery: 'Dokumentengalerie',
      applicationForm: 'Antragsformular',
      login: 'Anmelden',
      profile: 'Profil',
      applicationManagement: 'Antragsverwaltung',
      logout: 'Abmelden'
    }
  };

  const t = translations[currentLanguage];

  const menuItems = [
    {
      label: t.services,
      path: '/document-gallery',
      icon: 'FileText',
      roles: ['client', 'advisor', 'admin'],
      children: [
        { label: t.documentGallery, path: '/document-gallery', icon: 'Gallery' },
        { label: t.applicationForm, path: '/document-application-form', icon: 'FileEdit' }
      ]
    },
    {
      label: t.dashboard,
      path: '/dashboard',
      icon: 'LayoutDashboard',
      roles: ['client', 'advisor', 'admin'],
      requiresAuth: true
    },
    {
      label: t.account,
      path: '/user-login',
      icon: 'User',
      roles: ['client', 'advisor', 'admin'],
      children: user ? [
        { label: t.profile, path: '/user-profile-management', icon: 'Settings' }
      ] : [
        { label: t.login, path: '/user-login', icon: 'LogIn' }
      ]
    }
  ];

  if (user && user.role === 'admin') {
    menuItems.push({
      label: t.admin,
      path: '/admin-application-management',
      icon: 'Shield',
      roles: ['admin']
    });
  }

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/user-login');
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'de' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const Logo = () => (
    <div 
      className="flex items-center cursor-pointer mr-8"
      onClick={() => handleNavigation('/dashboard')}
    >
      <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary via-accent to-warning rounded-lg flex items-center justify-center mr-3">
        <span className="text-white font-heading font-bold text-lg">A</span>
      </div>
      <span className="text-xl font-heading font-semibold text-primary hidden sm:block">
        Authencity Portal
      </span>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => {
              if (item.requiresAuth && !user) return null;
              
              return (
                <div key={item.label} className="relative group">
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center px-3 py-2 text-sm font-body font-medium rounded-md transition-quick hover-scale ${
                      isActivePath(item.path)
                        ? 'text-accent bg-accent/10' :'text-text-primary hover:text-accent hover:bg-accent/5'
                    }`}
                  >
                    <Icon name={item.icon} size={18} className="mr-2" />
                    {item.label}
                    {item.children && (
                      <Icon name="ChevronDown" size={16} className="ml-1" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.children && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-surface border border-border rounded-md shadow-elevation-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth z-1050">
                      <div className="py-1">
                        {item.children.map((child) => (
                          <button
                            key={child.label}
                            onClick={() => handleNavigation(child.path)}
                            className={`w-full text-left px-4 py-2 text-sm font-body flex items-center transition-quick ${
                              isActivePath(child.path)
                                ? 'text-accent bg-accent/10' :'text-text-primary hover:text-accent hover:bg-accent/5'
                            }`}
                          >
                            <Icon name={child.icon} size={16} className="mr-3" />
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop User Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              className="text-sm font-caption"
            >
              {currentLanguage.toUpperCase()}
            </Button>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 px-3 py-2 text-sm font-body font-medium text-text-primary hover:text-accent transition-quick rounded-md hover:bg-accent/5">
                  <Icon name="User" size={18} />
                  <span>{user.name || 'User'}</span>
                  <Icon name="ChevronDown" size={16} />
                </button>
                
                <div className="absolute top-full right-0 mt-1 w-48 bg-surface border border-border rounded-md shadow-elevation-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth z-1050">
                  <div className="py-1">
                    <button
                      onClick={() => handleNavigation('/user-profile-management')}
                      className="w-full text-left px-4 py-2 text-sm font-body flex items-center text-text-primary hover:text-accent hover:bg-accent/5 transition-quick"
                    >
                      <Icon name="Settings" size={16} className="mr-3" />
                      {t.profile}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm font-body flex items-center text-error hover:bg-error/5 transition-quick"
                    >
                      <Icon name="LogOut" size={16} className="mr-3" />
                      {t.logout}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                variant="primary"
                onClick={() => handleNavigation('/user-login')}
                iconName="LogIn"
                iconPosition="left"
              >
                {t.login}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              className="p-2"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-surface border-t border-border z-1100 animate-slide-down">
          <div className="px-4 py-6 space-y-4">
            {menuItems.map((item) => {
              if (item.requiresAuth && !user) return null;
              
              return (
                <div key={item.label}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center px-4 py-3 text-base font-body font-medium rounded-md transition-quick ${
                      isActivePath(item.path)
                        ? 'text-accent bg-accent/10' :'text-text-primary hover:text-accent hover:bg-accent/5'
                    }`}
                  >
                    <Icon name={item.icon} size={20} className="mr-3" />
                    {item.label}
                  </button>
                  
                  {item.children && (
                    <div className="ml-6 mt-2 space-y-2">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => handleNavigation(child.path)}
                          className={`w-full flex items-center px-4 py-2 text-sm font-body rounded-md transition-quick ${
                            isActivePath(child.path)
                              ? 'text-accent bg-accent/10' :'text-text-secondary hover:text-accent hover:bg-accent/5'
                          }`}
                        >
                          <Icon name={child.icon} size={16} className="mr-3" />
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            
            <div className="border-t border-border pt-4 mt-6">
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm font-body text-text-secondary">Language</span>
                <Button
                  variant="ghost"
                  onClick={toggleLanguage}
                  className="text-sm font-caption"
                >
                  {currentLanguage.toUpperCase()}
                </Button>
              </div>
              
              {user ? (
                <div className="space-y-2">
                  <button
                    onClick={() => handleNavigation('/user-profile-management')}
                    className="w-full flex items-center px-4 py-3 text-base font-body text-text-primary hover:text-accent hover:bg-accent/5 rounded-md transition-quick"
                  >
                    <Icon name="Settings" size={20} className="mr-3" />
                    {t.profile}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-base font-body text-error hover:bg-error/5 rounded-md transition-quick"
                  >
                    <Icon name="LogOut" size={20} className="mr-3" />
                    {t.logout}
                  </button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => handleNavigation('/user-login')}
                  iconName="LogIn"
                  iconPosition="left"
                  fullWidth
                  className="mx-4 mt-2"
                >
                  {t.login}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PrimaryNavigation;