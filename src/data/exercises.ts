import { Exercise } from '../types';

export const exercises: Exercise[] = [
  // 🟥 SIDE PRESSURE EXERCISES (Priority Order)
  {
    id: 'side-pressure-pulley-drag',
    name: 'Side Pressure Pulley Drag',
    description: 'Core side pressure movement - the gold standard for internal rotation and elbow drive.',
    instructions: [
      'Set up Krassis pulley at shoulder height',
      'Position body perpendicular to pulley system',
      'Grip handle with armwrestling position',
      'Drive elbow across body with explosive side pressure',
      'Focus on lat and triceps engagement',
      'Control the negative portion slowly'
    ],
    difficulty: 'Advanced',
    equipment: ['krassisPulley'],
    targetAreas: ['sidePressure'],
    sets: '4-5',
    reps: '6-10',
    restTime: '2-3 minutes',
    priority: 1
  },
  {
    id: 'jm-press',
    name: 'JM Press',
    description: 'Triceps and elbow health focused movement combining pressing and extension.',
    instructions: [
      'Use EZ curl bar or dumbbells',
      'Start with arms at 90 degrees',
      'Lower weight to upper chest/neck area',
      'Press up with triceps emphasis',
      'Keep elbows relatively stable',
      'Focus on elbow health and strength'
    ],
    difficulty: 'Intermediate',
    equipment: ['dumbbells'],
    targetAreas: ['sidePressure'],
    sets: '3-4',
    reps: '8-12',
    restTime: '90 seconds',
    priority: 2
  },
  {
    id: 'belt-internal-rotation',
    name: 'Belt Internal Rotation',
    description: 'Elbow internal rotation strength using belt and plate resistance.',
    instructions: [
      'Attach plate to judo belt',
      'Position elbow at 90 degrees',
      'Rotate arm inward against resistance',
      'Focus on internal rotation strength',
      'Control both concentric and eccentric',
      'Keep elbow stable throughout movement'
    ],
    difficulty: 'Intermediate',
    equipment: ['judoBelt'],
    targetAreas: ['sidePressure'],
    sets: '3-4',
    reps: '10-15',
    restTime: '60-90 seconds',
    priority: 3
  },
  {
    id: 'cable-side-press',
    name: 'Cable Side Press',
    description: 'Full-range compound side pressure movement using cable machine.',
    instructions: [
      'Set cable at shoulder height',
      'Position body for side pressure angle',
      'Press handle across body with full range',
      'Engage lats and triceps together',
      'Control the return movement',
      'Focus on explosive pressing power'
    ],
    difficulty: 'Intermediate',
    equipment: ['gym'],
    targetAreas: ['sidePressure'],
    sets: '4',
    reps: '8-12',
    restTime: '90 seconds',
    priority: 4
  },
  {
    id: 'dumbbell-side-press',
    name: 'Dumbbell Side Press',
    description: 'Table simulation side press movement using dumbbells.',
    instructions: [
      'Hold dumbbell in armwrestling position',
      'Position elbow on stable surface',
      'Press weight across body simulating table motion',
      'Focus on side pressure mechanics',
      'Control the negative portion',
      'Maintain proper wrist alignment'
    ],
    difficulty: 'Beginner',
    equipment: ['dumbbells'],
    targetAreas: ['sidePressure'],
    sets: '3-4',
    reps: '10-15',
    restTime: '60 seconds',
    priority: 5
  },

  // 🟦 BACK PRESSURE EXERCISES (Priority Order)
  {
    id: 'backpressure-handle-rows',
    name: 'Backpressure Handle Rows',
    description: 'Angle-specific back pull movement - the ultimate back pressure builder.',
    instructions: [
      'Set up Krassis pulley with back pressure handle',
      'Position body in defensive armwrestling stance',
      'Pull handle with rising elbow motion',
      'Focus on lat and rear delt engagement',
      'Simulate defensive table position',
      'Control the eccentric portion'
    ],
    difficulty: 'Advanced',
    equipment: ['krassisPulley'],
    targetAreas: ['backPressure'],
    sets: '4-5',
    reps: '6-10',
    restTime: '2-3 minutes',
    priority: 1
  },
  {
    id: 'lat-row-rising-elbow',
    name: 'Lat Row with Rising Elbow',
    description: 'Simulates elbow rise movement with lat focus for defensive strength.',
    instructions: [
      'Set up cable row at chest height',
      'Start with elbow low position',
      'Pull while raising elbow upward',
      'Focus on lat and rear delt activation',
      'Simulate defensive rising motion',
      'Control the return movement'
    ],
    difficulty: 'Intermediate',
    equipment: ['gym'],
    targetAreas: ['backPressure'],
    sets: '4',
    reps: '8-12',
    restTime: '90 seconds',
    priority: 2
  },
  {
    id: 'supinated-strap-row',
    name: 'Supinated Strap Row',
    description: 'Locks hand close with supinated grip for back pressure strength.',
    instructions: [
      'Use judo belt or pulley with strap attachment',
      'Grip with supinated (underhand) position',
      'Pull with hand locked close to body',
      'Focus on keeping hand position tight',
      'Engage lats and biceps together',
      'Control the negative movement'
    ],
    difficulty: 'Intermediate',
    equipment: ['judoBelt'],
    targetAreas: ['backPressure'],
    sets: '3-4',
    reps: '10-15',
    restTime: '75 seconds',
    priority: 3
  },
  {
    id: 'rope-lat-pulldown',
    name: 'Rope Lat Pulldown',
    description: 'Isolation movement for lat development and back pressure strength.',
    instructions: [
      'Set up lat pulldown with rope attachment',
      'Pull rope down and apart',
      'Focus on lat isolation',
      'Squeeze shoulder blades together',
      'Control the eccentric portion',
      'Maintain proper posture throughout'
    ],
    difficulty: 'Beginner',
    equipment: ['gym'],
    targetAreas: ['backPressure'],
    sets: '3-4',
    reps: '12-15',
    restTime: '60 seconds',
    priority: 4
  },
  {
    id: 'banded-rising-elbow-pulls',
    name: 'Banded Rising Elbow Pulls',
    description: 'Home version of rising elbow training using resistance bands.',
    instructions: [
      'Anchor resistance band at low position',
      'Start with elbow down and forward',
      'Pull while raising elbow upward',
      'Focus on defensive rising motion',
      'Control both directions of movement',
      'Maintain constant tension'
    ],
    difficulty: 'Beginner',
    equipment: ['judoBelt'], // Using belt as band substitute
    targetAreas: ['backPressure'],
    sets: '3',
    reps: '15-20',
    restTime: '45 seconds',
    priority: 5
  },

  // 🟨 PRONATION EXERCISES (Priority Order)
  {
    id: 'pronation-hold-multispinner',
    name: 'Pronation Hold with Multispinner',
    description: 'Gold standard pronation training combining pulley resistance with multispinner.',
    instructions: [
      'Set up multispinner with pulley resistance',
      'Grip handle in neutral position',
      'Rotate to full pronation and hold',
      'Focus on isometric strength',
      'Control the return to neutral',
      'Gradually increase hold duration'
    ],
    difficulty: 'Advanced',
    equipment: ['krassisPulley', 'multiSpinner'],
    targetAreas: ['pronation'],
    sets: '4-5',
    reps: '15-30 sec holds',
    restTime: '2 minutes',
    priority: 1
  },
  {
    id: 'cable-pronation-d-handle',
    name: 'Cable Pronation with D-handle',
    description: 'High tension rotational training using cable machine with D-handle.',
    instructions: [
      'Set up cable with D-handle attachment',
      'Position arm at 90 degrees',
      'Rotate from supination to pronation',
      'Focus on high tension throughout range',
      'Control the eccentric portion',
      'Maintain elbow stability'
    ],
    difficulty: 'Intermediate',
    equipment: ['gym'],
    targetAreas: ['pronation'],
    sets: '4',
    reps: '10-15',
    restTime: '90 seconds',
    priority: 2
  },
  {
    id: 'band-pronation',
    name: 'Band Pronation',
    description: 'Good for warmups and rehabilitation using band resistance.',
    instructions: [
      'Use resistance band or belt for resistance',
      'Start in supinated position',
      'Rotate to full pronation slowly',
      'Focus on control and range of motion',
      'Perfect for warmup and recovery',
      'Gradually increase resistance'
    ],
    difficulty: 'Beginner',
    equipment: ['judoBelt'],
    targetAreas: ['pronation'],
    sets: '2-3',
    reps: '15-20',
    restTime: '30-45 seconds',
    priority: 3
  },
  {
    id: 'dumbbell-pronator-twist',
    name: 'Dumbbell Pronator Twist',
    description: 'Progressive overload pronation training using dumbbells.',
    instructions: [
      'Hold dumbbell with neutral grip',
      'Elbow bent at 90 degrees',
      'Rotate from neutral to pronation',
      'Focus on controlled movement',
      'Progressive weight increases possible',
      'Control both directions'
    ],
    difficulty: 'Beginner',
    equipment: ['dumbbells'],
    targetAreas: ['pronation'],
    sets: '3-4',
    reps: '12-15',
    restTime: '60 seconds',
    priority: 4
  },
  {
    id: 'wrist-wrench-pronation',
    name: 'Wrist Wrench + Pronation',
    description: 'Combines cupping and pronation training using wrist wrench device.',
    instructions: [
      'Set up wrist wrench with appropriate resistance',
      'Combine wrist flexion with pronation',
      'Focus on both cupping and rotation',
      'Control the movement in both directions',
      'Gradually increase resistance',
      'Maintain proper wrist alignment'
    ],
    difficulty: 'Intermediate',
    equipment: ['wristWrench'],
    targetAreas: ['pronation', 'wristIntegrity'],
    sets: '3-4',
    reps: '10-12',
    restTime: '75 seconds',
    priority: 5
  },

  // 🟫 WRIST INTEGRITY / CUPPING EXERCISES (Priority Order)
  {
    id: 'wrist-wrench-cupping',
    name: 'Wrist Wrench Cupping',
    description: 'Gold standard for wrist flexor and cupping strength development.',
    instructions: [
      'Set up wrist wrench with Krassis pulley',
      'Focus on wrist flexion movement',
      'Emphasize cupping motion',
      'Control the eccentric portion',
      'Gradually increase resistance',
      'Maintain proper wrist alignment'
    ],
    difficulty: 'Advanced',
    equipment: ['krassisPulley', 'wristWrench'],
    targetAreas: ['wristIntegrity'],
    sets: '4-5',
    reps: '8-12',
    restTime: '2 minutes',
    priority: 1
  },
  {
    id: 'finger-cupping-hold',
    name: 'Finger Cupping Hold',
    description: 'Isometric holds for finger flexion and cupping strength.',
    instructions: [
      'Set up finger cupping device',
      'Position fingers in cupping grip',
      'Hold position for specified time',
      'Focus on finger flexor strength',
      'Gradually increase hold duration',
      'Control the release slowly'
    ],
    difficulty: 'Advanced',
    equipment: ['fingerCupping'],
    targetAreas: ['wristIntegrity'],
    sets: '3-4',
    reps: '20-45 sec holds',
    restTime: '90 seconds',
    priority: 2
  },
  {
    id: 'dumbbell-wrist-curl',
    name: 'Dumbbell Wrist Curl',
    description: 'Simple and effective wrist flexor strengthening exercise.',
    instructions: [
      'Hold dumbbell with underhand grip',
      'Rest forearm on bench or thigh',
      'Curl wrist upward through full range',
      'Focus on wrist flexor contraction',
      'Control the negative portion',
      'Use progressive overload'
    ],
    difficulty: 'Beginner',
    equipment: ['dumbbells'],
    targetAreas: ['wristIntegrity'],
    sets: '3-4',
    reps: '15-20',
    restTime: '60 seconds',
    priority: 3
  },
  {
    id: '50mm-handle-wrist-curl',
    name: '50mm Handle Wrist Curl',
    description: 'Thick grip wrist overload for maximum strength development.',
    instructions: [
      'Use 50mm rotating handle with pulley',
      'Perform wrist curls with thick grip',
      'Focus on grip and wrist strength',
      'Control the movement throughout',
      'Gradually increase resistance',
      'Maintain proper form'
    ],
    difficulty: 'Advanced',
    equipment: ['krassisPulley', 'rotatingHandle50mm'],
    targetAreas: ['wristIntegrity'],
    sets: '3-4',
    reps: '8-12',
    restTime: '90 seconds',
    priority: 4
  },
  {
    id: 'banded-wrist-flexion',
    name: 'Banded Wrist Flexion',
    description: 'Easy recovery option for wrist flexor maintenance.',
    instructions: [
      'Use resistance band or belt',
      'Perform gentle wrist flexion',
      'Focus on range of motion',
      'Perfect for recovery days',
      'Control the movement slowly',
      'Gradually increase repetitions'
    ],
    difficulty: 'Beginner',
    equipment: ['judoBelt'],
    targetAreas: ['wristIntegrity'],
    sets: '2-3',
    reps: '20-25',
    restTime: '30 seconds',
    priority: 5
  },

  // 🟩 BICEP STRENGTH EXERCISES (Priority Order)
  {
    id: '90-degree-cable-curl-static',
    name: '90° Cable Curl (Static)',
    description: 'Armwrestling range-specific bicep training with isometric holds.',
    instructions: [
      'Set cable at elbow height',
      'Position arm at 90 degrees',
      'Hold static position under tension',
      'Focus on armwrestling-specific range',
      'Gradually increase hold duration',
      'Control the release slowly'
    ],
    difficulty: 'Advanced',
    equipment: ['gym'],
    targetAreas: ['bicepStrength'],
    sets: '4-5',
    reps: '20-45 sec holds',
    restTime: '2-3 minutes',
    priority: 1
  },
  {
    id: 'rolling-handle-curl',
    name: 'Rolling Handle Curl',
    description: 'Thick grip bicep training using rotating handles for maximum strength.',
    instructions: [
      'Use 30mm or 50mm rotating handle with pulley',
      'Perform bicep curls with thick grip',
      'Focus on grip and bicep strength together',
      'Control the movement throughout',
      'Allow handle to rotate naturally',
      'Progressive overload possible'
    ],
    difficulty: 'Advanced',
    equipment: ['krassisPulley', 'rotatingHandle30mm'],
    targetAreas: ['bicepStrength'],
    sets: '4',
    reps: '6-10',
    restTime: '2 minutes',
    priority: 2
  },
  {
    id: 'dumbbell-hammer-curl',
    name: 'Dumbbell Hammer Curl',
    description: 'Standard power builder for bicep and brachialis strength.',
    instructions: [
      'Hold dumbbells with neutral grip',
      'Keep elbows close to body',
      'Curl weight focusing on bicep contraction',
      'Maintain neutral wrist position',
      'Control the negative portion',
      'Progressive weight increases'
    ],
    difficulty: 'Beginner',
    equipment: ['dumbbells'],
    targetAreas: ['bicepStrength'],
    sets: '4',
    reps: '10-12',
    restTime: '75 seconds',
    priority: 3
  },
  {
    id: 'barbell-preacher-curl',
    name: 'Barbell Preacher Curl',
    description: 'Elbow-down isolation for bicep strength and lockup power.',
    instructions: [
      'Use preacher bench with barbell',
      'Position arms on angled pad',
      'Curl weight with strict form',
      'Focus on bicep isolation',
      'Control the eccentric portion',
      'Avoid full extension to protect joints'
    ],
    difficulty: 'Intermediate',
    equipment: ['gym'],
    targetAreas: ['bicepStrength'],
    sets: '3-4',
    reps: '8-12',
    restTime: '90 seconds',
    priority: 4
  },
  {
    id: 'ez-bar-curl',
    name: 'EZ Bar Curl',
    description: 'Supplementary bicep exercise with comfortable grip angle.',
    instructions: [
      'Use EZ curl bar with comfortable grip',
      'Perform standard bicep curls',
      'Focus on full range of motion',
      'Control both concentric and eccentric',
      'Good for higher volume training',
      'Supplement to main bicep work'
    ],
    difficulty: 'Beginner',
    equipment: ['dumbbells'], // Using dumbbells as EZ bar substitute
    targetAreas: ['bicepStrength'],
    sets: '3',
    reps: '12-15',
    restTime: '60 seconds',
    priority: 5
  }
];