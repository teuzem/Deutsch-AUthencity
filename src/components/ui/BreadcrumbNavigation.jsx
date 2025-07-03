import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      home: 'Home',
      dashboard: 'Dashboard',
      services: 'Services',
      documentGallery: 'Document Gallery',
      documentApplicationForm: 'Application Form',
      userLogin: 'Login',
      userProfileManagement: 'Profile Management',
      adminApplicationManagement: 'Application Management',
      account: 'Account'
    },
    de: {
      home: 'Startseite',
      dashboard: 'Dashboard',
      services: 'Dienstleistungen',
      documentGallery: 'Dokumentengalerie',
      documentApplicationForm: 'Antragsformular',
      userLogin: 'Anmelden',
      userProfileManagement: 'Profilverwaltung',
      adminApplicationManagement: 'Antragsverwaltung',
      account: 'Konto'
    }
  };

  const t = translations[currentLanguage];

  const routeMap = {
    '/': { label: t.home, icon: 'Home' },
    '/dashboard': { label: t.dashboard, icon: 'LayoutDashboard', parent: '/' },
    '/document-gallery': { label: t.documentGallery, icon: 'FileText', parent: '/' },
    '/document-application-form': { label: t.documentApplicationForm, icon: 'FileEdit', parent: '/document-gallery' },
    '/user-login': { label: t.userLogin, icon: 'LogIn', parent: '/' },
    '/user-profile-management': { label: t.userProfileManagement, icon: 'Settings', parent: '/dashboard' },
    '/admin-application-management': { label: t.adminApplicationManagement, icon: 'Shield', parent: '/dashboard' }
  };

  const buildBreadcrumbs = (pathname) => {
    const breadcrumbs = [];
    let currentPath = pathname;
    
    while (currentPath && routeMap[currentPath]) {
      const route = routeMap[currentPath];
      breadcrumbs.unshift({
        path: currentPath,
        label: route.label,
        icon: route.icon
      });
      currentPath = route.parent;
    }
    
    // Always include home if not already present
    if (breadcrumbs.length === 0 || breadcrumbs[0].path !== '/') {
      breadcrumbs.unshift({
        path: '/',
        label: t.home,
        icon: 'Home'
      });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs(location.pathname);

  // Don't show breadcrumbs on home page or if only home is in breadcrumbs
  if (location.pathname === '/' || breadcrumbs.length <= 1) {
    return null;
  }

  const handleNavigation = (path) => {
    if (path === '/') {
      navigate('/dashboard'); // Redirect home to dashboard for authenticated users
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="bg-background border-b border-border py-3" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path} className="flex items-center space-x-2 flex-shrink-0">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-text-secondary flex-shrink-0" 
                />
              )}
              
              {index === breadcrumbs.length - 1 ? (
                // Current page - not clickable
                <div className="flex items-center space-x-2 px-2 py-1 rounded-md bg-accent/10">
                  <Icon 
                    name={crumb.icon} 
                    size={16} 
                    className="text-accent flex-shrink-0" 
                  />
                  <span className="text-sm font-body font-medium text-accent whitespace-nowrap">
                    {crumb.label}
                  </span>
                </div>
              ) : (
                // Clickable breadcrumb
                <button
                  onClick={() => handleNavigation(crumb.path)}
                  className="flex items-center space-x-2 px-2 py-1 rounded-md text-text-secondary hover:text-accent hover:bg-accent/5 transition-quick group"
                  aria-label={`Navigate to ${crumb.label}`}
                >
                  <Icon 
                    name={crumb.icon} 
                    size={16} 
                    className="group-hover:text-accent transition-quick flex-shrink-0" 
                  />
                  <span className="text-sm font-body whitespace-nowrap group-hover:text-accent transition-quick">
                    {crumb.label}
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BreadcrumbNavigation;