import React from 'react';
import { Flame, Trophy } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10"></div>
      <div className="container mx-auto px-4 py-8 relative">
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 blur-3xl rounded-full transform scale-150"></div>
          <div className="relative">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <Flame className="h-8 w-8 text-orange-500 animate-bounce" />
              <Trophy className="h-10 w-10 text-yellow-400 animate-pulse" />
              <Flame className="h-8 w-8 text-orange-500 animate-bounce delay-500" />
            </div>
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent mb-4 animate-pulse tracking-tight">
            ArmForce Pro
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <div className="h-1 w-8 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-pulse"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 animate-pulse"></div>
            <div className="h-1 w-8 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-pulse"></div>
          </div>
        </div>
        <p className="text-center text-blue-200 mt-4 text-xl font-semibold relative">
          Elite Armwrestling Training System
        </p>
      </div>
    </header>
  );
};