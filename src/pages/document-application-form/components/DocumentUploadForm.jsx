import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentUploadForm = ({ selectedDocumentType, uploadedFiles, onFilesChange, translations }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const getRequiredDocuments = () => {
    const baseDocuments = [
      { id: 'biometric-photo', name: translations.biometricPhoto, required: true, maxSize: '2MB', formats: ['jpg', 'jpeg', 'png'] },
      { id: 'proof-of-residence', name: translations.proofOfResidence, required: true, maxSize: '5MB', formats: ['pdf', 'jpg', 'jpeg', 'png'] },
      { id: 'birth-certificate', name: translations.birthCertificate, required: true, maxSize: '5MB', formats: ['pdf', 'jpg', 'jpeg', 'png'] }
    ];

    if (selectedDocumentType === 'passport') {
      baseDocuments.push({
        id: 'previous-passport',
        name: translations.previousPassport,
        required: false,
        maxSize: '5MB',
        formats: ['pdf', 'jpg', 'jpeg', 'png']
      });
    }

    if (selectedDocumentType === 'drivers-license') {
      baseDocuments.push(
        {
          id: 'medical-certificate',
          name: translations.medicalCertificate,
          required: true,
          maxSize: '5MB',
          formats: ['pdf', 'jpg', 'jpeg', 'png']
        },
        {
          id: 'driving-test',
          name: translations.drivingTest,
          required: true,
          maxSize: '5MB',
          formats: ['pdf', 'jpg', 'jpeg', 'png']
        }
      );
    }

    return baseDocuments;
  };

  const requiredDocuments = getRequiredDocuments();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e, documentId) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files, documentId);
  };

  const handleFileSelect = (e, documentId) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files, documentId);
  };

  const handleFileUpload = (files, documentId) => {
    const document = requiredDocuments.find(doc => doc.id === documentId);
    if (!document) return;

    files.forEach(file => {
      // Validate file type
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (!document.formats.includes(fileExtension)) {
        alert(`${translations.invalidFileFormat} ${document.formats.join(', ')}`);
        return;
      }

      // Validate file size
      const maxSizeBytes = parseFloat(document.maxSize) * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        alert(`${translations.fileTooLarge} ${document.maxSize}`);
        return;
      }

      // Simulate upload progress
      const fileId = `${documentId}-${Date.now()}`;
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

      const simulateUpload = () => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 30;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[fileId];
              return newProgress;
            });
            
            // Add file to uploaded files
            const newFile = {
              id: fileId,
              documentId,
              name: file.name,
              size: file.size,
              type: file.type,
              uploadedAt: new Date()
            };
            
            onFilesChange([...uploadedFiles, newFile]);
          } else {
            setUploadProgress(prev => ({ ...prev, [fileId]: Math.round(progress) }));
          }
        }, 200);
      };

      simulateUpload();
    });
  };

  const removeFile = (fileId) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== fileId);
    onFilesChange(updatedFiles);
  };

  const getFilesByDocumentId = (documentId) => {
    return uploadedFiles.filter(file => file.documentId === documentId);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          {translations.uploadDocuments}
        </h2>
        <p className="text-text-secondary font-body">
          {translations.uploadDocumentsDescription}
        </p>
      </div>

      <div className="space-y-6">
        {requiredDocuments.map((document) => {
          const documentFiles = getFilesByDocumentId(document.id);
          const hasFiles = documentFiles.length > 0;

          return (
            <div key={document.id} className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-heading font-medium text-text-primary flex items-center">
                    {document.name}
                    {document.required && <span className="text-error ml-1">*</span>}
                  </h3>
                  <p className="text-sm text-text-secondary font-body mt-1">
                    {translations.maxSize}: {document.maxSize} | {translations.formats}: {document.formats.join(', ').toUpperCase()}
                  </p>
                </div>
                {hasFiles && (
                  <div className="flex items-center text-success">
                    <Icon name="CheckCircle" size={20} className="mr-1" />
                    <span className="text-sm font-body">{translations.uploaded}</span>
                  </div>
                )}
              </div>

              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-accent bg-accent/5'
                    : hasFiles
                    ? 'border-success bg-success/5' :'border-border bg-background hover:border-accent hover:bg-accent/5'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={(e) => handleDrop(e, document.id)}
              >
                <div className="space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                    hasFiles ? 'bg-success text-white' : 'bg-accent/10 text-accent'
                  }`}>
                    <Icon name={hasFiles ? "CheckCircle" : "Upload"} size={32} />
                  </div>
                  
                  <div>
                    <p className="text-text-primary font-body font-medium mb-2">
                      {hasFiles ? translations.filesUploaded : translations.dragDropFiles}
                    </p>
                    <p className="text-text-secondary text-sm font-body">
                      {translations.orClickToSelect}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                    iconName="Upload"
                    iconPosition="left"
                  >
                    {translations.selectFiles}
                  </Button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={document.formats.map(format => `.${format}`).join(',')}
                    onChange={(e) => handleFileSelect(e, document.id)}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Upload Progress */}
              {Object.entries(uploadProgress).map(([fileId, progress]) => {
                if (!fileId.startsWith(document.id)) return null;
                return (
                  <div key={fileId} className="mt-4 p-3 bg-background rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-body text-text-primary">
                        {translations.uploading}...
                      </span>
                      <span className="text-sm font-body text-text-secondary">
                        {progress}%
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Uploaded Files */}
              {documentFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-body font-medium text-text-primary">
                    {translations.uploadedFiles}:
                  </h4>
                  {documentFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-background rounded-md">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-accent/10 rounded flex items-center justify-center">
                          <Icon name="File" size={16} className="text-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-body text-text-primary">{file.name}</p>
                          <p className="text-xs text-text-secondary">
                            {formatFileSize(file.size)} • {translations.uploaded} {file.uploadedAt.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => removeFile(file.id)}
                        iconName="Trash2"
                        className="text-error hover:bg-error/10"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Upload Summary */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={20} className="text-accent" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            {translations.uploadTips}
          </h3>
        </div>
        <ul className="space-y-1 text-sm text-text-secondary font-body">
          <li>• {translations.uploadTip1}</li>
          <li>• {translations.uploadTip2}</li>
          <li>• {translations.uploadTip3}</li>
          <li>• {translations.uploadTip4}</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentUploadForm;