import React from 'react';
import { Exercise } from '../types';
import { Clock, Target, Zap } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl hover:shadow-3xl hover:border-orange-400/50 transition-all duration-300 overflow-hidden group">
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">{exercise.name}</h3>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-bold shadow-lg">
              #{exercise.priority}
            </span>
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getDifficultyColor(
                exercise.difficulty
              )}`}
            >
              {exercise.difficulty}
            </span>
          </div>
        </div>
        
        <p className="text-gray-300 mb-6 text-lg leading-relaxed">{exercise.description}</p>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl">
            <Target className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">{exercise.sets}</div>
            <div className="text-sm text-blue-300">Sets</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm border border-orange-500/30 rounded-xl">
            <Zap className="h-6 w-6 text-orange-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">{exercise.reps}</div>
            <div className="text-sm text-orange-300">Reps</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-500/30 rounded-xl">
            <Clock className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">{exercise.restTime}</div>
            <div className="text-sm text-green-300">Rest</div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6">
          <h4 className="font-bold text-white mb-4 text-lg">Instructions:</h4>
          <ol className="text-sm text-gray-300 space-y-2">
            {exercise.instructions.map((instruction, index) => (
              <li key={index} className="flex">
                <span className="text-orange-400 font-bold mr-3 text-base">{index + 1}.</span>
                {instruction}
              </li>
            ))}
          </ol>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {exercise.targetAreas.map((area) => (
            <span
              key={area}
              className="px-3 py-1 bg-white/10 text-gray-300 border border-white/20 rounded-full text-xs font-semibold backdrop-blur-sm"
            >
              {area === 'sidePressure' ? 'Side Pressure' : 
               area === 'backPressure' ? 'Back Pressure' : 
               area === 'pronation' ? 'Pronation' :
               area === 'wristIntegrity' ? 'Wrist Integrity' : 'Bicep Strength'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};