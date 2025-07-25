export interface Equipment {
  gym: boolean;
  krassisPulley: boolean;
  dumbbells: boolean;
  multiSpinner: boolean;
  rotatingHandle50mm: boolean;
  rotatingHandle30mm: boolean;
  judoBelt: boolean;
  fingerCupping: boolean;
  wristWrench: boolean;
}

export interface ImprovementArea {
  sidePressure: boolean;
  backPressure: boolean;
  pronation: boolean;
  wristIntegrity: boolean;
  bicepStrength: boolean;
}

export type FocusArea = 'sidePressure' | 'backPressure' | 'pronation' | 'wristIntegrity' | 'bicepStrength';

export type DayType = 'heavy' | 'volume' | 'recovery' | 'compound';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  equipment: ('gym' | 'krassisPulley' | 'dumbbells')[];
  targetAreas: ('sidePressure' | 'backPressure' | 'pronation' | 'wristIntegrity' | 'bicepStrength')[];
  sets: string;
  reps: string;
  restTime: string;
  priority: number;
}

export interface UserPreferences {
  equipment: Equipment;
  improvementAreas: ImprovementArea;
  workoutDays: number;
}

export interface WorkoutDay {
  day: number;
  name: string;
  exercises: Exercise[];
  focus: string;
}