import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DocumentPreferencesSection = ({ 
  preferences, 
  onUpdate, 
  isEditing, 
  onToggleEdit,
  currentLanguage 
}) => {
  const [formData, setFormData] = useState(preferences);
  const [errors, setErrors] = useState({});

  const translations = {
    en: {
      documentPreferences: 'Document Preferences',
      emergencyContact: 'Emergency Contact',
      emergencyName: 'Emergency Contact Name',
      emergencyPhone: 'Emergency Contact Phone',
      emergencyRelation: 'Relationship',
      deliveryAddress: 'Preferred Delivery Address',
      useCurrentAddress: 'Use current address',
      customAddress: 'Custom delivery address',
      deliveryStreet: 'Delivery Street',
      deliveryCity: 'Delivery City',
      deliveryPostalCode: 'Delivery Postal Code',
      deliveryCountry: 'Delivery Country',
      documentLanguage: 'Preferred Document Language',
      german: 'German',
      english: 'English',
      french: 'French',
      deliveryMethod: 'Preferred Delivery Method',
      standardMail: 'Standard Mail',
      registeredMail: 'Registered Mail',
      expressDelivery: 'Express Delivery',
      pickupInPerson: 'Pickup in Person',
      edit: 'Edit',
      save: 'Save Changes',
      cancel: 'Cancel',
      required: 'This field is required',
      invalidPhone: 'Invalid phone number format',
      invalidPostalCode: 'Invalid postal code format'
    },
    de: {
      documentPreferences: 'Dokumenteneinstellungen',
      emergencyContact: 'Notfallkontakt',
      emergencyName: 'Name des Notfallkontakts',
      emergencyPhone: 'Telefon des Notfallkontakts',
      emergencyRelation: 'Beziehung',
      deliveryAddress: 'Bevorzugte Lieferadresse',
      useCurrentAddress: 'Aktuelle Adresse verwenden',
      customAddress: 'Benutzerdefinierte Lieferadresse',
      deliveryStreet: 'Lieferstraße',
      deliveryCity: 'Lieferstadt',
      deliveryPostalCode: 'Lieferpostleitzahl',
      deliveryCountry: 'Lieferland',
      documentLanguage: 'Bevorzugte Dokumentensprache',
      german: 'Deutsch',
      english: 'Englisch',
      french: 'Französisch',
      deliveryMethod: 'Bevorzugte Liefermethode',
      standardMail: 'Standardpost',
      registeredMail: 'Einschreiben',
      expressDelivery: 'Express-Lieferung',
      pickupInPerson: 'Persönliche Abholung',
      edit: 'Bearbeiten',
      save: 'Änderungen speichern',
      cancel: 'Abbrechen',
      required: 'Dieses Feld ist erforderlich',
      invalidPhone: 'Ungültiges Telefonnummernformat',
      invalidPostalCode: 'Ungültiges Postleitzahlenformat'
    }
  };

  const t = translations[currentLanguage];

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    
    if (!formData.emergencyContact.name.trim()) {
      newErrors.emergencyName = t.required;
    }
    if (!formData.emergencyContact.phone.trim()) {
      newErrors.emergencyPhone = t.required;
    } else if (!phoneRegex.test(formData.emergencyContact.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.emergencyPhone = t.invalidPhone;
    }
    if (!formData.emergencyContact.relation.trim()) {
      newErrors.emergencyRelation = t.required;
    }

    if (formData.deliveryAddressType === 'custom') {
      if (!formData.deliveryAddress.street.trim()) {
        newErrors.deliveryStreet = t.required;
      }
      if (!formData.deliveryAddress.city.trim()) {
        newErrors.deliveryCity = t.required;
      }
      if (!formData.deliveryAddress.postalCode.trim()) {
        newErrors.deliveryPostalCode = t.required;
      } else if (!/^\d{5}$/.test(formData.deliveryAddress.postalCode)) {
        newErrors.deliveryPostalCode = t.invalidPostalCode;
      }
      if (!formData.deliveryAddress.country.trim()) {
        newErrors.deliveryCountry = t.required;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    const errorKey = field.split('.').pop();
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdate(formData);
      onToggleEdit();
    }
  };

  const handleCancel = () => {
    setFormData(preferences);
    setErrors({});
    onToggleEdit();
  };

  const languageOptions = [
    { value: 'de', label: t.german },
    { value: 'en', label: t.english },
    { value: 'fr', label: t.french }
  ];

  const deliveryMethods = [
    { value: 'standard', label: t.standardMail, icon: 'Mail' },
    { value: 'registered', label: t.registeredMail, icon: 'Shield' },
    { value: 'express', label: t.expressDelivery, icon: 'Zap' },
    { value: 'pickup', label: t.pickupInPerson, icon: 'MapPin' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Icon name="FileText" size={24} className="text-accent mr-3" />
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            {t.documentPreferences}
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
        {/* Emergency Contact */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
            <Icon name="AlertTriangle" size={20} className="text-warning mr-2" />
            {t.emergencyContact}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-body font-medium text-text-primary mb-2">
                {t.emergencyName} *
              </label>
              <Input
                type="text"
                value={formData.emergencyContact.name}
                onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                disabled={!isEditing}
                className={errors.emergencyName ? 'border-error' : ''}
              />
              {errors.emergencyName && (
                <p className="text-error text-sm mt-1">{errors.emergencyName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-text-primary mb-2">
                {t.emergencyPhone} *
              </label>
              <Input
                type="tel"
                value={formData.emergencyContact.phone}
                onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
                disabled={!isEditing}
                className={errors.emergencyPhone ? 'border-error' : ''}
              />
              {errors.emergencyPhone && (
                <p className="text-error text-sm mt-1">{errors.emergencyPhone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-text-primary mb-2">
                {t.emergencyRelation} *
              </label>
              <Input
                type="text"
                value={formData.emergencyContact.relation}
                onChange={(e) => handleInputChange('emergencyContact.relation', e.target.value)}
                disabled={!isEditing}
                className={errors.emergencyRelation ? 'border-error' : ''}
              />
              {errors.emergencyRelation && (
                <p className="text-error text-sm mt-1">{errors.emergencyRelation}</p>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
            <Icon name="MapPin" size={20} className="text-accent mr-2" />
            {t.deliveryAddress}
          </h3>
          
          <div className="space-y-4">
            <div className="flex space-x-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="deliveryAddressType"
                  value="current"
                  checked={formData.deliveryAddressType === 'current'}
                  onChange={(e) => handleInputChange('deliveryAddressType', e.target.value)}
                  disabled={!isEditing}
                  className="w-4 h-4 text-accent border-border focus:ring-accent focus:ring-2"
                />
                <span className="ml-2 text-sm font-body text-text-primary">
                  {t.useCurrentAddress}
                </span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="deliveryAddressType"
                  value="custom"
                  checked={formData.deliveryAddressType === 'custom'}
                  onChange={(e) => handleInputChange('deliveryAddressType', e.target.value)}
                  disabled={!isEditing}
                  className="w-4 h-4 text-accent border-border focus:ring-accent focus:ring-2"
                />
                <span className="ml-2 text-sm font-body text-text-primary">
                  {t.customAddress}
                </span>
              </label>
            </div>

            {formData.deliveryAddressType === 'custom' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 p-4 bg-background rounded-lg border border-border">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-body font-medium text-text-primary mb-2">
                    {t.deliveryStreet} *
                  </label>
                  <Input
                    type="text"
                    value={formData.deliveryAddress.street}
                    onChange={(e) => handleInputChange('deliveryAddress.street', e.target.value)}
                    disabled={!isEditing}
                    className={errors.deliveryStreet ? 'border-error' : ''}
                  />
                  {errors.deliveryStreet && (
                    <p className="text-error text-sm mt-1">{errors.deliveryStreet}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-text-primary mb-2">
                    {t.deliveryCity} *
                  </label>
                  <Input
                    type="text"
                    value={formData.deliveryAddress.city}
                    onChange={(e) => handleInputChange('deliveryAddress.city', e.target.value)}
                    disabled={!isEditing}
                    className={errors.deliveryCity ? 'border-error' : ''}
                  />
                  {errors.deliveryCity && (
                    <p className="text-error text-sm mt-1">{errors.deliveryCity}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-text-primary mb-2">
                    {t.deliveryPostalCode} *
                  </label>
                  <Input
                    type="text"
                    value={formData.deliveryAddress.postalCode}
                    onChange={(e) => handleInputChange('deliveryAddress.postalCode', e.target.value)}
                    disabled={!isEditing}
                    pattern="[0-9]{5}"
                    maxLength={5}
                    className={errors.deliveryPostalCode ? 'border-error' : ''}
                  />
                  {errors.deliveryPostalCode && (
                    <p className="text-error text-sm mt-1">{errors.deliveryPostalCode}</p>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-body font-medium text-text-primary mb-2">
                    {t.deliveryCountry} *
                  </label>
                  <Input
                    type="text"
                    value={formData.deliveryAddress.country}
                    onChange={(e) => handleInputChange('deliveryAddress.country', e.target.value)}
                    disabled={!isEditing}
                    className={errors.deliveryCountry ? 'border-error' : ''}
                  />
                  {errors.deliveryCountry && (
                    <p className="text-error text-sm mt-1">{errors.deliveryCountry}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Document Language */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Globe" size={20} className="text-accent mr-2" />
            {t.documentLanguage}
          </h3>
          <div className="flex flex-wrap gap-4">
            {languageOptions.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="documentLanguage"
                  value={option.value}
                  checked={formData.documentLanguage === option.value}
                  onChange={(e) => handleInputChange('documentLanguage', e.target.value)}
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

        {/* Delivery Method */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Truck" size={20} className="text-accent mr-2" />
            {t.deliveryMethod}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deliveryMethods.map((method) => (
              <label key={method.value} className="flex items-center cursor-pointer p-3 border border-border rounded-lg hover:bg-accent/5 transition-quick">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value={method.value}
                  checked={formData.deliveryMethod === method.value}
                  onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                  disabled={!isEditing}
                  className="w-4 h-4 text-accent border-border focus:ring-accent focus:ring-2"
                />
                <div className="ml-3 flex items-center">
                  <Icon name={method.icon} size={18} className="text-text-secondary mr-2" />
                  <span className="text-sm font-body text-text-primary">
                    {method.label}
                  </span>
                </div>
              </label>
            ))}
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

export default DocumentPreferencesSection;