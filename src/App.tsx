import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { EquipmentSelector } from './components/EquipmentSelector';
import { ImprovementSelector } from './components/ImprovementSelector';
import { WorkoutPlanSelector } from './components/WorkoutPlanSelector';
import { WorkoutPlan } from './components/WorkoutPlan';
import { ExerciseCard } from './components/ExerciseCard';
import { Equipment, ImprovementArea } from './types';
import { exercises } from './data/exercises';
import { filterExercises } from './utils/exerciseFilter';
import { generateWorkoutPlan } from './utils/workoutPlanGenerator';
import { Search, Dumbbell, Zap, Trophy, Target, Flame } from 'lucide-react';

function App() {
  const [equipment, setEquipment] = useState<Equipment>({
    gym: false,
    krassisPulley: false,
    dumbbells: false,
    multiSpinner: false,
    rotatingHandle50mm: false,
    rotatingHandle30mm: false,
    judoBelt: false,
    fingerCupping: false,
    wristWrench: false,
  });

  const [improvementAreas, setImprovementAreas] = useState<ImprovementArea>({
    sidePressure: false,
    backPressure: false,
    pronation: false,
    wristIntegrity: false,
    bicepStrength: false,
  });

  const [workoutDays, setWorkoutDays] = useState<number>(0);
  const [showPlan, setShowPlan] = useState<boolean>(false);

  const filteredExercises = useMemo(() => {
    const hasEquipment = Object.values(equipment).some(Boolean);
    const hasAreas = Object.values(improvementAreas).some(Boolean);
    
    if (!hasEquipment || !hasAreas) {
      return [];
    }
    
    return filterExercises(exercises, equipment, improvementAreas);
  }, [equipment, improvementAreas]);

  const workoutPlan = useMemo(() => {
    if (workoutDays === 0 || filteredExercises.length === 0) {
      return [];
    }
    return generateWorkoutPlan(filteredExercises, workoutDays);
  }, [filteredExercises, workoutDays]);

  const hasSelections = Object.values(equipment).some(Boolean) && 
                       Object.values(improvementAreas).some(Boolean);

  const canGeneratePlan = hasSelections && workoutDays > 0 && filteredExercises.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 blur-3xl rounded-full transform scale-150"></div>
          <div className="relative">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <Flame className="h-12 w-12 text-orange-500 animate-bounce" />
              <Trophy className="h-16 w-16 text-yellow-400 animate-pulse" />
              <Flame className="h-12 w-12 text-orange-500 animate-bounce delay-500" />
            </div>
            <h2 className="text-6xl font-black bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent mb-6 animate-pulse">
              DOMINATE THE TABLE
            </h2>
            <div className="flex justify-center items-center space-x-2 mb-6">
              <Zap className="h-6 w-6 text-orange-400 animate-pulse" />
              <h3 className="text-2xl font-bold text-white">Personalized Armwrestling Training</h3>
              <Zap className="h-6 w-6 text-orange-400 animate-pulse" />
            </div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Get <span className="text-orange-400 font-bold">customized exercise recommendations</span> based on your available equipment 
              and training goals. Build the <span className="text-blue-400 font-bold">crushing strength</span> you need to 
              <span className="text-yellow-400 font-bold"> dominate at the table</span>.
            </p>
            <div className="flex justify-center space-x-8 mt-8">
              <div className="text-center">
                <Target className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-white font-bold">Targeted Training</div>
              </div>
              <div className="text-center">
                <Zap className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-white font-bold">Maximum Power</div>
              </div>
              <div className="text-center">
                <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-white font-bold">Championship Results</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-black text-orange-400 mb-2">{exercises.length}+</div>
            <div className="text-white font-semibold">Elite Exercises</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-black text-blue-400 mb-2">5</div>
            <div className="text-white font-semibold">Focus Areas</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-black text-purple-400 mb-2">∞</div>
            <div className="text-white font-semibold">Combinations</div>
          </div>
        </div>

        {/* Selection Forms */}
        <div className="max-w-6xl mx-auto">
          <EquipmentSelector 
            equipment={equipment} 
            onChange={setEquipment} 
          />
          
          <ImprovementSelector 
            improvementAreas={improvementAreas} 
            onChange={setImprovementAreas} 
          />
          
          {hasSelections && (
            <WorkoutPlanSelector 
              workoutDays={workoutDays} 
              onChange={setWorkoutDays} 
            />
          )}
        </div>

        {/* Workout Plan */}
        {canGeneratePlan && workoutDays > 0 && (
          <div className="max-w-6xl mx-auto mb-8">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 mb-6">
                <Zap className="h-12 w-12 text-orange-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-3xl font-bold text-white mb-4">Your Training Arsenal is Ready!</h3>
                <p className="text-gray-300 mb-6">Choose your weapon: structured workout plan or explore all available exercises</p>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowPlan(true)}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                    showPlan
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-2xl shadow-orange-500/50'
                      : 'bg-white/10 backdrop-blur-sm text-orange-400 border-2 border-orange-500/50 hover:bg-orange-500/20 hover:border-orange-400'
                  }`}
                >
                  🔥 View Workout Plan
                </button>
                <button
                  onClick={() => setShowPlan(false)}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                    !showPlan
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-2xl shadow-blue-500/50'
                      : 'bg-white/10 backdrop-blur-sm text-blue-400 border-2 border-blue-500/50 hover:bg-blue-500/20 hover:border-blue-400'
                  }`}
                >
                  💪 View All Exercises
                </button>
              </div>
            </div>
            
            {showPlan ? (
              <WorkoutPlan workoutDays={workoutPlan} />
            ) : null}
          </div>
        )}

        {/* Results Section */}
        {hasSelections && !showPlan && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 mb-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Search className="h-8 w-8 text-orange-400 animate-pulse" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                  Recommended Exercises
                </h2>
                <Search className="h-8 w-8 text-blue-400 animate-pulse" />
              </div>
              
              {filteredExercises.length > 0 ? (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-6 py-3">
                      <Trophy className="h-5 w-5 text-green-400" />
                      <p className="text-white font-semibold">
                        Found <span className="text-green-400 font-bold text-xl">{filteredExercises.length}</span> exercise{filteredExercises.length !== 1 ? 's' : ''} 
                        {' '}matching your setup
                      </p>
                      <Trophy className="h-5 w-5 text-green-400" />
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-8">
                    {filteredExercises.map((exercise, index) => (
                      <div key={exercise.id} className="transform hover:scale-105 transition-all duration-300">
                        <ExerciseCard exercise={exercise} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 backdrop-blur-sm border border-gray-500/30 rounded-2xl p-8 max-w-md mx-auto">
                    <Dumbbell className="h-20 w-20 text-gray-400 mx-auto mb-6 animate-bounce" />
                    <p className="text-gray-300 text-xl font-semibold mb-2">
                      No exercises found for your current selection.
                    </p>
                    <p className="text-gray-400 text-sm">
                      Try selecting different equipment or improvement areas.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Getting Started Message */}
        {!hasSelections && !showPlan && (
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-12">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 blur-2xl rounded-full"></div>
                <Dumbbell className="h-24 w-24 text-orange-400 mx-auto relative animate-pulse" />
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent mb-6">
                Ready to Unleash Your Power?
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Select your available equipment and the areas you want to improve 
                to receive <span className="text-orange-400 font-bold">personalized armwrestling exercise recommendations</span> and 
                <span className="text-blue-400 font-bold"> structured workout plans</span>. Our system will match you with the most 
                effective exercises and training schedules for your setup.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="bg-orange-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-orange-400">1</span>
                  </div>
                  <p className="text-white font-semibold">Select Equipment</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-blue-400">2</span>
                  </div>
                  <p className="text-white font-semibold">Choose Focus Areas</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-purple-400">3</span>
                  </div>
                  <p className="text-white font-semibold">Get Your Plan</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-black border-t border-white/10 text-white py-12 mt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-blue-500/5"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <Flame className="h-6 w-6 text-orange-400" />
            <p className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
              ArmForce Pro
            </p>
            <Flame className="h-6 w-6 text-orange-400" />
          </div>
          <p className="text-gray-400 text-lg">
            © 2025 ArmForce Pro. <span className="text-orange-400 font-semibold">Train smart</span>, <span className="text-blue-400 font-semibold">wrestle harder</span>.
                  </p>
        </div>
      </footer>
    </div>
  );
}

export default App;