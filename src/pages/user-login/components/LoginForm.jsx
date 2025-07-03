import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ currentLanguage, onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginAttempts, setLoginAttempts] = useState(0);
  const navigate = useNavigate();

  const translations = {
    en: {
      signIn: 'Sign In',
      email: 'Email Address',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      signingIn: 'Signing in...',
      invalidCredentials: 'Invalid email or password. Please try again.',
      accountLocked: 'Account temporarily locked due to multiple failed attempts.',
      emailRequired: 'Email address is required',
      passwordRequired: 'Password is required',
      invalidEmail: 'Please enter a valid email address'
    },
    de: {
      signIn: 'Anmelden',
      email: 'E-Mail-Adresse',
      password: 'Passwort',
      rememberMe: 'Angemeldet bleiben',
      forgotPassword: 'Passwort vergessen?',
      showPassword: 'Passwort anzeigen',
      hidePassword: 'Passwort verbergen',
      signingIn: 'Anmeldung läuft...',
      invalidCredentials: 'Ungültige E-Mail oder Passwort. Bitte versuchen Sie es erneut.',
      accountLocked: 'Konto aufgrund mehrerer fehlgeschlagener Versuche vorübergehend gesperrt.',
      emailRequired: 'E-Mail-Adresse ist erforderlich',
      passwordRequired: 'Passwort ist erforderlich',
      invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    }
  };

  const t = translations[currentLanguage];

  // Mock credentials for different user types
  const mockCredentials = {
    'client@authencity.de': { password: 'Client123!', role: 'client', name: 'Max Müller' },
    'advisor@authencity.de': { password: 'Advisor123!', role: 'advisor', name: 'Anna Schmidt' },
    'admin@authencity.de': { password: 'Admin123!', role: 'admin', name: 'Thomas Weber' }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (!formData.password.trim()) {
      newErrors.password = t.passwordRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loginAttempts >= 3) {
      setErrors({ general: t.accountLocked });
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const user = mockCredentials[formData.email.toLowerCase()];
      
      if (user && user.password === formData.password) {
        // Successful login
        const userData = {
          email: formData.email,
          name: user.name,
          role: user.role,
          loginTime: new Date().toISOString()
        };

        localStorage.setItem('user', JSON.stringify(userData));
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        onLogin(userData);
        navigate('/dashboard');
      } else {
        // Failed login
        setLoginAttempts(prev => prev + 1);
        setErrors({ general: t.invalidCredentials });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to password reset
    alert('Password reset functionality would be implemented here.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="bg-error/10 border border-error/20 rounded-md p-4">
          <div className="flex items-center">
            <Icon name="AlertCircle" size={20} className="text-error mr-3 flex-shrink-0" />
            <p className="text-sm font-body text-error">{errors.general}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-body font-medium text-text-primary mb-2">
            {t.email}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="max.mueller@example.com"
            required
            disabled={isLoading}
            className={errors.email ? 'border-error focus:border-error' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-body font-medium text-text-primary mb-2">
            {t.password}
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
              disabled={isLoading}
              className={`pr-12 ${errors.password ? 'border-error focus:border-error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-quick"
              aria-label={showPassword ? t.hidePassword : t.showPassword}
              disabled={isLoading}
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-error">{errors.password}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <Input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-4 h-4 mr-2"
          />
          <span className="text-sm font-body text-text-secondary">{t.rememberMe}</span>
        </label>

        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm font-body text-accent hover:text-accent/80 transition-quick"
          disabled={isLoading}
        >
          {t.forgotPassword}
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={isLoading}
        loading={isLoading}
        className="gradient-authority"
      >
        {isLoading ? t.signingIn : t.signIn}
      </Button>

      {loginAttempts > 0 && loginAttempts < 3 && (
        <p className="text-sm text-warning text-center">
          {loginAttempts === 1 ? '2 attempts remaining' : '1 attempt remaining'}
        </p>
      )}
    </form>
  );
};

export default LoginForm;