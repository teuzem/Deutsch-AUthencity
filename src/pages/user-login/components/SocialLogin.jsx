import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = ({ currentLanguage }) => {
  const [isLoading, setIsLoading] = useState({});

  const translations = {
    en: {
      continueWith: 'Continue with',
      orSignInWith: 'Or sign in with'
    },
    de: {
      continueWith: 'Weiter mit',
      orSignInWith: 'Oder anmelden mit'
    }
  };

  const t = translations[currentLanguage];

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Mail',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'Square',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    }
  ];

  const handleSocialLogin = async (provider) => {
    setIsLoading(prev => ({ ...prev, [provider.id]: true }));
    
    try {
      // Simulate social login process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would redirect to the social provider
      alert(`${provider.name} login would be implemented here with OAuth flow.`);
    } catch (error) {
      console.error(`${provider.name} login failed:`, error);
    } finally {
      setIsLoading(prev => ({ ...prev, [provider.id]: false }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-text-secondary font-body">
            {t.orSignInWith}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            onClick={() => handleSocialLogin(provider)}
            disabled={isLoading[provider.id]}
            loading={isLoading[provider.id]}
            className="flex items-center justify-center space-x-2 py-3"
          >
            <Icon name={provider.icon} size={20} />
            <span className="font-body font-medium">
              {provider.name}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;