import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

const ErrorState = ({ title = "Something went wrong", message = "We encountered an error while fetching the data.", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center border border-red-100 rounded-lg bg-red-50">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-4">
        <AlertTriangle size={32} />
      </div>
      <h3 className="text-xl font-bold text-nie-navy mb-2">{title}</h3>
      <p className="text-red-800 mb-6">{message}</p>
      {onRetry && (
        <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-100" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
