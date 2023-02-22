import { ProfileRoleLevelType, ProfileRoleType } from '@/generated/graphql'

export interface LevelInfo {
  name: string
  number: number
}

const LevelInfoByType: Record<ProfileRoleLevelType, LevelInfo> = {
  [ProfileRoleLevelType.Apprentice]: {
    name: 'Apprentice',
    number: 1,
  },
  [ProfileRoleLevelType.Member]: {
    name: 'Member',
    number: 2,
  },
  [ProfileRoleLevelType.TopHat]: {
    name: 'Top Hat',
    number: 3,
  },
}

export const levelInfoFromType = (
  levelType: ProfileRoleLevelType
): LevelInfo => {
  return LevelInfoByType[levelType]
}
