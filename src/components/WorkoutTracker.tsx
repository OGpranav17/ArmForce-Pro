import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, CheckCircle, Target, Trophy, Clock } from 'lucide-react';
import { WorkoutDay } from '../types';

interface WorkoutTrackerProps {
  onBackToHome: () => void;
  workoutPlan: WorkoutDay[];
}

interface WorkoutLog {
  exerciseId: string;
  sets: Array<{
    reps: number;
    weight: number;
    completed: boolean;
  }>;
  notes: string;
  completed: boolean;
  date: string;
  week: number;
}

interface WeeklyStats {
  currentWeek: number;
  weeksCompleted: number;
  totalWorkouts: number;
  completionRate: number;
}

export default function WorkoutTracker({ onBackToHome, workoutPlan }: WorkoutTrackerProps) {
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats>({
    currentWeek: 1,
    weeksCompleted: 0,
    totalWorkouts: 0,
    completionRate: 0
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('workoutLogs');
    const savedStats = localStorage.getItem('weeklyStats');
    
    if (savedLogs) {
      setWorkoutLogs(JSON.parse(savedLogs));
    }
    
    if (savedStats) {
      setWeeklyStats(JSON.parse(savedStats));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('workoutLogs', JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  useEffect(() => {
    localStorage.setItem('weeklyStats', JSON.stringify(weeklyStats));
  }, [weeklyStats]);

  // Get available workout days (not completed in current week)
  const getAvailableWorkoutDays = () => {
    const completedDaysThisWeek = workoutLogs
      .filter(log => log.week === weeklyStats.currentWeek && log.completed)
      .map(log => log.exerciseId.split('-')[0]); // Extract day name from exerciseId

    return workoutPlan.filter(day => 
      !completedDaysThisWeek.some(completedDay => 
        day.name.toLowerCase().includes(completedDay.toLowerCase())
      )
    );
  };

  // Check if current week is completed
  const isWeekCompleted = () => {
    const availableDays = getAvailableWorkoutDays();
    return availableDays.length === 0 && workoutPlan.length > 0;
  };

  // Start next week
  const startNextWeek = () => {
    setWeeklyStats(prev => ({
      ...prev,
      currentWeek: prev.currentWeek + 1,
      weeksCompleted: prev.weeksCompleted + 1
    }));
  };

  // Complete workout day
  const completeWorkoutDay = (day: WorkoutDay) => {
    const dayLogs = day.exercises.map(exercise => ({
      exerciseId: `${day.name}-${exercise.name}`,
      sets: Array(3).fill(null).map(() => ({
        reps: 0,
        weight: 0,
        completed: false
      })),
      notes: '',
      completed: true,
      date: new Date().toISOString(),
      week: weeklyStats.currentWeek
    }));

    setWorkoutLogs(prev => [...prev, ...dayLogs]);
    setWeeklyStats(prev => ({
      ...prev,
      totalWorkouts: prev.totalWorkouts + 1,
      completionRate: Math.round(((prev.totalWorkouts + 1) / (prev.currentWeek * workoutPlan.length)) * 100)
    }));
    setSelectedDay(null);
  };

  const availableWorkoutDays = getAvailableWorkoutDays();

  if (selectedDay) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSelectedDay(null)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Days
            </button>
            <h1 className="text-2xl font-bold text-white">{selectedDay.name} Workout</h1>
          </div>

          {/* Exercises */}
          <div className="space-y-6">
            {selectedDay.exercises.map((exercise, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">{exercise.name}</h3>
                <p className="text-gray-300 mb-6">{exercise.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-orange-500/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-orange-400">{exercise.sets}</div>
                    <div className="text-orange-300">Sets</div>
                  </div>
                  <div className="bg-blue-500/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">{exercise.reps}</div>
                    <div className="text-blue-300">Reps</div>
                  </div>
                  <div className="bg-purple-500/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">{exercise.restTime}</div>
                    <div className="text-purple-300">Rest</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Complete Workout Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => completeWorkoutDay(selectedDay)}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
            >
              Complete Workout
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isWeekCompleted()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <div className="text-center">
          <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Week {weeklyStats.currentWeek} Completed! 🎉</h1>
          <p className="text-xl text-gray-300 mb-8">Congratulations on finishing all your workouts this week!</p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={startNextWeek}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Week {weeklyStats.currentWeek + 1}
            </button>
            <button
              onClick={onBackToHome}
              className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-xl hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <h1 className="text-3xl font-bold text-white">Workout Tracker</h1>
          <div className="w-24"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-3xl p-6 border border-orange-500/30 relative overflow-hidden group hover:scale-105 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Calendar className="w-8 h-8 text-orange-400 mb-3" />
            <div className="text-3xl font-bold text-orange-400 mb-1">Week {weeklyStats.currentWeek}</div>
            <div className="text-orange-300 text-sm">Current Week</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-3xl p-6 border border-blue-500/30 relative overflow-hidden group hover:scale-105 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Trophy className="w-8 h-8 text-blue-400 mb-3" />
            <div className="text-3xl font-bold text-blue-400 mb-1">{weeklyStats.weeksCompleted}</div>
            <div className="text-blue-300 text-sm">Weeks Completed</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-6 border border-purple-500/30 relative overflow-hidden group hover:scale-105 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Target className="w-8 h-8 text-purple-400 mb-3" />
            <div className="text-3xl font-bold text-purple-400 mb-1">{weeklyStats.totalWorkouts}</div>
            <div className="text-purple-300 text-sm">Total Workouts</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-6 border border-green-500/30 relative overflow-hidden group hover:scale-105 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
            <div className="text-3xl font-bold text-green-400 mb-1">{availableWorkoutDays.length}</div>
            <div className="text-green-300 text-sm">Days Remaining</div>
          </div>
        </div>

        {/* Available Workout Days */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Available Workout Days</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableWorkoutDays.map((day, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:scale-105 transition-all duration-500 cursor-pointer group relative overflow-hidden"
                onClick={() => setSelectedDay(day)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4">{day.name}</h3>
                  <div className="space-y-2 mb-6">
                    {day.exercises.slice(0, 3).map((exercise, exerciseIndex) => (
                      <div key={exerciseIndex} className="text-gray-300 text-sm">
                        • {exercise.name}
                      </div>
                    ))}
                    {day.exercises.length > 3 && (
                      <div className="text-gray-400 text-sm">
                        +{day.exercises.length - 3} more exercises
                      </div>
                    )}
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300">
                    Start Workout
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {availableWorkoutDays.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No workouts available</h3>
            <p className="text-gray-400">Complete your current week to unlock new workouts!</p>
          </div>
        )}
      </div>
    </div>
  );
}