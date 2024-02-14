import { RoleLevel } from '@/utils/types/profile'

export interface LevelInfo {
  name: string
  number: number
}

const LevelInfoByType: Record<RoleLevel, LevelInfo> = {
  [RoleLevel.Apprentice]: {
    name: 'Apprentice',
    number: 1,
  },
  [RoleLevel.Artisan]: {
    name: 'Artisan',
    number: 2,
  },
  [RoleLevel.Custodian]: {
    name: 'Custodian',
    number: 3,
  },
}

export const levelInfoFromType = (levelType: RoleLevel): LevelInfo => {
  return LevelInfoByType[levelType]
}

export const allLevels = Object.values(RoleLevel).map((levelType) => ({
  ...levelInfoFromType(levelType),
  levelType,
}))
