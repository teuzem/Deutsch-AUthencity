import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AccountSecuritySection = ({ 
  securitySettings, 
  onUpdate, 
  currentLanguage 
}) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const translations = {
    en: {
      accountSecurity: 'Account Security',
      passwordSecurity: 'Password Security',
      changePassword: 'Change Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      passwordStrength: 'Password Strength',
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong',
      twoFactorAuth: 'Two-Factor Authentication',
      twoFactorEnabled: 'Two-factor authentication is enabled',
      twoFactorDisabled: 'Two-factor authentication is disabled',
      enableTwoFactor: 'Enable 2FA',
      disableTwoFactor: 'Disable 2FA',
      setupTwoFactor: 'Setup Two-Factor Authentication',
      scanQrCode: 'Scan this QR code with your authenticator app',
      enterVerificationCode: 'Enter the 6-digit verification code',
      verificationCode: 'Verification Code',
      loginHistory: 'Login History',
      viewAllSessions: 'View All Sessions',
      lastLogin: 'Last Login',
      currentSession: 'Current Session',
      terminateSession: 'Terminate',
      save: 'Save Changes',
      cancel: 'Cancel',
      verify: 'Verify',
      passwordsDoNotMatch: 'Passwords do not match',
      passwordTooWeak: 'Password must be at least 8 characters with uppercase, lowercase, and numbers',
      currentPasswordRequired: 'Current password is required',
      invalidCurrentPassword: 'Current password is incorrect',
      passwordUpdated: 'Password updated successfully',
      twoFactorSetupComplete: 'Two-factor authentication setup complete',
      invalidVerificationCode: 'Invalid verification code'
    },
    de: {
      accountSecurity: 'Kontosicherheit',
      passwordSecurity: 'Passwort-Sicherheit',
      changePassword: 'Passwort ändern',
      currentPassword: 'Aktuelles Passwort',
      newPassword: 'Neues Passwort',
      confirmPassword: 'Neues Passwort bestätigen',
      passwordStrength: 'Passwort-Stärke',
      weak: 'Schwach',
      medium: 'Mittel',
      strong: 'Stark',
      twoFactorAuth: 'Zwei-Faktor-Authentifizierung',
      twoFactorEnabled: 'Zwei-Faktor-Authentifizierung ist aktiviert',
      twoFactorDisabled: 'Zwei-Faktor-Authentifizierung ist deaktiviert',
      enableTwoFactor: '2FA aktivieren',
      disableTwoFactor: '2FA deaktivieren',
      setupTwoFactor: 'Zwei-Faktor-Authentifizierung einrichten',
      scanQrCode: 'Scannen Sie diesen QR-Code mit Ihrer Authenticator-App',
      enterVerificationCode: 'Geben Sie den 6-stelligen Bestätigungscode ein',
      verificationCode: 'Bestätigungscode',
      loginHistory: 'Anmeldeverlauf',
      viewAllSessions: 'Alle Sitzungen anzeigen',
      lastLogin: 'Letzte Anmeldung',
      currentSession: 'Aktuelle Sitzung',
      terminateSession: 'Beenden',
      save: 'Änderungen speichern',
      cancel: 'Abbrechen',
      verify: 'Bestätigen',
      passwordsDoNotMatch: 'Passwörter stimmen nicht überein',
      passwordTooWeak: 'Passwort muss mindestens 8 Zeichen mit Groß-, Kleinbuchstaben und Zahlen enthalten',
      currentPasswordRequired: 'Aktuelles Passwort ist erforderlich',
      invalidCurrentPassword: 'Aktuelles Passwort ist falsch',
      passwordUpdated: 'Passwort erfolgreich aktualisiert',
      twoFactorSetupComplete: 'Zwei-Faktor-Authentifizierung erfolgreich eingerichtet',
      invalidVerificationCode: 'Ungültiger Bestätigungscode'
    }
  };

  const t = translations[currentLanguage];

  // Mock login history data
  const loginHistory = [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'Berlin, Germany',
      ipAddress: '192.168.1.100',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isCurrent: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'Munich, Germany',
      ipAddress: '192.168.1.101',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isCurrent: false
    },
    {
      id: 3,
      device: 'Firefox on MacOS',
      location: 'Hamburg, Germany',
      ipAddress: '192.168.1.102',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      isCurrent: false
    }
  ];

  const getPasswordStrength = (password) => {
    if (password.length < 6) return { level: 'weak', score: 1 };
    if (password.length < 8) return { level: 'medium', score: 2 };
    
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const score = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
    
    if (score >= 3 && password.length >= 8) return { level: 'strong', score: 3 };
    if (score >= 2) return { level: 'medium', score: 2 };
    return { level: 'weak', score: 1 };
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = t.currentPasswordRequired;
    } else if (passwordForm.currentPassword !== 'password123') { // Mock validation
      newErrors.currentPassword = t.invalidCurrentPassword;
    }
    
    if (!passwordForm.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else {
      const strength = getPasswordStrength(passwordForm.newPassword);
      if (strength.level === 'weak') {
        newErrors.newPassword = t.passwordTooWeak;
      }
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = t.passwordsDoNotMatch;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (validatePasswordForm()) {
      // Mock password update
      alert(t.passwordUpdated);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
    }
  };

  const handleTwoFactorToggle = () => {
    if (securitySettings.twoFactorEnabled) {
      // Disable 2FA
      onUpdate({ ...securitySettings, twoFactorEnabled: false });
    } else {
      // Show setup form
      setShowTwoFactorSetup(true);
    }
  };

  const handleTwoFactorSetup = (verificationCode) => {
    if (verificationCode === '123456') { // Mock verification
      onUpdate({ ...securitySettings, twoFactorEnabled: true });
      setShowTwoFactorSetup(false);
      alert(t.twoFactorSetupComplete);
    } else {
      alert(t.invalidVerificationCode);
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  const PasswordStrengthIndicator = ({ password }) => {
    const strength = getPasswordStrength(password);
    const colors = {
      weak: 'bg-error',
      medium: 'bg-warning',
      strong: 'bg-success'
    };
    
    return (
      <div className="mt-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-text-secondary">{t.passwordStrength}</span>
          <span className={`text-xs font-medium ${
            strength.level === 'weak' ? 'text-error' :
            strength.level === 'medium' ? 'text-warning' : 'text-success'
          }`}>
            {t[strength.level]}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${colors[strength.level]}`}
            style={{ width: `${(strength.score / 3) * 100}%` }}
          />
        </div>
      </div>
    );
  };

  const TwoFactorSetup = ({ onComplete, onCancel }) => {
    const [verificationCode, setVerificationCode] = useState('');
    
    return (
      <div className="p-6 bg-background rounded-lg border border-border">
        <h4 className="text-lg font-heading font-medium text-text-primary mb-4">
          {t.setupTwoFactor}
        </h4>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg mx-auto flex items-center justify-center mb-4">
              <div className="text-center">
                <Icon name="QrCode" size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">QR Code</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary">{t.scanQrCode}</p>
          </div>
          
          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {t.enterVerificationCode}
            </label>
            <Input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="123456"
              maxLength={6}
              className="text-center text-lg tracking-widest"
            />
            <p className="text-xs text-text-secondary mt-1">
              Use code: 123456 for demo
            </p>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button variant="ghost" onClick={onCancel}>
              {t.cancel}
            </Button>
            <Button 
              variant="primary" 
              onClick={() => onComplete(verificationCode)}
              disabled={verificationCode.length !== 6}
            >
              {t.verify}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center mb-6">
        <Icon name="Shield" size={24} className="text-accent mr-3" />
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          {t.accountSecurity}
        </h2>
      </div>

      <div className="space-y-8">
        {/* Password Security */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Lock" size={20} className="text-accent mr-2" />
            {t.passwordSecurity}
          </h3>
          
          {!showPasswordForm ? (
            <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
              <div>
                <p className="text-sm font-body text-text-primary">
                  Password last changed: {new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toLocaleDateString()}
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  Regular password updates help keep your account secure
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowPasswordForm(true)}
                iconName="Edit"
                iconPosition="left"
              >
                {t.changePassword}
              </Button>
            </div>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="p-4 bg-background rounded-lg border border-border space-y-4">
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  {t.currentPassword}
                </label>
                <Input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className={errors.currentPassword ? 'border-error' : ''}
                />
                {errors.currentPassword && (
                  <p className="text-error text-sm mt-1">{errors.currentPassword}</p>
                )}
                <p className="text-xs text-text-secondary mt-1">
                  Use: password123 for demo
                </p>
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  {t.newPassword}
                </label>
                <Input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  className={errors.newPassword ? 'border-error' : ''}
                />
                {errors.newPassword && (
                  <p className="text-error text-sm mt-1">{errors.newPassword}</p>
                )}
                {passwordForm.newPassword && (
                  <PasswordStrengthIndicator password={passwordForm.newPassword} />
                )}
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  {t.confirmPassword}
                </label>
                <Input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className={errors.confirmPassword ? 'border-error' : ''}
                />
                {errors.confirmPassword && (
                  <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setErrors({});
                  }}
                >
                  {t.cancel}
                </Button>
                <Button type="submit" variant="primary">
                  {t.save}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Two-Factor Authentication */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Smartphone" size={20} className="text-accent mr-2" />
            {t.twoFactorAuth}
          </h3>
          
          {!showTwoFactorSetup ? (
            <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  securitySettings.twoFactorEnabled ? 'bg-success' : 'bg-gray-300'
                }`} />
                <div>
                  <p className="text-sm font-body text-text-primary">
                    {securitySettings.twoFactorEnabled ? t.twoFactorEnabled : t.twoFactorDisabled}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    {securitySettings.twoFactorEnabled 
                      ? 'Your account is protected with 2FA' :'Add an extra layer of security to your account'
                    }
                  </p>
                </div>
              </div>
              <Button
                variant={securitySettings.twoFactorEnabled ? "outline" : "primary"}
                onClick={handleTwoFactorToggle}
                iconName={securitySettings.twoFactorEnabled ? "ShieldOff" : "Shield"}
                iconPosition="left"
              >
                {securitySettings.twoFactorEnabled ? t.disableTwoFactor : t.enableTwoFactor}
              </Button>
            </div>
          ) : (
            <TwoFactorSetup
              onComplete={handleTwoFactorSetup}
              onCancel={() => setShowTwoFactorSetup(false)}
            />
          )}
        </div>

        {/* Login History */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
            <Icon name="History" size={20} className="text-accent mr-2" />
            {t.loginHistory}
          </h3>
          
          <div className="space-y-3">
            {loginHistory.slice(0, 3).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                    session.isCurrent ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Icon name={session.device.includes('iPhone') ? 'Smartphone' : 'Monitor'} size={20} />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <p className="text-sm font-body font-medium text-text-primary">
                        {session.device}
                      </p>
                      {session.isCurrent && (
                        <span className="ml-2 px-2 py-1 text-xs font-caption bg-success text-white rounded-full">
                          {t.currentSession}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-secondary">
                      {session.location} • {session.ipAddress} • {formatTimestamp(session.timestamp)}
                    </p>
                  </div>
                </div>
                
                {!session.isCurrent && (
                  <Button
                    variant="ghost"
                    onClick={() => alert('Session terminated')}
                    className="text-error hover:bg-error/10"
                  >
                    {t.terminateSession}
                  </Button>
                )}
              </div>
            ))}
            
            <div className="text-center pt-4">
              <Button variant="ghost" iconName="ExternalLink" iconPosition="right">
                {t.viewAllSessions}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecuritySection;