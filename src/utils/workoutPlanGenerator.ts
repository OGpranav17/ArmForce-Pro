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

  // Create focus-weighted workout plans
  const createFocusWeightedPlan = (): WorkoutDay[] => {
    const plans: { [key: number]: WorkoutDay[] } = {
      2: create2DayPlan(),
      3: create3DayPlan(),
      4: create4DayPlan(),
      5: create5DayPlan()
    };

    return plans[workoutDays] || [];
  };

  function create2DayPlan(): WorkoutDay[] {
    const primaryExercises = getExercisesByFocus(primaryFocus).slice(0, 3);
    const supportingAreas = FOCUS_RELATIONSHIPS[primaryFocus].supporting;
    const supportingExercises = supportingAreas.flatMap(area => 
      getExercisesByFocus(area).slice(0, 1)
    );

    return [
      {
        day: 1,
        name: `Monday - ${getFocusDisplayName(primaryFocus)} Focus (Heavy)`,
        focus: `Primary ${getFocusDisplayName(primaryFocus)} training with supporting work`,
        exercises: [...primaryExercises.slice(0, 2), ...supportingExercises.slice(0, 2)]
          .map(ex => applyDayTypeModifications(ex, 'heavy'))
      },
      {
        day: 2,
        name: `Thursday - ${getFocusDisplayName(primaryFocus)} Volume + Support`,
        focus: `Volume work and supporting muscle groups`,
        exercises: [...primaryExercises.slice(1, 3), ...supportingExercises.slice(1, 3)]
          .map(ex => applyDayTypeModifications(ex, 'volume'))
      }
    ];
  }

  function create3DayPlan(): WorkoutDay[] {
    const primaryExercises = getExercisesByFocus(primaryFocus);
    const supportingAreas = FOCUS_RELATIONSHIPS[primaryFocus].supporting;

    return [
      {
        day: 1,
        name: `Monday - ${getFocusDisplayName(primaryFocus)} Heavy`,
        focus: `Maximum strength ${getFocusDisplayName(primaryFocus).toLowerCase()}`,
        exercises: primaryExercises.slice(0, 3)
          .map(ex => applyDayTypeModifications(ex, 'heavy'))
      },
      {
        day: 2,
        name: `Wednesday - ${getFocusDisplayName(supportingAreas[0])} + ${getFocusDisplayName(supportingAreas[1])}`,
        focus: `Supporting muscle groups and technique`,
        exercises: [
          ...getExercisesByFocus(supportingAreas[0]).slice(0, 2),
          ...getExercisesByFocus(supportingAreas[1]).slice(0, 2)
        ].map(ex => applyDayTypeModifications(ex, 'compound'))
      },
      {
        day: 3,
        name: `Friday - ${getFocusDisplayName(primaryFocus)} Volume`,
        focus: `High volume ${getFocusDisplayName(primaryFocus).toLowerCase()} work`,
        exercises: [
          ...primaryExercises.slice(2, 4),
          ...getExercisesByFocus(supportingAreas[2]).slice(0, 1)
        ].map(ex => applyDayTypeModifications(ex, 'volume'))
      }
    ];
  }

  function create4DayPlan(): WorkoutDay[] {
    const primaryExercises = getExercisesByFocus(primaryFocus);
    const supportingAreas = FOCUS_RELATIONSHIPS[primaryFocus].supporting;

    return [
      {
        day: 1,
        name: `Monday - ${getFocusDisplayName(primaryFocus)} Heavy`,
        focus: `Maximum strength focus`,
        exercises: primaryExercises.slice(0, 3)
          .map(ex => applyDayTypeModifications(ex, 'heavy'))
      },
      {
        day: 2,
        name: `Tuesday - ${getFocusDisplayName(supportingAreas[0])} + Recovery`,
        focus: `Supporting work and recovery`,
        exercises: [
          ...getExercisesByFocus(supportingAreas[0]).slice(0, 2),
          ...getExercisesByFocus(supportingAreas[1]).slice(0, 1)
        ].map(ex => applyDayTypeModifications(ex, 'recovery'))
      },
      {
        day: 3,
        name: `Thursday - ${getFocusDisplayName(primaryFocus)} Volume`,
        focus: `High volume technique work`,
        exercises: [
          ...primaryExercises.slice(1, 4),
          ...getExercisesByFocus(supportingAreas[2]).slice(0, 1)
        ].map(ex => applyDayTypeModifications(ex, 'volume'))
      },
      {
        day: 4,
        name: `Friday - ${getFocusDisplayName(supportingAreas[1])} + ${getFocusDisplayName(supportingAreas[2])}`,
        focus: `Compound accessory work`,
        exercises: [
          ...getExercisesByFocus(supportingAreas[1]).slice(0, 2),
          ...getExercisesByFocus(supportingAreas[2]).slice(0, 2)
        ].map(ex => applyDayTypeModifications(ex, 'compound'))
      }
    ];
  }

  function create5DayPlan(): WorkoutDay[] {
    const primaryExercises = getExercisesByFocus(primaryFocus);
    const supportingAreas = FOCUS_RELATIONSHIPS[primaryFocus].supporting;

    return [
      {
        day: 1,
        name: `Monday - ${getFocusDisplayName(primaryFocus)} Heavy`,
        focus: `Maximum strength focus`,
        exercises: primaryExercises.slice(0, 3)
          .map(ex => applyDayTypeModifications(ex, 'heavy'))
      },
      {
        day: 2,
        name: `Tuesday - ${getFocusDisplayName(supportingAreas[0])} Focus`,
        focus: `Supporting muscle group emphasis`,
        exercises: [
          ...getExercisesByFocus(supportingAreas[0]).slice(0, 3),
          ...getExercisesByFocus(supportingAreas[1]).slice(0, 1)
        ].map(ex => applyDayTypeModifications(ex, 'compound'))
      },
      {
        day: 3,
        name: `Wednesday - ${getFocusDisplayName(primaryFocus)} Volume`,
        focus: `High volume technique work`,
        exercises: [
          ...primaryExercises.slice(2, 5),
          ...getExercisesByFocus(supportingAreas[2]).slice(0, 1)
        ].map(ex => applyDayTypeModifications(ex, 'volume'))
      },
      {
        day: 4,
        name: `Thursday - ${getFocusDisplayName(supportingAreas[1])} + ${getFocusDisplayName(supportingAreas[2])}`,
        focus: `Rotation and support work`,
        exercises: [
          ...getExercisesByFocus(supportingAreas[1]).slice(0, 2),
          ...getExercisesByFocus(supportingAreas[2]).slice(0, 2)
        ].map(ex => applyDayTypeModifications(ex, 'compound'))
      },
      {
        day: 5,
        name: `Friday - Recovery + Conditioning`,
        focus: `Light work and elbow conditioning`,
        exercises: [
          ...primaryExercises.slice(3, 5),
          ...supportingAreas.flatMap(area => 
            getExercisesByFocus(area).slice(2, 3)
          ).slice(0, 2)
        ].map(ex => applyDayTypeModifications(ex, 'recovery'))
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

  return createFocusWeightedPlan();
};