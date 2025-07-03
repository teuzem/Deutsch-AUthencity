import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PersonalInformationForm = ({ formData, onFormDataChange, errors, translations }) => {
  const handleInputChange = (field, value) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  const germanStates = [
    'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen',
    'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen',
    'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland', 'Sachsen',
    'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          {translations.personalInformation}
        </h2>
        <p className="text-text-secondary font-body">
          {translations.personalInformationDescription}
        </p>
      </div>

      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
              <Icon name="User" size={20} className="mr-2 text-accent" />
              {translations.basicInformation}
            </h3>
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {translations.firstName} <span className="text-error">*</span>
            </label>
            <Input
              type="text"
              placeholder={translations.enterFirstName}
              value={formData.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={errors.firstName ? 'border-error' : ''}
            />
            {errors.firstName && (
              <p className="text-error text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {translations.lastName} <span className="text-error">*</span>
            </label>
            <Input
              type="text"
              placeholder={translations.enterLastName}
              value={formData.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={errors.lastName ? 'border-error' : ''}
            />
            {errors.lastName && (
              <p className="text-error text-xs mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {translations.dateOfBirth} <span className="text-error">*</span>
            </label>
            <Input
              type="date"
              value={formData.dateOfBirth || ''}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className={errors.dateOfBirth ? 'border-error' : ''}
            />
            {errors.dateOfBirth && (
              <p className="text-error text-xs mt-1">{errors.dateOfBirth}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {translations.placeOfBirth} <span className="text-error">*</span>
            </label>
            <Input
              type="text"
              placeholder={translations.enterPlaceOfBirth}
              value={formData.placeOfBirth || ''}
              onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
              className={errors.placeOfBirth ? 'border-error' : ''}
            />
            {errors.placeOfBirth && (
              <p className="text-error text-xs mt-1">{errors.placeOfBirth}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {translations.nationality} <span className="text-error">*</span>
            </label>
            <select
              value={formData.nationality || ''}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md font-body text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent ${
                errors.nationality ? 'border-error' : 'border-border'
              }`}
            >
              <option value="">{translations.selectNationality}</option>
              <option value="german">{translations.german}</option>
              <option value="other">{translations.other}</option>
            </select>
            {errors.nationality && (
              <p className="text-error text-xs mt-1">{errors.nationality}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {translations.gender} <span className="text-error">*</span>
            </label>
            <select
              value={formData.gender || ''}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md font-body text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent ${
                errors.gender ? 'border-error' : 'border-border'
              }`}
            >
              <option value="">{translations.selectGender}</option>
              <option value="male">{translations.male}</option>
              <option value="female">{translations.female}</option>
              <option value="diverse">{translations.diverse}</option>
            </select>
            {errors.gender && (
              <p className="text-error text-xs mt-1">{errors.gender}</p>
            )}
          </div>

          {/* Contact Information */}
          <div className="md:col-span-2 mt-8">
            <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
              <Icon name="Mail" size={20} className="mr-2 text-accent" />
              {translations.contactInformation}
            </h3>
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {translations.email} <span className="text-error">*</span>
            </label>
            <Input
              type="email"
              placeholder={translations.enterEmail}
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? 'border-error' : ''}
            />
            {errors.email && (
              <p className="text-error text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {translations.phone} <span className="text-error">*</span>
            </label>
            <Input
              type="tel"
              placeholder={translations.enterPhone}
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={errors.phone ? 'border-error' : ''}
            />
            {errors.phone && (
              <p className="text-error text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Address Information */}
          <div className="md:col-span-2 mt-8">
            <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
              <Icon name="MapPin" size={20} className="mr-2 text-accent" />
              {translations.addressInformation}
            </h3>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {translations.street} <span className="text-error">*</span>
            </label>
            <Input
              type="text"
              placeholder={translations.enterStreet}
              value={formData.street || ''}
              onChange={(e) => handleInputChange('street', e.target.value)}
              className={errors.street ? 'border-error' : ''}
            />
            {errors.street && (
              <p className="text-error text-xs mt-1">{errors.street}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {translations.postalCode} <span className="text-error">*</span>
            </label>
            <Input
              type="text"
              placeholder={translations.enterPostalCode}
              value={formData.postalCode || ''}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              className={errors.postalCode ? 'border-error' : ''}
            />
            {errors.postalCode && (
              <p className="text-error text-xs mt-1">{errors.postalCode}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {translations.city} <span className="text-error">*</span>
            </label>
            <Input
              type="text"
              placeholder={translations.enterCity}
              value={formData.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={errors.city ? 'border-error' : ''}
            />
            {errors.city && (
              <p className="text-error text-xs mt-1">{errors.city}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              {translations.state} <span className="text-error">*</span>
            </label>
            <select
              value={formData.state || ''}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md font-body text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent ${
                errors.state ? 'border-error' : 'border-border'
              }`}
            >
              <option value="">{translations.selectState}</option>
              {germanStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && (
              <p className="text-error text-xs mt-1">{errors.state}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationForm;