import React from 'react';
import { ArmwrestlingLogo } from './ArmwrestlingLogo';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <ArmwrestlingLogo />
          <h1 className="text-3xl font-bold tracking-tight">
            ArmForce Pro
          </h1>
        </div>
        <p className="text-center text-blue-200 mt-2 text-lg">
          Elite Armwrestling Training System
        </p>
      </div>
    </header>
  );
};