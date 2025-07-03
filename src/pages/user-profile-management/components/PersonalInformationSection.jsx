import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PersonalInformationSection = ({ 
  personalInfo, 
  onUpdate, 
  isEditing, 
  onToggleEdit,
  currentLanguage 
}) => {
  const [formData, setFormData] = useState(personalInfo);
  const [errors, setErrors] = useState({});

  const translations = {
    en: {
      personalInformation: 'Personal Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      dateOfBirth: 'Date of Birth',
      nationality: 'Nationality',
      currentAddress: 'Current Address',
      street: 'Street Address',
      city: 'City',
      postalCode: 'Postal Code',
      country: 'Country',
      edit: 'Edit',
      save: 'Save Changes',
      cancel: 'Cancel',
      required: 'This field is required',
      invalidPostalCode: 'Invalid German postal code format'
    },
    de: {
      personalInformation: 'Persönliche Informationen',
      firstName: 'Vorname',
      lastName: 'Nachname',
      dateOfBirth: 'Geburtsdatum',
      nationality: 'Staatsangehörigkeit',
      currentAddress: 'Aktuelle Adresse',
      street: 'Straße',
      city: 'Stadt',
      postalCode: 'Postleitzahl',
      country: 'Land',
      edit: 'Bearbeiten',
      save: 'Änderungen speichern',
      cancel: 'Abbrechen',
      required: 'Dieses Feld ist erforderlich',
      invalidPostalCode: 'Ungültiges deutsches Postleitzahlenformat'
    }
  };

  const t = translations[currentLanguage];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = t.required;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t.required;
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = t.required;
    }
    if (!formData.nationality.trim()) {
      newErrors.nationality = t.required;
    }
    if (!formData.address.street.trim()) {
      newErrors.street = t.required;
    }
    if (!formData.address.city.trim()) {
      newErrors.city = t.required;
    }
    if (!formData.address.postalCode.trim()) {
      newErrors.postalCode = t.required;
    } else if (!/^\d{5}$/.test(formData.address.postalCode)) {
      newErrors.postalCode = t.invalidPostalCode;
    }
    if (!formData.address.country.trim()) {
      newErrors.country = t.required;
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
    if (errors[field.split('.').pop()]) {
      setErrors(prev => ({
        ...prev,
        [field.split('.').pop()]: ''
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
    setFormData(personalInfo);
    setErrors({});
    onToggleEdit();
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Icon name="User" size={24} className="text-accent mr-3" />
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            {t.personalInformation}
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
              {t.firstName} *
            </label>
            <Input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              disabled={!isEditing}
              className={errors.firstName ? 'border-error' : ''}
            />
            {errors.firstName && (
              <p className="text-error text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {t.lastName} *
            </label>
            <Input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              disabled={!isEditing}
              className={errors.lastName ? 'border-error' : ''}
            />
            {errors.lastName && (
              <p className="text-error text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {t.dateOfBirth} *
            </label>
            <Input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              disabled={!isEditing}
              className={errors.dateOfBirth ? 'border-error' : ''}
            />
            {errors.dateOfBirth && (
              <p className="text-error text-sm mt-1">{errors.dateOfBirth}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {t.nationality} *
            </label>
            <Input
              type="text"
              value={formData.nationality}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
              disabled={!isEditing}
              className={errors.nationality ? 'border-error' : ''}
            />
            {errors.nationality && (
              <p className="text-error text-sm mt-1">{errors.nationality}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
            {t.currentAddress}
          </h3>
          
          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {t.street} *
            </label>
            <Input
              type="text"
              value={formData.address.street}
              onChange={(e) => handleInputChange('address.street', e.target.value)}
              disabled={!isEditing}
              className={errors.street ? 'border-error' : ''}
            />
            {errors.street && (
              <p className="text-error text-sm mt-1">{errors.street}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-body font-medium text-text-primary mb-2">
                {t.city} *
              </label>
              <Input
                type="text"
                value={formData.address.city}
                onChange={(e) => handleInputChange('address.city', e.target.value)}
                disabled={!isEditing}
                className={errors.city ? 'border-error' : ''}
              />
              {errors.city && (
                <p className="text-error text-sm mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-text-primary mb-2">
                {t.postalCode} *
              </label>
              <Input
                type="text"
                value={formData.address.postalCode}
                onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                disabled={!isEditing}
                pattern="[0-9]{5}"
                maxLength={5}
                className={errors.postalCode ? 'border-error' : ''}
              />
              {errors.postalCode && (
                <p className="text-error text-sm mt-1">{errors.postalCode}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {t.country} *
            </label>
            <Input
              type="text"
              value={formData.address.country}
              onChange={(e) => handleInputChange('address.country', e.target.value)}
              disabled={!isEditing}
              className={errors.country ? 'border-error' : ''}
            />
            {errors.country && (
              <p className="text-error text-sm mt-1">{errors.country}</p>
            )}
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

export default PersonalInformationSection;