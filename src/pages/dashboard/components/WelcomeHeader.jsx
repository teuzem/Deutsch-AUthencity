import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const translations = {
    en: {
      goodMorning: 'Good Morning',
      goodAfternoon: 'Good Afternoon',
      goodEvening: 'Good Evening',
      welcome: 'Welcome back',
      location: 'Berlin, Germany',
      lastLogin: 'Last login'
    },
    de: {
      goodMorning: 'Guten Morgen',
      goodAfternoon: 'Guten Tag',
      goodEvening: 'Guten Abend',
      welcome: 'Willkommen zurück',
      location: 'Berlin, Deutschland',
      lastLogin: 'Letzte Anmeldung'
    }
  };

  const t = translations[currentLanguage];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return t.goodMorning;
    if (hour < 18) return t.goodAfternoon;
    return t.goodEvening;
  };

  const formatTime = (date) => {
    return date.toLocaleString(currentLanguage === 'de' ? 'de-DE' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent rounded-xl p-6 text-white mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-heading font-bold mb-2">
            {getGreeting()}, {user?.name || 'User'}!
          </h1>
          <p className="text-white/90 font-body mb-1">
            {t.welcome}
          </p>
          <div className="flex items-center space-x-4 text-sm text-white/80">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={16} />
              <span>{t.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>
          {user?.lastLogin && (
            <p className="text-xs text-white/70 mt-2">
              {t.lastLogin}: {new Date(user.lastLogin).toLocaleDateString(currentLanguage === 'de' ? 'de-DE' : 'en-US')}
            </p>
          )}
        </div>
        <div className="hidden sm:block">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="User" size={32} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;