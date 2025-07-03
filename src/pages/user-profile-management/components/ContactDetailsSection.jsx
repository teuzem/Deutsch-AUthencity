import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactDetailsSection = ({ 
  contactInfo, 
  onUpdate, 
  isEditing, 
  onToggleEdit,
  currentLanguage 
}) => {
  const [formData, setFormData] = useState(contactInfo);
  const [errors, setErrors] = useState({});

  const translations = {
    en: {
      contactDetails: 'Contact Details',
      primaryEmail: 'Primary Email',
      secondaryEmail: 'Secondary Email (Optional)',
      primaryPhone: 'Primary Phone',
      secondaryPhone: 'Secondary Phone (Optional)',
      preferredCommunication: 'Preferred Communication Method',
      email: 'Email',
      phone: 'Phone',
      sms: 'SMS',
      edit: 'Edit',
      save: 'Save Changes',
      cancel: 'Cancel',
      required: 'This field is required',
      invalidEmail: 'Invalid email format',
      invalidPhone: 'Invalid phone number format'
    },
    de: {
      contactDetails: 'Kontaktdaten',
      primaryEmail: 'Primäre E-Mail',
      secondaryEmail: 'Sekundäre E-Mail (Optional)',
      primaryPhone: 'Primäre Telefonnummer',
      secondaryPhone: 'Sekundäre Telefonnummer (Optional)',
      preferredCommunication: 'Bevorzugte Kommunikationsmethode',
      email: 'E-Mail',
      phone: 'Telefon',
      sms: 'SMS',
      edit: 'Bearbeiten',
      save: 'Änderungen speichern',
      cancel: 'Abbrechen',
      required: 'Dieses Feld ist erforderlich',
      invalidEmail: 'Ungültiges E-Mail-Format',
      invalidPhone: 'Ungültiges Telefonnummernformat'
    }
  };

  const t = translations[currentLanguage];

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    
    if (!formData.primaryEmail.trim()) {
      newErrors.primaryEmail = t.required;
    } else if (!emailRegex.test(formData.primaryEmail)) {
      newErrors.primaryEmail = t.invalidEmail;
    }

    if (formData.secondaryEmail && !emailRegex.test(formData.secondaryEmail)) {
      newErrors.secondaryEmail = t.invalidEmail;
    }

    if (!formData.primaryPhone.trim()) {
      newErrors.primaryPhone = t.required;
    } else if (!phoneRegex.test(formData.primaryPhone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.primaryPhone = t.invalidPhone;
    }

    if (formData.secondaryPhone && !phoneRegex.test(formData.secondaryPhone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.secondaryPhone = t.invalidPhone;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
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
    setFormData(contactInfo);
    setErrors({});
    onToggleEdit();
  };

  const communicationOptions = [
    { value: 'email', label: t.email, icon: 'Mail' },
    { value: 'phone', label: t.phone, icon: 'Phone' },
    { value: 'sms', label: t.sms, icon: 'MessageSquare' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Icon name="Phone" size={24} className="text-accent mr-3" />
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            {t.contactDetails}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {t.primaryEmail} *
            </label>
            <Input
              type="email"
              value={formData.primaryEmail}
              onChange={(e) => handleInputChange('primaryEmail', e.target.value)}
              disabled={!isEditing}
              className={errors.primaryEmail ? 'border-error' : ''}
            />
            {errors.primaryEmail && (
              <p className="text-error text-sm mt-1">{errors.primaryEmail}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {t.secondaryEmail}
            </label>
            <Input
              type="email"
              value={formData.secondaryEmail}
              onChange={(e) => handleInputChange('secondaryEmail', e.target.value)}
              disabled={!isEditing}
              className={errors.secondaryEmail ? 'border-error' : ''}
            />
            {errors.secondaryEmail && (
              <p className="text-error text-sm mt-1">{errors.secondaryEmail}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {t.primaryPhone} *
            </label>
            <Input
              type="tel"
              value={formData.primaryPhone}
              onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
              disabled={!isEditing}
              className={errors.primaryPhone ? 'border-error' : ''}
            />
            {errors.primaryPhone && (
              <p className="text-error text-sm mt-1">{errors.primaryPhone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {t.secondaryPhone}
            </label>
            <Input
              type="tel"
              value={formData.secondaryPhone}
              onChange={(e) => handleInputChange('secondaryPhone', e.target.value)}
              disabled={!isEditing}
              className={errors.secondaryPhone ? 'border-error' : ''}
            />
            {errors.secondaryPhone && (
              <p className="text-error text-sm mt-1">{errors.secondaryPhone}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-4">
              {t.preferredCommunication}
            </label>
            <div className="space-y-3">
              {communicationOptions.map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="preferredCommunication"
                    value={option.value}
                    checked={formData.preferredCommunication === option.value}
                    onChange={(e) => handleInputChange('preferredCommunication', e.target.value)}
                    disabled={!isEditing}
                    className="w-4 h-4 text-accent border-border focus:ring-accent focus:ring-2"
                  />
                  <div className="ml-3 flex items-center">
                    <Icon name={option.icon} size={18} className="text-text-secondary mr-2" />
                    <span className="text-sm font-body text-text-primary">
                      {option.label}
                    </span>
                  </div>
                </label>
              ))}
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

export default ContactDetailsSection;