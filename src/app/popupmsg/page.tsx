import React, { useState, useEffect } from 'react';

interface PopupProps {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
}

const Popup: React.FC<PopupProps> = ({ message, type = 'success', duration = 2000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div
      className={`fixed z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        isVisible
          ? 'opacity-100 translate-y-0 bottom-6 right-6'
          : 'opacity-0 translate-y-4 bottom-0 right-0'
      } ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
      <div className="flex items-center">
        <div className="mr-4">
          {type === 'success' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <div>
          <p className="font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;