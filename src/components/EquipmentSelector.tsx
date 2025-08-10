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
    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-12 mb-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-orange-500/5"></div>
      {/* Training Facility Access Section */}
      <div className="relative mb-12">
        <h2 className="text-4xl font-black bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent mb-8 text-center animate-pulse">
          Training Facility Access
        </h2>
        <p className="text-gray-300 text-center mb-10 text-xl leading-relaxed">
          Select which training facilities you have access to
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {trainingAccessOptions.map(({ key, label, description }) => (
            <div
              key={key}
              className={`group relative border-2 rounded-3xl p-8 cursor-pointer transition-all duration-500 transform hover:scale-110 hover:shadow-2xl overflow-hidden ${
                equipment[key]
                  ? 'border-blue-400 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl shadow-2xl shadow-blue-500/25'
                  : 'border-white/20 bg-white/5 backdrop-blur-xl hover:border-blue-400/50 hover:bg-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/25'
              }`}
              onClick={() => handleEquipmentChange(key)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-all duration-500"></div>
              <div className="relative flex items-center space-x-4">
                <div
                  className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                    equipment[key]
                      ? 'bg-blue-500 border-blue-400 shadow-xl shadow-blue-500/50 group-hover:shadow-blue-400/60'
                      : 'border-white/30 bg-white/10 group-hover:border-blue-400/70 group-hover:bg-blue-500/20'
                  }`}
                >
                  {equipment[key] && (
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
                  <h3 className="font-bold text-white text-xl group-hover:text-blue-100 transition-colors duration-300">{label}</h3>
                  <p className="text-sm text-gray-300 group-hover:text-blue-200/80 transition-colors duration-300 mt-1">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Equipment Section */}
      <div className="relative">
        <h2 className="text-4xl font-black bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent mb-8 text-center animate-pulse">
          Available Equipment
        </h2>
        <p className="text-gray-300 text-center mb-10 text-xl leading-relaxed">
          Select the equipment you own or have access to
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableEquipmentOptions.map(({ key, label, description }) => (
            <div
              key={key}
              className={`group relative border-2 rounded-3xl p-8 cursor-pointer transition-all duration-500 transform hover:scale-110 hover:shadow-2xl overflow-hidden ${
                equipment[key]
                  ? 'border-orange-400 bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-xl shadow-2xl shadow-orange-500/25'
                  : 'border-white/20 bg-white/5 backdrop-blur-xl hover:border-orange-400/50 hover:bg-orange-500/10 hover:shadow-2xl hover:shadow-orange-500/25'
              }`}
              onClick={() => handleEquipmentChange(key)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-orange-500/20 rounded-full blur-xl group-hover:bg-orange-500/30 transition-all duration-500"></div>
              <div className="relative flex items-center space-x-4">
                <div
                  className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                    equipment[key]
                      ? 'bg-orange-500 border-orange-400 shadow-xl shadow-orange-500/50 group-hover:shadow-orange-400/60'
                      : 'border-white/30 bg-white/10 group-hover:border-orange-400/70 group-hover:bg-orange-500/20'
                  }`}
                >
                  {equipment[key] && (
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
                  <h3 className="font-bold text-white text-xl group-hover:text-orange-100 transition-colors duration-300">{label}</h3>
                  <p className="text-sm text-gray-300 group-hover:text-orange-200/80 transition-colors duration-300 mt-1">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};