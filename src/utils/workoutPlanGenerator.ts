import { Exercise, WorkoutDay, FocusArea, DayType } from '../types';

// Focus area relationships and supporting muscle groups
const FOCUS_RELATIONSHIPS = {
  sidePressure: {
    supporting: ['wristIntegrity', 'backPressure', 'bicepStrength'],
    description: 'Explosive attacking power'
  },
  backPressure: {
    supporting: ['bicepStrength', 'wristIntegrity', 'pronation'],
    description: 'Defensive crushing strength'
  },
  pronation: {
    supporting: ['backPressure', 'wristIntegrity', 'bicepStrength'],
    description: 'Wrist control and rotation'
  },
  wristIntegrity: {
    supporting: ['bicepStrength', 'backPressure', 'sidePressure'],
    description: 'Wrist stability and cupping'
  },
  bicepStrength: {
    supporting: ['backPressure', 'wristIntegrity', 'pronation'],
    description: 'Raw pulling power'
  }
};

// Day type configurations
const DAY_TYPES = {
  heavy: { sets: '4-5', reps: '6-8', rest: '2-3 minutes', description: 'Maximum strength focus' },
  volume: { sets: '3-4', reps: '12-15', rest: '60-90 seconds', description: 'High volume technique' },
  recovery: { sets: '2-3', reps: '15-20', rest: '45-60 seconds', description: 'Light recovery work' },
  compound: { sets: '3-4', reps: '8-12', rest: '90 seconds', description: 'Compound movements' }
};

