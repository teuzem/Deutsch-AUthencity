import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import WelcomeHeader from './components/WelcomeHeader';
import StatusOverviewCards from './components/StatusOverviewCards';
import RecentApplicationsList from './components/RecentApplicationsList';
import QuickActionsCard from './components/QuickActionsCard';
import ActivityFeed from './components/ActivityFeed';
import FloatingActionButton from './components/FloatingActionButton';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [user, setUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Check authentication
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/user-login');
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [navigate]);

  const translations = {
    en: {
      dashboard: 'Dashboard',
      refreshing: 'Refreshing...',
      pullToRefresh: 'Pull to refresh',
      notifications: 'Notifications',
      settings: 'Settings',
      help: 'Help & Support',
      logout: 'Logout'
    },
    de: {
      dashboard: 'Dashboard',
      refreshing: 'Aktualisierung...',
      pullToRefresh: 'Zum Aktualisieren ziehen',
      notifications: 'Benachrichtigungen',
      settings: 'Einstellungen',
      help: 'Hilfe & Support',
      logout: 'Abmelden'
    }
  };

  const t = translations[currentLanguage];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handlePullToRefresh = (e) => {
    const startY = e.touches[0].clientY;
    let currentY = startY;
    
    const handleTouchMove = (e) => {
      currentY = e.touches[0].clientY;
      const pullDistance = currentY - startY;
      
      if (pullDistance > 100 && window.scrollY === 0) {
        handleRefresh();
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Icon name="Loader" size={32} className="text-accent animate-spin" />
          </div>
          <p className="text-text-secondary font-body">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation />
      <BreadcrumbNavigation />
      
      {/* Main Content */}
      <main 
        className="pt-4 pb-24"
        onTouchStart={handlePullToRefresh}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pull to Refresh Indicator */}
          {isRefreshing && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-surface border border-border rounded-full px-4 py-2 shadow-elevation-2 z-30 flex items-center space-x-2">
              <Icon name="RefreshCw" size={16} className="text-accent animate-spin" />
              <span className="text-sm font-body text-text-primary">
                {t.refreshing}
              </span>
            </div>
          )}

          {/* Welcome Header */}
          <WelcomeHeader />

          {/* Status Overview Cards */}
          <StatusOverviewCards />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <RecentApplicationsList />
              <QuickActionsCard />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              <ActivityFeed />
              
              {/* Additional Info Cards for Desktop */}
              <div className="hidden lg:block bg-surface rounded-lg border border-border shadow-elevation-1 p-6">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Need Help?
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-background transition-quick text-left">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="MessageCircle" size={16} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-body font-medium text-text-primary">Live Chat</p>
                      <p className="text-xs text-text-secondary">Get instant help</p>
                    </div>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-background transition-quick text-left">
                    <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name="Phone" size={16} className="text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-body font-medium text-text-primary">Call Support</p>
                      <p className="text-xs text-text-secondary">+49 30 12345678</p>
                    </div>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-background transition-quick text-left">
                    <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                      <Icon name="Mail" size={16} className="text-warning" />
                    </div>
                    <div>
                      <p className="text-sm font-body font-medium text-text-primary">Email Us</p>
                      <p className="text-xs text-text-secondary">support@authencity.de</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default Dashboard;