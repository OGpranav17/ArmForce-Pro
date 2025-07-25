import React from 'react';
import { Equipment } from '../types';

interface EquipmentSelectorProps {
  equipment: Equipment;
  onChange: (equipment: Equipment) => void;
}

export const EquipmentSelector: React.FC<EquipmentSelectorProps> = ({
  equipment,
  onChange,
}) => {
  const handleEquipmentChange = (key: keyof Equipment) => {
    onChange({
      ...equipment,
      [key]: !equipment[key],
    });
  };

  const trainingAccessOptions = [
    { key: 'gym' as keyof Equipment, label: 'Gym Membership', description: 'Access to cables, barbells, and gym equipment' },
    { key: 'krassisPulley' as keyof Equipment, label: 'Krassis Pulley', description: 'Specialized armwrestling training device' },
  ];

  const availableEquipmentOptions = [
    { key: 'dumbbells' as keyof Equipment, label: 'Dumbbells', description: 'Home dumbbell set for versatile training' },
    { key: 'multiSpinner' as keyof Equipment, label: 'Multi Spinner', description: 'Rotating device for pronation/supination training' },
    { key: 'rotatingHandle50mm' as keyof Equipment, label: '50mm Rotating Handle', description: 'Thick grip rotating handle for strength' },
    { key: 'rotatingHandle30mm' as keyof Equipment, label: '30mm Rotating Handle', description: 'Standard grip rotating handle' },
    { key: 'judoBelt' as keyof Equipment, label: 'Judo Belt', description: 'Belt for resistance and leverage training' },
    { key: 'fingerCupping' as keyof Equipment, label: 'Finger Cupping Device', description: 'Eccentric grip and finger strength training' },
    { key: 'wristWrench' as keyof Equipment, label: 'Wrist Wrench', description: 'Specialized wrist and forearm strengthening tool' },
  ];

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 mb-8">
      {/* Training Facility Access Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent mb-6 text-center">
          Training Facility Access
        </h2>
        <p className="text-gray-300 text-center mb-8 text-lg">
          Select which training facilities you have access to
        </p>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {trainingAccessOptions.map(({ key, label, description }) => (
            <div
              key={key}
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                equipment[key]
                  ? 'border-blue-400 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm shadow-lg shadow-blue-500/25'
                  : 'border-white/20 bg-white/5 backdrop-blur-sm hover:border-blue-400/50 hover:bg-blue-500/10'
              }`}
              onClick={() => handleEquipmentChange(key)}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                    equipment[key]
                      ? 'bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/50'
                      : 'border-white/30 bg-white/10'
                  }`}
                >
                  {equipment[key] && (
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

      {/* Available Equipment Section */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent mb-6 text-center">
          Available Equipment
        </h2>
        <p className="text-gray-300 text-center mb-8 text-lg">
          Select the equipment you own or have access to
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableEquipmentOptions.map(({ key, label, description }) => (
            <div
              key={key}
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                equipment[key]
                  ? 'border-orange-400 bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm shadow-lg shadow-orange-500/25'
                  : 'border-white/20 bg-white/5 backdrop-blur-sm hover:border-orange-400/50 hover:bg-orange-500/10'
              }`}
              onClick={() => handleEquipmentChange(key)}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                    equipment[key]
                      ? 'bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/50'
                      : 'border-white/30 bg-white/10'
                  }`}
                >
                  {equipment[key] && (
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
    </div>
  );
};