import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PrivacySettingsSection = ({ 
  privacySettings, 
  onUpdate, 
  isEditing, 
  onToggleEdit,
  currentLanguage 
}) => {
  const [settings, setSettings] = useState(privacySettings);

  const translations = {
    en: {
      privacySettings: 'Privacy Settings',
      dataUsage: 'Data Usage & Processing',
      allowDataProcessing: 'Allow processing of personal data for document services',
      allowDataProcessingDesc: 'Required for processing your document applications and providing our services.',
      allowAnalytics: 'Allow usage analytics and performance tracking',
      allowAnalyticsDesc: 'Helps us improve our services and user experience.',
      allowThirdPartySharing: 'Allow sharing data with trusted third-party partners',
      allowThirdPartySharingDesc: 'Only for essential services like payment processing and document verification.',
      communications: 'Communication Preferences',
      allowEmailMarketing: 'Receive marketing emails and newsletters',
      allowEmailMarketingDesc: 'Updates about new services, promotions, and company news.',
      allowSmsNotifications: 'Receive SMS notifications for important updates',
      allowSmsNotificationsDesc: 'Application status updates and urgent notifications.',
      allowPushNotifications: 'Receive push notifications in browser',
      allowPushNotificationsDesc: 'Real-time updates about your applications and account.',
      gdprCompliance: 'GDPR Compliance',
      dataRetention: 'Data Retention Period',
      dataRetentionDesc: 'How long we keep your personal data after account closure.',
      oneYear: '1 Year',
      twoYears: '2 Years',
      fiveYears: '5 Years',
      indefinite: 'Indefinite (until requested for deletion)',
      rightToBeForgotten: 'Right to be Forgotten',
      rightToBeForgottenDesc: 'You can request complete deletion of your personal data at any time.',
      requestDataDeletion: 'Request Data Deletion',
      dataPortability: 'Data Portability',
      dataPortabilityDesc: 'Download all your personal data in a machine-readable format.',
      downloadMyData: 'Download My Data',
      edit: 'Edit',
      save: 'Save Changes',
      cancel: 'Cancel',
      confirmDataDeletion: 'Are you sure you want to request data deletion? This action cannot be undone.',
      dataExportStarted: 'Data export has been initiated. You will receive an email with download link.',
      settingsUpdated: 'Privacy settings updated successfully.'
    },
    de: {
      privacySettings: 'Datenschutzeinstellungen',
      dataUsage: 'Datennutzung & Verarbeitung',
      allowDataProcessing: 'Verarbeitung personenbezogener Daten für Dokumentenservices erlauben',
      allowDataProcessingDesc: 'Erforderlich für die Bearbeitung Ihrer Dokumentenanträge und die Bereitstellung unserer Services.',
      allowAnalytics: 'Nutzungsanalyse und Leistungsverfolgung erlauben',
      allowAnalyticsDesc: 'Hilft uns, unsere Services und Benutzererfahrung zu verbessern.',
      allowThirdPartySharing: 'Datenaustausch mit vertrauenswürdigen Drittanbietern erlauben',
      allowThirdPartySharingDesc: 'Nur für wesentliche Services wie Zahlungsabwicklung und Dokumentenverifizierung.',
      communications: 'Kommunikationseinstellungen',
      allowEmailMarketing: 'Marketing-E-Mails und Newsletter erhalten',
      allowEmailMarketingDesc: 'Updates über neue Services, Aktionen und Unternehmensnachrichten.',
      allowSmsNotifications: 'SMS-Benachrichtigungen für wichtige Updates erhalten',
      allowSmsNotificationsDesc: 'Antragsstatusupdate und dringende Benachrichtigungen.',
      allowPushNotifications: 'Push-Benachrichtigungen im Browser erhalten',
      allowPushNotificationsDesc: 'Echtzeitupdate über Ihre Anträge und Ihr Konto.',
      gdprCompliance: 'DSGVO-Konformität',
      dataRetention: 'Datenspeicherungsdauer',
      dataRetentionDesc: 'Wie lange wir Ihre personenbezogenen Daten nach Kontoschliessung aufbewahren.',
      oneYear: '1 Jahr',
      twoYears: '2 Jahre',
      fiveYears: '5 Jahre',
      indefinite: 'Unbegrenzt (bis zur Löschungsanfrage)',
      rightToBeForgotten: 'Recht auf Vergessenwerden',
      rightToBeForgottenDesc: 'Sie können jederzeit die vollständige Löschung Ihrer personenbezogenen Daten beantragen.',
      requestDataDeletion: 'Datenlöschung beantragen',
      dataPortability: 'Datenportabilität',
      dataPortabilityDesc: 'Laden Sie alle Ihre personenbezogenen Daten in einem maschinenlesbaren Format herunter.',
      downloadMyData: 'Meine Daten herunterladen',
      edit: 'Bearbeiten',
      save: 'Änderungen speichern',
      cancel: 'Abbrechen',
      confirmDataDeletion: 'Sind Sie sicher, dass Sie die Datenlöschung beantragen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
      dataExportStarted: 'Datenexport wurde eingeleitet. Sie erhalten eine E-Mail mit dem Download-Link.',
      settingsUpdated: 'Datenschutzeinstellungen erfolgreich aktualisiert.'
    }
  };

  const t = translations[currentLanguage];

  const handleToggleChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = () => {
    onUpdate(settings);
    onToggleEdit();
  };

  const handleCancel = () => {
    setSettings(privacySettings);
    onToggleEdit();
  };

  const handleDataDeletion = () => {
    if (window.confirm(t.confirmDataDeletion)) {
      // Mock data deletion request
      alert('Data deletion request submitted. You will be contacted within 30 days.');
    }
  };

  const handleDataExport = () => {
    // Mock data export
    alert(t.dataExportStarted);
  };

  const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
        checked ? 'bg-accent' : 'bg-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const SettingItem = ({ 
    title, 
    description, 
    checked, 
    onChange, 
    disabled = false,
    required = false 
  }) => (
    <div className="flex items-start justify-between py-4">
      <div className="flex-1 mr-4">
        <div className="flex items-center">
          <h4 className="text-sm font-body font-medium text-text-primary">
            {title}
          </h4>
          {required && (
            <span className="ml-2 text-xs text-accent bg-accent/10 px-2 py-1 rounded-full">
              Required
            </span>
          )}
        </div>
        <p className="text-sm text-text-secondary mt-1">{description}</p>
      </div>
      <ToggleSwitch
        checked={checked}
        onChange={onChange}
        disabled={disabled || !isEditing}
      />
    </div>
  );

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Icon name="Shield" size={24} className="text-accent mr-3" />
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            {t.privacySettings}
          </h2>
        </div>
        {!isEditing && (
          <Button
            variant="ghost"
            onClick={onToggleEdit}
            iconName="Edit"
            iconPosition="left"
            className="text-accent hover:bg-accent/10"
          >
            {t.edit}
          </Button>
        )}
      </div>

      <div className="space-y-8">
        {/* Data Usage Section */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Database" size={20} className="text-accent mr-2" />
            {t.dataUsage}
          </h3>
          <div className="space-y-2 border-l-2 border-accent/20 pl-4">
            <SettingItem
              title={t.allowDataProcessing}
              description={t.allowDataProcessingDesc}
              checked={settings.allowDataProcessing}
              onChange={(value) => handleToggleChange('allowDataProcessing', value)}
              required
              disabled
            />
            <SettingItem
              title={t.allowAnalytics}
              description={t.allowAnalyticsDesc}
              checked={settings.allowAnalytics}
              onChange={(value) => handleToggleChange('allowAnalytics', value)}
            />
            <SettingItem
              title={t.allowThirdPartySharing}
              description={t.allowThirdPartySharingDesc}
              checked={settings.allowThirdPartySharing}
              onChange={(value) => handleToggleChange('allowThirdPartySharing', value)}
            />
          </div>
        </div>

        {/* Communications Section */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
            <Icon name="MessageCircle" size={20} className="text-accent mr-2" />
            {t.communications}
          </h3>
          <div className="space-y-2 border-l-2 border-accent/20 pl-4">
            <SettingItem
              title={t.allowEmailMarketing}
              description={t.allowEmailMarketingDesc}
              checked={settings.allowEmailMarketing}
              onChange={(value) => handleToggleChange('allowEmailMarketing', value)}
            />
            <SettingItem
              title={t.allowSmsNotifications}
              description={t.allowSmsNotificationsDesc}
              checked={settings.allowSmsNotifications}
              onChange={(value) => handleToggleChange('allowSmsNotifications', value)}
            />
            <SettingItem
              title={t.allowPushNotifications}
              description={t.allowPushNotificationsDesc}
              checked={settings.allowPushNotifications}
              onChange={(value) => handleToggleChange('allowPushNotifications', value)}
            />
          </div>
        </div>

        {/* GDPR Compliance Section */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Scale" size={20} className="text-accent mr-2" />
            {t.gdprCompliance}
          </h3>
          
          <div className="space-y-6 border-l-2 border-accent/20 pl-4">
            {/* Data Retention */}
            <div>
              <h4 className="text-sm font-body font-medium text-text-primary mb-2">
                {t.dataRetention}
              </h4>
              <p className="text-sm text-text-secondary mb-3">{t.dataRetentionDesc}</p>
              <div className="space-y-2">
                {[
                  { value: '1year', label: t.oneYear },
                  { value: '2years', label: t.twoYears },
                  { value: '5years', label: t.fiveYears },
                  { value: 'indefinite', label: t.indefinite }
                ].map((option) => (
                  <label key={option.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="dataRetention"
                      value={option.value}
                      checked={settings.dataRetention === option.value}
                      onChange={(e) => handleToggleChange('dataRetention', e.target.value)}
                      disabled={!isEditing}
                      className="w-4 h-4 text-accent border-border focus:ring-accent focus:ring-2"
                    />
                    <span className="ml-2 text-sm font-body text-text-primary">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Right to be Forgotten */}
            <div className="p-4 bg-background rounded-lg border border-border">
              <h4 className="text-sm font-body font-medium text-text-primary mb-2 flex items-center">
                <Icon name="Trash2" size={16} className="text-error mr-2" />
                {t.rightToBeForgotten}
              </h4>
              <p className="text-sm text-text-secondary mb-3">{t.rightToBeForgottenDesc}</p>
              <Button
                variant="outline"
                onClick={handleDataDeletion}
                iconName="Trash2"
                iconPosition="left"
                className="text-error border-error hover:bg-error/5"
              >
                {t.requestDataDeletion}
              </Button>
            </div>

            {/* Data Portability */}
            <div className="p-4 bg-background rounded-lg border border-border">
              <h4 className="text-sm font-body font-medium text-text-primary mb-2 flex items-center">
                <Icon name="Download" size={16} className="text-accent mr-2" />
                {t.dataPortability}
              </h4>
              <p className="text-sm text-text-secondary mb-3">{t.dataPortabilityDesc}</p>
              <Button
                variant="outline"
                onClick={handleDataExport}
                iconName="Download"
                iconPosition="left"
                className="text-accent border-accent hover:bg-accent/5"
              >
                {t.downloadMyData}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleCancel}
            iconName="X"
            iconPosition="left"
          >
            {t.cancel}
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
          >
            {t.save}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PrivacySettingsSection;