import React from 'react';

export const ArmwrestlingLogo: React.FC = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-orange-500"
    >
      {/* Left arm */}
      <path
        d="M15 60 L35 45 L45 50"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Right arm */}
      <path
        d="M85 60 L65 45 L55 50"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Interlocked hands */}
      <circle
        cx="50"
        cy="50"
        r="8"
        fill="currentColor"
      />
      
      {/* Table edge */}
      <rect
        x="20"
        y="70"
        width="60"
        height="4"
        fill="currentColor"
        opacity="0.6"
      />
      
      {/* Power lines */}
      <path
        d="M40 35 L45 40 L40 45"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M60 35 L55 40 L60 45"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};