export const generateWorkoutPlan = (
  exercises: Exercise[],
  workoutDays: number
): WorkoutDay[] => {
  if (exercises.length === 0 || workoutDays === 0) {
    return [];
  }

  // Determine primary focus areas from available exercises
  const availableFocusAreas = Array.from(new Set(
    exercises.flatMap(ex => ex.targetAreas)
  )) as FocusArea[];

  if (availableFocusAreas.length === 0) return [];

  // Primary focus is the area with the most high-priority exercises
  const primaryFocus = availableFocusAreas.reduce((best, current) => {
    const currentTopExercises = exercises
      .filter(ex => ex.targetAreas.includes(current))
      .filter(ex => ex.priority <= 3).length;
    
    const bestTopExercises = exercises
      .filter(ex => ex.targetAreas.includes(best))
      .filter(ex => ex.priority <= 3).length;
    
    return currentTopExercises > bestTopExercises ? current : best;
  });

  // Get exercises by focus area, sorted by priority
  const getExercisesByFocus = (focus: FocusArea): Exercise[] => {
    return exercises
      .filter(ex => ex.targetAreas.includes(focus))
      .sort((a, b) => a.priority - b.priority);
  };

  // Get optimal exercise selection ensuring minimum counts
  const getOptimalExercises = (focusAreas: FocusArea[], targetCount: number): Exercise[] => {
    const selectedExercises: Exercise[] = [];
    const usedExerciseIds = new Set<string>();

    // First, get top priority exercises from each focus area
    for (const focus of focusAreas) {
      const focusExercises = getExercisesByFocus(focus);
      const topExercise = focusExercises.find(ex => !usedExerciseIds.has(ex.id));
      if (topExercise) {
        selectedExercises.push(topExercise);
        usedExerciseIds.add(topExercise.id);
      }
    }

    // Fill remaining slots with best available exercises
    const allAvailableExercises = exercises
      .filter(ex => !usedExerciseIds.has(ex.id))
      .filter(ex => focusAreas.some(focus => ex.targetAreas.includes(focus)))
      .sort((a, b) => a.priority - b.priority);

    while (selectedExercises.length < targetCount && allAvailableExercises.length > 0) {
      const nextBest = allAvailableExercises.shift();
      if (nextBest && !usedExerciseIds.has(nextBest.id)) {
        selectedExercises.push(nextBest);
        usedExerciseIds.add(nextBest.id);
      }
    }

    return selectedExercises;
  };

  // Create focus-weighted workout plans with optimal exercise distribution
  const createOptimalPlan = (): WorkoutDay[] => {
    const plans: { [key: number]: WorkoutDay[] } = {
      2: create2DayOptimalPlan(),
      3: create3DayOptimalPlan(),
      4: create4DayOptimalPlan(),
      5: create5DayOptimalPlan()
    };

    return plans[workoutDays] || [];
  };

  function create2DayOptimalPlan(): WorkoutDay[] {
    // Beginner Split: 4 exercises per day (total 8)
    const supportingAreas = FOCUS_RELATIONSHIPS[primaryFocus].supporting;
    const allFocusAreas = [primaryFocus, ...supportingAreas];

    return [
      {
        day: 1,
        name: `Monday - ${getFocusDisplayName(primaryFocus)} Power (Heavy)`,
        focus: `Primary ${getFocusDisplayName(primaryFocus)} training with supporting work`,
        exercises: getOptimalExercises([primaryFocus, supportingAreas[0]], 4)
          .map(ex => applyDayTypeModifications(ex, 'heavy'))
      },
      {
        day: 2,
        name: `Thursday - ${getFocusDisplayName(primaryFocus)} Volume + Support`,
        focus: `Volume work and supporting muscle groups`,
        exercises: getOptimalExercises([primaryFocus, supportingAreas[1], supportingAreas[2]], 4)
          .map(ex => applyDayTypeModifications(ex, 'volume'))
      }
    ];
  }

  function create3DayOptimalPlan(): WorkoutDay[] {
    // Balanced Plan: 4, 4, 3 exercises (total 11)
    const supportingAreas = FOCUS_RELATIONSHIPS[primaryFocus].supporting;

    return [
      {
        day: 1,
        name: `Monday - ${getFocusDisplayName(primaryFocus)} Heavy`,
        focus: `Maximum strength ${getFocusDisplayName(primaryFocus).toLowerCase()}`,
        exercises: getOptimalExercises([primaryFocus, supportingAreas[0]], 4)
          .map(ex => applyDayTypeModifications(ex, 'heavy'))
      },
      {
        day: 2,
        name: `Wednesday - ${getFocusDisplayName(supportingAreas[0])} + ${getFocusDisplayName(supportingAreas[1])}`,
        focus: `Supporting muscle groups and technique`,
        exercises: getOptimalExercises([supportingAreas[0], supportingAreas[1]], 4)
          .map(ex => applyDayTypeModifications(ex, 'compound'))
      },
      {
        day: 3,
        name: `Friday - ${getFocusDisplayName(primaryFocus)} Volume`,
        focus: `High volume ${getFocusDisplayName(primaryFocus).toLowerCase()} work`,
        exercises: getOptimalExercises([primaryFocus, supportingAreas[2]], 3)
          .map(ex => applyDayTypeModifications(ex, 'volume'))
      }
    ];
  }

  function create4DayOptimalPlan(): WorkoutDay[] {
    // Intermediate: Option 1 - 3,3,4,4 exercises (total 14)
    const supportingAreas = FOCUS_RELATIONSHIPS[primaryFocus].supporting;

    return [
      {
        day: 1,
        name: `Monday - ${getFocusDisplayName(primaryFocus)} Heavy`,
        focus: `Maximum strength focus`,
        exercises: getOptimalExercises([primaryFocus], 3)
          .map(ex => applyDayTypeModifications(ex, 'heavy'))
      },
      {
        day: 2,
        name: `Tuesday - ${getFocusDisplayName(supportingAreas[0])} Focus`,
        focus: `Supporting muscle group emphasis`,
        exercises: getOptimalExercises([supportingAreas[0]], 3)
          .map(ex => applyDayTypeModifications(ex, 'recovery'))
      },
      {
        day: 3,
        name: `Thursday - ${getFocusDisplayName(primaryFocus)} Volume`,
        focus: `High volume technique work`,
        exercises: getOptimalExercises([primaryFocus, supportingAreas[1]], 4)
          .map(ex => applyDayTypeModifications(ex, 'volume'))
      },
      {
        day: 4,
        name: `Friday - ${getFocusDisplayName(supportingAreas[1])} + ${getFocusDisplayName(supportingAreas[2])}`,
        focus: `Compound accessory work`,
        exercises: getOptimalExercises([supportingAreas[1], supportingAreas[2]], 4)
          .map(ex => applyDayTypeModifications(ex, 'compound'))
      }
    ];
  }

  function create5DayOptimalPlan(): WorkoutDay[] {
    // Advanced: 4,3,4,3,4 exercises (total 18)
    const supportingAreas = FOCUS_RELATIONSHIPS[primaryFocus].supporting;

    return [
      {
        day: 1,
        name: `Monday - ${getFocusDisplayName(primaryFocus)} Heavy`,
        focus: `Maximum strength focus`,
        exercises: getOptimalExercises([primaryFocus, supportingAreas[0]], 4)
          .map(ex => applyDayTypeModifications(ex, 'heavy'))
      },
      {
        day: 2,
        name: `Tuesday - ${getFocusDisplayName(supportingAreas[0])} Focus`,
        focus: `Supporting muscle group emphasis`,
        exercises: getOptimalExercises([supportingAreas[0]], 3)
          .map(ex => applyDayTypeModifications(ex, 'compound'))
      },
      {
        day: 3,
        name: `Wednesday - ${getFocusDisplayName(primaryFocus)} Volume`,
        focus: `High volume technique work`,
        exercises: getOptimalExercises([primaryFocus, supportingAreas[1]], 4)
          .map(ex => applyDayTypeModifications(ex, 'volume'))
      },
      {
        day: 4,
        name: `Thursday - ${getFocusDisplayName(supportingAreas[1])} + ${getFocusDisplayName(supportingAreas[2])}`,
        focus: `Rotation and support work`,
        exercises: getOptimalExercises([supportingAreas[1], supportingAreas[2]], 3)
          .map(ex => applyDayTypeModifications(ex, 'compound'))
      },
      {
        day: 5,
        name: `Friday - ${getFocusDisplayName(primaryFocus)} Power + Conditioning`,
        focus: `Power work and elbow conditioning`,
        exercises: getOptimalExercises([primaryFocus, supportingAreas[0], supportingAreas[2]], 4)
          .map(ex => applyDayTypeModifications(ex, 'recovery'))
      }
    ];
  }

  function getFocusDisplayName(focus: FocusArea): string {
    const names = {
      sidePressure: 'Side Pressure',
      backPressure: 'Back Pressure',
      pronation: 'Pronation',
      wristIntegrity: 'Wrist Integrity',
      bicepStrength: 'Bicep Strength'
    };
    return names[focus];
  }

  function applyDayTypeModifications(exercise: Exercise, dayType: DayType): Exercise {
    const typeConfig = DAY_TYPES[dayType];
    
    return {
      ...exercise,
      sets: typeConfig.sets,
      reps: typeConfig.reps,
      restTime: typeConfig.rest,
      description: `${exercise.description} - ${typeConfig.description}`
    };
  }

  return createOptimalPlan();
};