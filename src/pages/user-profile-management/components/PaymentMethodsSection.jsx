import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PaymentMethodsSection = ({ 
  paymentMethods, 
  onUpdate, 
  onAddPaymentMethod,
  onRemovePaymentMethod,
  currentLanguage 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const translations = {
    en: {
      paymentMethods: 'Payment Methods',
      addPaymentMethod: 'Add Payment Method',
      noPaymentMethods: 'No payment methods added yet',
      addFirstMethod: 'Add your first payment method',
      creditCard: 'Credit Card',
      bankAccount: 'Bank Account',
      paypal: 'PayPal',
      cardNumber: 'Card Number',
      expiryDate: 'Expiry Date',
      cardholderName: 'Cardholder Name',
      accountNumber: 'Account Number',
      routingNumber: 'Routing Number',
      accountHolderName: 'Account Holder Name',
      bankName: 'Bank Name',
      paypalEmail: 'PayPal Email',
      primary: 'Primary',
      setPrimary: 'Set as Primary',
      remove: 'Remove',
      add: 'Add',
      cancel: 'Cancel',
      endingIn: 'ending in',
      expires: 'Expires'
    },
    de: {
      paymentMethods: 'Zahlungsmethoden',
      addPaymentMethod: 'Zahlungsmethode hinzufügen',
      noPaymentMethods: 'Noch keine Zahlungsmethoden hinzugefügt',
      addFirstMethod: 'Fügen Sie Ihre erste Zahlungsmethode hinzu',
      creditCard: 'Kreditkarte',
      bankAccount: 'Bankkonto',
      paypal: 'PayPal',
      cardNumber: 'Kartennummer',
      expiryDate: 'Ablaufdatum',
      cardholderName: 'Karteninhaber',
      accountNumber: 'Kontonummer',
      routingNumber: 'Bankleitzahl',
      accountHolderName: 'Kontoinhaber',
      bankName: 'Bankname',
      paypalEmail: 'PayPal E-Mail',
      primary: 'Primär',
      setPrimary: 'Als primär festlegen',
      remove: 'Entfernen',
      add: 'Hinzufügen',
      cancel: 'Abbrechen',
      endingIn: 'endend auf',
      expires: 'Läuft ab'
    }
  };

  const t = translations[currentLanguage];

  const getPaymentMethodIcon = (type) => {
    switch (type) {
      case 'credit_card':
        return 'CreditCard';
      case 'bank_account':
        return 'Building2';
      case 'paypal':
        return 'Wallet';
      default:
        return 'CreditCard';
    }
  };

  const formatCardNumber = (number) => {
    return `**** **** **** ${number.slice(-4)}`;
  };

  const formatAccountNumber = (number) => {
    return `****${number.slice(-4)}`;
  };

  const PaymentMethodCard = ({ method, isPrimary, onSetPrimary, onRemove }) => (
    <div className={`p-4 border rounded-lg transition-quick ${
      isPrimary 
        ? 'border-accent bg-accent/5' :'border-border bg-surface hover:border-accent/50'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
            isPrimary ? 'bg-accent text-white' : 'bg-background text-text-secondary'
          }`}>
            <Icon name={getPaymentMethodIcon(method.type)} size={24} />
          </div>
          <div>
            <div className="flex items-center">
              <h4 className="font-body font-medium text-text-primary">
                {method.type === 'credit_card' && t.creditCard}
                {method.type === 'bank_account' && t.bankAccount}
                {method.type === 'paypal' && t.paypal}
              </h4>
              {isPrimary && (
                <span className="ml-2 px-2 py-1 text-xs font-caption bg-accent text-white rounded-full">
                  {t.primary}
                </span>
              )}
            </div>
            <div className="text-sm text-text-secondary mt-1">
              {method.type === 'credit_card' && (
                <>
                  <div>{formatCardNumber(method.cardNumber)}</div>
                  <div>{t.expires} {method.expiryDate}</div>
                </>
              )}
              {method.type === 'bank_account' && (
                <>
                  <div>{method.bankName}</div>
                  <div>{t.endingIn} {method.accountNumber.slice(-4)}</div>
                </>
              )}
              {method.type === 'paypal' && (
                <div>{method.email}</div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {!isPrimary && (
            <Button
              variant="ghost"
              onClick={() => onSetPrimary(method.id)}
              className="text-xs text-accent hover:bg-accent/10"
            >
              {t.setPrimary}
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={() => onRemove(method.id)}
            iconName="Trash2"
            className="text-error hover:bg-error/10"
          />
        </div>
      </div>
    </div>
  );

  const AddPaymentMethodForm = ({ onAdd, onCancel }) => {
    const [methodType, setMethodType] = useState('credit_card');
    const [formData, setFormData] = useState({
      cardNumber: '',
      expiryDate: '',
      cardholderName: '',
      accountNumber: '',
      routingNumber: '',
      accountHolderName: '',
      bankName: '',
      paypalEmail: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newMethod = {
        id: Date.now().toString(),
        type: methodType,
        ...formData
      };
      onAdd(newMethod);
      setFormData({
        cardNumber: '',
        expiryDate: '',
        cardholderName: '',
        accountNumber: '',
        routingNumber: '',
        accountHolderName: '',
        bankName: '',
        paypalEmail: ''
      });
    };

    return (
      <div className="border border-border rounded-lg p-6 bg-background">
        <h4 className="font-heading font-medium text-text-primary mb-4">
          {t.addPaymentMethod}
        </h4>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4 mb-6">
            {[
              { value: 'credit_card', label: t.creditCard, icon: 'CreditCard' },
              { value: 'bank_account', label: t.bankAccount, icon: 'Building2' },
              { value: 'paypal', label: t.paypal, icon: 'Wallet' }
            ].map((type) => (
              <label key={type.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="methodType"
                  value={type.value}
                  checked={methodType === type.value}
                  onChange={(e) => setMethodType(e.target.value)}
                  className="w-4 h-4 text-accent border-border focus:ring-accent focus:ring-2"
                />
                <div className="ml-2 flex items-center">
                  <Icon name={type.icon} size={18} className="text-text-secondary mr-2" />
                  <span className="text-sm font-body text-text-primary">
                    {type.label}
                  </span>
                </div>
              </label>
            ))}
          </div>

          {methodType === 'credit_card' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  {t.cardNumber}
                </label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  {t.expiryDate}
                </label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  {t.cardholderName}
                </label>
                <input
                  type="text"
                  value={formData.cardholderName}
                  onChange={(e) => setFormData(prev => ({ ...prev, cardholderName: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                  required
                />
              </div>
            </div>
          )}

          {methodType === 'bank_account' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  {t.accountNumber}
                </label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, accountNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  {t.routingNumber}
                </label>
                <input
                  type="text"
                  value={formData.routingNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, routingNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  {t.accountHolderName}
                </label>
                <input
                  type="text"
                  value={formData.accountHolderName}
                  onChange={(e) => setFormData(prev => ({ ...prev, accountHolderName: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  {t.bankName}
                </label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                  required
                />
              </div>
            </div>
          )}

          {methodType === 'paypal' && (
            <div>
              <label className="block text-sm font-body font-medium text-text-primary mb-2">
                {t.paypalEmail}
              </label>
              <input
                type="email"
                value={formData.paypalEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, paypalEmail: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                required
              />
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
            >
              {t.cancel}
            </Button>
            <Button
              type="submit"
              variant="primary"
              iconName="Plus"
              iconPosition="left"
            >
              {t.add}
            </Button>
          </div>
        </form>
      </div>
    );
  };

  const handleSetPrimary = (methodId) => {
    const updatedMethods = paymentMethods.map(method => ({
      ...method,
      isPrimary: method.id === methodId
    }));
    onUpdate(updatedMethods);
  };

  const handleRemoveMethod = (methodId) => {
    onRemovePaymentMethod(methodId);
  };

  const handleAddMethod = (newMethod) => {
    onAddPaymentMethod(newMethod);
    setShowAddForm(false);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Icon name="CreditCard" size={24} className="text-accent mr-3" />
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            {t.paymentMethods}
          </h2>
        </div>
        {!showAddForm && (
          <Button
            variant="primary"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            {t.addPaymentMethod}
          </Button>
        )}
      </div>

      {paymentMethods.length === 0 && !showAddForm ? (
        <div className="text-center py-12">
          <Icon name="CreditCard" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
            {t.noPaymentMethods}
          </h3>
          <p className="text-text-secondary mb-6">{t.addFirstMethod}</p>
          <Button
            variant="primary"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            {t.addPaymentMethod}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              isPrimary={method.isPrimary}
              onSetPrimary={handleSetPrimary}
              onRemove={handleRemoveMethod}
            />
          ))}
          
          {showAddForm && (
            <AddPaymentMethodForm
              onAdd={handleAddMethod}
              onCancel={() => setShowAddForm(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsSection;