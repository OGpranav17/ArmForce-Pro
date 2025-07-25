import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface WorkoutPlanSelectorProps {
  workoutDays: number;
  onChange: (days: number) => void;
}

export const WorkoutPlanSelector: React.FC<WorkoutPlanSelectorProps> = ({
  workoutDays,
  onChange,
}) => {
  const planOptions = [
    {
      days: 2,
      name: 'Beginner Split',
      description: 'Perfect for beginners or busy schedules',
      schedule: 'Upper/Lower split with rest days',
    },
    {
      days: 3,
      name: 'Balanced Plan',
      description: 'Ideal balance of training and recovery',
      schedule: 'Push/Pull/Technique focus',
    },
    {
      days: 4,
      name: 'Intermediate',
      description: 'Serious training with targeted sessions',
      schedule: 'Side/Back/Pronation/Power split',
    },
    {
      days: 5,
      name: 'Advanced',
      description: 'Maximum training frequency',
      schedule: 'Specialized daily focus areas',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 mb-8">
      <div className="text-center mb-6">
        <Calendar className="h-12 w-12 text-orange-400 mx-auto mb-4 animate-pulse" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Choose Your Training Schedule
        </h2>
        <p className="text-gray-300 mt-2 text-lg">
          Select how many days per week you can commit to training
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {planOptions.map(({ days, name, description, schedule }) => (
          <div
            key={days}
            className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
              workoutDays === days
                ? 'border-orange-400 bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm shadow-2xl shadow-orange-500/25'
                : 'border-white/20 bg-white/5 backdrop-blur-sm hover:border-orange-400/50 hover:bg-orange-500/10'
            }`}
            onClick={() => onChange(days)}
          >
            <div className="text-center">
              <div
                className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black transition-all duration-300 ${
                  workoutDays === days
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/50'
                    : 'bg-white/10 text-gray-300 border-2 border-white/20'
                }`}
              >
                {days}
              </div>
              <h3 className="font-bold text-xl text-white mb-3">{name}</h3>
              <p className="text-sm text-gray-300 mb-4">{description}</p>
              <div className="flex items-center justify-center text-xs text-gray-400">
                <Clock className="h-4 w-4 mr-2" />
                <span>{schedule}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {workoutDays > 0 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-500/30 rounded-xl text-center">
          <p className="text-white text-lg">
            <span className="font-bold text-green-400 text-xl">{workoutDays} days per week</span> selected
            {workoutDays === 2 && " - Great for building consistency!"}
            {workoutDays === 3 && " - Perfect balance of training and recovery!"}
            {workoutDays === 4 && " - Serious commitment to improvement!"}
            {workoutDays === 5 && " - Elite level training schedule!"}
          </p>
        </div>
      )}
    </div>
  );
};