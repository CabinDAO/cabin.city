import { IconName } from '@/components/core/Icon'
import {
  ProfileRoleConstraint,
  ProfileRoleLevelType,
  ProfileRoleType,
} from '@/generated/graphql'

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

export const RoleInfoByType: Record<ProfileRoleType, RoleInfo> = {
  [ProfileRoleType.Builder]: {
    name: 'Builder',
    description:
      'Maker of physical things that improve the built environment of neighborhoods.',
    iconName: 'builder',
    imagePath: '/images/builder.png',
    backgroundImagePath: '/images/builder-bg.png',
  },
  [ProfileRoleType.Naturalist]: {
    name: 'Naturalist',
    description:
      'Grower of plants, animals, and human systems that support the natural environment.',
    iconName: 'naturalist',
    imagePath: '/images/naturalist.png',
    backgroundImagePath: '/images/naturalist-bg.png',
  },
  [ProfileRoleType.Caretaker]: {
    name: 'Caretaker',
    description:
      'Operator of a neighborhood. Jack-of-all-trades ultimately responsible for a space.',
    iconName: 'caretaker',
    imagePath: '/images/caretaker.png',
    backgroundImagePath: '/images/caretaker-bg.png',
  },
  [ProfileRoleType.Gatherer]: {
    name: 'Gatherer',
    description:
      'Space-maker in residence. The person on-site building the container and the culture.',
    iconName: 'gatherer',
    imagePath: '/images/gatherer.png',
    backgroundImagePath: '/images/gatherer-bg.png',
  },
  [ProfileRoleType.Creator]: {
    name: 'Creator',
    description:
      'Very-online producer of art, novelty, content, and experiments that grow new possibilities.',
    iconName: 'creator',
    imagePath: '/images/creator.png',
    backgroundImagePath: '/images/creator-bg.png',
  },
  [ProfileRoleType.Resident]: {
    name: 'Resident',
    description: 'Remote worker living across the neighborhood network.',
    iconName: 'resident',
    imagePath: '/images/resident.png',
    backgroundImagePath: '/images/resident-bg.png',
  },
}

export const roleInfoFromType = (roleType: ProfileRoleType): RoleInfo => {
  return RoleInfoByType[roleType]
}

export const roleConstraintInfoFromType = ({
  profileRole,
  level,
}: ProfileRoleConstraint): RoleConstraintInfo => {
  const roleInfo = RoleInfoByType[profileRole]
  const levelInfo = LevelInfoByType[level]

  return {
    ...roleInfo,
    ...levelInfo,
    constraintName: `${roleInfo.name}${
      level === ProfileRoleLevelType.Apprentice
        ? ''
        : ` ${levelInfo.name.toLowerCase()}`
    }`,
  }
}

export const allRoles = Object.values(ProfileRoleType).map((roleType) => ({
  ...roleInfoFromType(roleType),
  roleType,
}))
