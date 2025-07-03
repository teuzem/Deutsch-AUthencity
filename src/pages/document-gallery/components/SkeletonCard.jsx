import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-elevation-1 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-text-secondary/10"></div>
      
      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title Skeleton */}
        <div className="h-6 bg-text-secondary/10 rounded mb-2"></div>
        <div className="h-4 bg-text-secondary/10 rounded w-3/4 mb-4"></div>
        
        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-text-secondary/10 rounded"></div>
          <div className="h-3 bg-text-secondary/10 rounded"></div>
          <div className="h-3 bg-text-secondary/10 rounded w-2/3"></div>
        </div>
        
        {/* Metadata Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-text-secondary/10 rounded w-1/2"></div>
          <div className="h-3 bg-text-secondary/10 rounded w-1/3"></div>
        </div>
        
        {/* Button Skeleton */}
        <div className="h-10 bg-text-secondary/10 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;