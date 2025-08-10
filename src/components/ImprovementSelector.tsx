import React from 'react';
import { ImprovementArea } from '../types';

interface ImprovementSelectorProps {
  improvementAreas: ImprovementArea;
  onChange: (areas: ImprovementArea) => void;
}

export const ImprovementSelector: React.FC<ImprovementSelectorProps> = ({
  improvementAreas,
  onChange,
}) => {
  const handleAreaChange = (key: keyof ImprovementArea) => {
    onChange({
      ...improvementAreas,
      [key]: !improvementAreas[key],
    });
  };

  const areas = [
    {
      key: 'sidePressure' as keyof ImprovementArea,
      label: 'Side Pressure',
      description: 'Explosive attacking power and side control',
    },
    {
      key: 'backPressure' as keyof ImprovementArea,
      label: 'Back Pressure',
      description: 'Defensive strength and crushing power',
    },
    {
      key: 'pronation' as keyof ImprovementArea,
      label: 'Pronation',
      description: 'Wrist control and hand positioning',
    },
    {
      key: 'wristIntegrity' as keyof ImprovementArea,
      label: 'Wrist Integrity',
      description: 'Wrist stability and injury prevention',
    },
    {
      key: 'bicepStrength' as keyof ImprovementArea,
      label: 'Bicep Strength',
      description: 'Raw pulling power and arm strength',
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-12 mb-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5"></div>
      <h2 className="relative text-4xl font-black bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent mb-8 text-center animate-pulse">
        Target Improvement Areas
      </h2>
      <p className="relative text-gray-300 text-center mb-10 text-xl leading-relaxed">
        Select the areas you want to focus on improving
      </p>
      <div className="relative grid md:grid-cols-3 xl:grid-cols-5 gap-6">
        {areas.map(({ key, label, description }) => (
          <div
            key={key}
            className={`group relative border-2 rounded-3xl p-8 cursor-pointer transition-all duration-500 transform hover:scale-110 hover:shadow-2xl overflow-hidden ${
              improvementAreas[key]
                ? 'border-purple-400 bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl shadow-2xl shadow-purple-500/25'
                : 'border-white/20 bg-white/5 backdrop-blur-xl hover:border-purple-400/50 hover:bg-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/25'
            }`}
            onClick={() => handleAreaChange(key)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl group-hover:bg-purple-500/30 transition-all duration-500"></div>
            <div className="relative flex items-center space-x-4">
              <div
                className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                  improvementAreas[key]
                    ? 'bg-purple-500 border-purple-400 shadow-xl shadow-purple-500/50 group-hover:shadow-purple-400/60'
                    : 'border-white/30 bg-white/10 group-hover:border-purple-400/70 group-hover:bg-purple-500/20'
                }`}
              >
                {improvementAreas[key] && (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="font-bold text-white text-xl group-hover:text-purple-100 transition-colors duration-300">{label}</h3>
                <p className="text-sm text-gray-300 group-hover:text-purple-200/80 transition-colors duration-300 mt-1">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};