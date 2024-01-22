import { IconName } from '@/components/core/Icon'
import {
  ProfileRoleConstraint,
  ProfileRoleLevelType,
} from '@/generated/graphql'
import { RoleType } from '@/utils/types/profile'

export interface RoleInfo {
  name: string
  description: string
  iconName: IconName
  imagePath: string
  backgroundImagePath: string
}

export interface LevelInfo {
  name: string
}

export type RoleConstraintInfo = RoleInfo &
  LevelInfo & {
    constraintName: string
  }

export const LevelInfoByType: Record<ProfileRoleLevelType, LevelInfo> = {
  [ProfileRoleLevelType.Apprentice]: { name: 'Apprentice' },
  [ProfileRoleLevelType.Artisan]: { name: 'Artisan' },
  [ProfileRoleLevelType.Custodian]: { name: 'Custodian' },
}

export const RoleInfoByType: Record<RoleType, RoleInfo> = {
  [RoleType.Builder]: {
    name: 'Builder',
    description:
      'Maker of physical things that improve the built environment of neighborhoods.',
    iconName: 'builder',
    imagePath: '/images/builder.png',
    backgroundImagePath: '/images/builder-bg.png',
  },
  [RoleType.Naturalist]: {
    name: 'Naturalist',
    description:
      'Grower of plants, animals, and human systems that support the natural environment.',
    iconName: 'naturalist',
    imagePath: '/images/naturalist.png',
    backgroundImagePath: '/images/naturalist-bg.png',
  },
  [RoleType.Caretaker]: {
    name: 'Caretaker',
    description:
      'Operator of a neighborhood. Jack-of-all-trades ultimately responsible for a space.',
    iconName: 'caretaker',
    imagePath: '/images/caretaker.png',
    backgroundImagePath: '/images/caretaker-bg.png',
  },
  [RoleType.Gatherer]: {
    name: 'Gatherer',
    description:
      'Space-maker in residence. The person on-site building the container and the culture.',
    iconName: 'gatherer',
    imagePath: '/images/gatherer.png',
    backgroundImagePath: '/images/gatherer-bg.png',
  },
  [RoleType.Creator]: {
    name: 'Creator',
    description:
      'Very-online producer of art, novelty, content, and experiments that grow new possibilities.',
    iconName: 'creator',
    imagePath: '/images/creator.png',
    backgroundImagePath: '/images/creator-bg.png',
  },
  [RoleType.Resident]: {
    name: 'Resident',
    description: 'Remote worker living across the neighborhood network.',
    iconName: 'resident',
    imagePath: '/images/resident.png',
    backgroundImagePath: '/images/resident-bg.png',
  },
}

export const roleInfoFromType = (roleType: RoleType): RoleInfo => {
  return RoleInfoByType[roleType]
}

type RoleConstraintInfoParams = ProfileRoleConstraint & { hideLevel?: boolean }

export const roleConstraintInfoFromType = ({
  profileRole,
  level,
  hideLevel = false,
}: RoleConstraintInfoParams): RoleConstraintInfo => {
  const roleInfo = RoleInfoByType[profileRole]
  const levelInfo = LevelInfoByType[level]

  return {
    ...roleInfo,
    ...levelInfo,
    constraintName: `${roleInfo.name}${
      hideLevel ? '' : ` ${levelInfo.name.toLowerCase()}`
    }`,
  }
}

export const allRoles = Object.values(RoleType).map((roleType) => ({
  ...roleInfoFromType(roleType),
  roleType,
}))
