
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className={`${sizeClasses[size]} rounded-full border-t-marcat-accent border-marcat-navy/30 animate-spin`}
      />
      {message && (
        <p className="text-gray-600 mt-3 text-sm font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
