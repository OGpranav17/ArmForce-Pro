import { Exercise } from '../types';
import { Equipment, ImprovementArea } from '../types';

export const filterExercises = (
  exercises: Exercise[],
  equipment: Equipment,
  improvementAreas: ImprovementArea
): Exercise[] => {
  const availableEquipment: string[] = [];
  
  if (equipment.gym) availableEquipment.push('gym');
  if (equipment.krassisPulley) availableEquipment.push('krassisPulley');
  if (equipment.dumbbells) availableEquipment.push('dumbbells');
  if (equipment.multiSpinner) availableEquipment.push('multiSpinner');
  if (equipment.rotatingHandle50mm) availableEquipment.push('rotatingHandle50mm');
  if (equipment.rotatingHandle30mm) availableEquipment.push('rotatingHandle30mm');
  if (equipment.judoBelt) availableEquipment.push('judoBelt');
  if (equipment.fingerCupping) availableEquipment.push('fingerCupping');
  if (equipment.wristWrench) availableEquipment.push('wristWrench');
  
  const targetAreas: string[] = [];
  
  if (improvementAreas.sidePressure) targetAreas.push('sidePressure');
  if (improvementAreas.backPressure) targetAreas.push('backPressure');
  if (improvementAreas.pronation) targetAreas.push('pronation');
  if (improvementAreas.wristIntegrity) targetAreas.push('wristIntegrity');
  if (improvementAreas.bicepStrength) targetAreas.push('bicepStrength');
  
  return exercises.filter((exercise) => {
    // Check if user has all required equipment
    const hasRequiredEquipment = exercise.equipment.every((eq) =>
      availableEquipment.includes(eq)
    );
    
    // Check if exercise targets at least one selected improvement area
    const targetsSelectedAreas = exercise.targetAreas.some((area) =>
      targetAreas.includes(area)
    );
    
    return hasRequiredEquipment && targetsSelectedAreas;
  });
};