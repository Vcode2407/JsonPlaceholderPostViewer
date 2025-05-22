
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg shadow-md my-6" role="alert">
      <div className="flex">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-red-400 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-1-4a1 1 0 0 1 1-1h.01a1 1 0 0 1 0 2H10a1 1 0 0 1-1-1z"/>
          </svg>
        </div>
        <div>
          <p className="font-bold">Error</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
