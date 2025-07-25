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
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 mb-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent mb-6 text-center">
        Target Improvement Areas
      </h2>
      <p className="text-gray-300 text-center mb-8 text-lg">
        Select the areas you want to focus on improving
      </p>
      <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-4">
        {areas.map(({ key, label, description }) => (
          <div
            key={key}
            className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
              improvementAreas[key]
                ? 'border-blue-400 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm shadow-lg shadow-blue-500/25'
                : 'border-white/20 bg-white/5 backdrop-blur-sm hover:border-blue-400/50 hover:bg-blue-500/10'
            }`}
            onClick={() => handleAreaChange(key)}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                  improvementAreas[key]
                    ? 'bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/50'
                    : 'border-white/30 bg-white/10'
                }`}
              >
                {improvementAreas[key] && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{label}</h3>
                <p className="text-sm text-gray-300">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};