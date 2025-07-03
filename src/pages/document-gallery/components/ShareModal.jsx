import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShareModal = ({ item, isOpen, onClose, currentLanguage }) => {
  const [copied, setCopied] = useState(false);

  const translations = {
    en: {
      shareTitle: 'Share this document',
      copyLink: 'Copy Link',
      copied: 'Copied!',
      shareOn: 'Share on',
      close: 'Close',
      shareText: 'Check out this document from Authencity Portal'
    },
    de: {
      shareTitle: 'Dieses Dokument teilen',
      copyLink: 'Link kopieren',
      copied: 'Kopiert!',
      shareOn: 'Teilen auf',
      close: 'Schließen',
      shareText: 'Schauen Sie sich dieses Dokument vom Authencity Portal an'
    }
  };

  const t = translations[currentLanguage];

  if (!isOpen || !item) return null;

  const shareUrl = `${window.location.origin}/document-gallery?item=${item.id}`;
  const shareText = `${t.shareText}: ${item.title}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSocialShare = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);
    
    let shareLink = '';
    
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&via=deutschauthencity`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'telegram':
        shareLink = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      default:
        return;
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const socialPlatforms = [
    { name: 'twitter', icon: 'Twitter', color: 'hover:bg-blue-500' },
    { name: 'facebook', icon: 'Facebook', color: 'hover:bg-blue-600' },
    { name: 'linkedin', icon: 'Linkedin', color: 'hover:bg-blue-700' },
    { name: 'whatsapp', icon: 'MessageCircle', color: 'hover:bg-green-500' },
    { name: 'telegram', icon: 'Send', color: 'hover:bg-blue-400' }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-surface rounded-lg max-w-md w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            {t.shareTitle}
          </h3>
          <Button
            variant="ghost"
            onClick={onClose}
            iconName="X"
            className="p-2"
            aria-label={t.close}
          />
        </div>

        {/* Document Preview */}
        <div className="flex items-center space-x-3 p-3 bg-background rounded-lg mb-6">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="FileText" size={20} className="text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-body font-medium text-text-primary truncate">
              {item.title}
            </h4>
            <p className="text-xs font-body text-text-secondary">
              {item.documentType}
            </p>
          </div>
        </div>

        {/* Copy Link */}
        <div className="mb-6">
          <label className="block text-sm font-body font-medium text-text-primary mb-2">
            {t.copyLink}
          </label>
          <div className="flex space-x-2">
            <Input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 text-sm"
            />
            <Button
              variant={copied ? "success" : "outline"}
              onClick={handleCopyLink}
              iconName={copied ? "Check" : "Copy"}
              className="px-3"
            >
              {copied ? t.copied : ''}
            </Button>
          </div>
        </div>

        {/* Social Share */}
        <div>
          <label className="block text-sm font-body font-medium text-text-primary mb-3">
            {t.shareOn}
          </label>
          <div className="grid grid-cols-5 gap-2">
            {socialPlatforms.map((platform) => (
              <button
                key={platform.name}
                onClick={() => handleSocialShare(platform.name)}
                className={`
                  p-3 rounded-lg border border-border bg-background 
                  hover:text-white transition-quick flex items-center justify-center
                  ${platform.color}
                `}
                aria-label={`Share on ${platform.name}`}
              >
                <Icon name={platform.icon} size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;