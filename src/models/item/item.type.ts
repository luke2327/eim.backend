export type OVERALL_CATEGORY =
  | 'Equip'
  | 'Use'
  | 'Cash';

export type SUB_CATEGORY =
  | 'Miracle Cube'
  | 'Bottom'
  | 'Cape'
  | 'Glove'
  | 'Hat'
  | 'Overall'
  | 'Shoes'
  | 'Top';

export type CATEGORY =
  | 'Equipment Modification'
  | 'Special Scroll'
  | 'OneHandedWeapon'
  | 'TwoHandedWeapon'
  | 'Armor';

export type AVAILABLE_CUBE =
  | '5062009'  // 레드 큐브
  | '5062010'  // 블랙 큐브
  | '5062500'; // 에디셔널 큐브

export type REQ_JOBS =
  | 'Beginner'
  | 'Magician'
  | 'Warrior'
  | 'Bowman'
  | 'Pirate'
  | 'Thief';

export type REQ_JOBS_CODE =
  | 0
  | 1
  | 2
  | 4
  | 8
  | 16;

export type REQ_GENDER =
  | 0
  | 2
  | 3
  | 4
  | 5;

export type IS_CASH =
  | 0
  | 1;