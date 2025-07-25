import React from 'react';
import { Exercise, WorkoutDay } from '../types';
import { Calendar, Target, Zap, Clock } from 'lucide-react';

interface WorkoutPlanProps {
  workoutDays: WorkoutDay[];
}

export const WorkoutPlan: React.FC<WorkoutPlanProps> = ({ workoutDays }) => {
  const getColorClasses = (dayNumber: number) => {
    const colorMap: { [key: number]: { bg: string; text: string; light: string; number: string } } = {
      1: { bg: 'bg-blue-500', text: 'text-blue-100', light: 'bg-blue-100', number: 'text-blue-600' },
      2: { bg: 'bg-green-500', text: 'text-green-100', light: 'bg-green-100', number: 'text-green-600' },
      3: { bg: 'bg-purple-500', text: 'text-purple-100', light: 'bg-purple-100', number: 'text-purple-600' },
      4: { bg: 'bg-orange-500', text: 'text-orange-100', light: 'bg-orange-100', number: 'text-orange-600' },
      5: { bg: 'bg-red-500', text: 'text-red-100', light: 'bg-red-100', number: 'text-red-600' }
    };
    return colorMap[dayNumber] || colorMap[1];
  };

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 mb-8">
      <div className="text-center mb-6">
        <Calendar className="h-12 w-12 text-orange-400 mx-auto mb-4 animate-pulse" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Focus-Weighted Training Plan
        </h2>
        <p className="text-gray-300 mt-2 text-lg">
          {workoutDays.length} day specialized training schedule with primary focus emphasis
        </p>
      </div>

      <div className="space-y-6">
        {workoutDays.map((day) => {
          const colors = getColorClasses(day.day);
          return (
            <div key={day.day} className="border border-white/20 rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm shadow-xl">
              <div className={`${colors.bg} text-white p-6 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <h3 className="text-2xl font-bold mb-2">{day.name}</h3>
                    <p className={`${colors.text} text-lg`}>{day.focus}</p>
                  </div>
                  <div className="text-right relative">
                    <div className="text-4xl font-black">{day.exercises.length}</div>
                    <div className={`text-sm ${colors.text} font-semibold`}>exercises</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid gap-4">
                  {day.exercises.map((exercise, index) => (
                    <div key={exercise.id} className="border border-white/10 rounded-xl p-6 hover:shadow-lg hover:border-orange-400/30 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full ${colors.light} ${colors.number} flex items-center justify-center text-lg font-bold shadow-lg`}>
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-lg">{exercise.name}</h4>
                            <p className="text-sm text-gray-300 mt-1">{exercise.description}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {exercise.difficulty}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="text-center p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                          <Target className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                          <div className="text-sm font-bold text-white">{exercise.sets}</div>
                          <div className="text-xs text-gray-300">Sets</div>
                        </div>
                        <div className="text-center p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                          <Zap className="h-5 w-5 text-orange-400 mx-auto mb-1" />
                          <div className="text-sm font-bold text-white">{exercise.reps}</div>
                          <div className="text-xs text-gray-300">Reps</div>
                        </div>
                        <div className="text-center p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                          <Clock className="h-5 w-5 text-green-400 mx-auto mb-1" />
                          <div className="text-sm font-bold text-white">{exercise.restTime}</div>
                          <div className="text-xs text-gray-300">Rest</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {exercise.targetAreas.map((area) => (
                          <span
                            key={area}
                            className="px-2 py-1 bg-white/10 text-gray-300 border border-white/20 rounded-full text-xs font-medium backdrop-blur-sm"
                          >
                            {area === 'sidePressure' ? 'Side Pressure' : 
                             area === 'backPressure' ? 'Back Pressure' : 
                             area === 'pronation' ? 'Pronation' :
                             area === 'wristIntegrity' ? 'Wrist Integrity' : 'Bicep Strength'}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/20 to-blue-500/20 backdrop-blur-sm border border-orange-500/30 rounded-xl">
        <h3 className="font-bold text-white mb-4 text-lg">🔥 Focus-Weighted Training Tips:</h3>
        <ul className="text-sm text-gray-300 space-y-2">
          <li>• Primary focus areas are trained 2x per week for maximum development</li>
          <li>• Supporting muscle groups prevent imbalances and enhance performance</li>
          <li>• Heavy days focus on strength, volume days on technique and endurance</li>
          <li>• Recovery days use lighter weights to maintain movement patterns</li>
          <li>• Each day type serves a specific purpose in your development</li>
        </ul>
      </div>
    </div>
  );
};