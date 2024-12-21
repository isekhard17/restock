import React from 'react';

const RestockLogo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 bg-lime-400 dark:bg-pink-500 rounded-full transition-colors duration-300">
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full p-2"
        stroke="white" 
        strokeWidth="2.5"
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M22 12c0 6-4.39 10-9.806 10C7.792 22 4.24 19.665 3 16" />
        <path d="M2 12C2 6 6.39 2 11.806 2 16.209 2 19.76 4.335 21 8" />
        <path d="M7 17l-4-1 1 4" />
        <path d="M17 7l4 1-1-4" />
      </svg>
    </div>
  </div>
);

export default RestockLogo;