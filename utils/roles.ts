import { IconName } from '@/components/core/Icon'
import { ProfileRoleType } from '@/generated/graphql'

export interface RoleInfo {
  name: string
  description: string
  iconName: IconName
  imagePath: string
}

const RoleInfoByType: Record<ProfileRoleType, RoleInfo> = {
  [ProfileRoleType.Builder]: {
    name: 'Builder',
    description:
      'Maker of physical things that improve the built environment of neighborhoods.',
    iconName: 'builder',
    imagePath: '/images/builder.png',
  },
  [ProfileRoleType.Naturalist]: {
    name: 'Naturalist',
    description:
      'Grower of plants, animals, and human systems that support the natural environment.',
    iconName: 'naturalist',
    imagePath: '/images/naturalist.png',
  },
  [ProfileRoleType.Caretaker]: {
    name: 'Caretaker',
    description:
      'Operator of a neighborhood. Jack-of-all-trades ultimately responsible for a space.',
    iconName: 'caretaker',
    imagePath: '/images/caretaker.png',
  },
  [ProfileRoleType.Gatherer]: {
    name: 'Gatherer',
    description:
      'Space-maker in residence. The person on-site building the container and the culture.',
    iconName: 'gatherer',
    imagePath: '/images/gatherer.png',
  },
  [ProfileRoleType.Creator]: {
    name: 'Creator',
    description:
      'Very-online producer of art, novelty, content, and experiments that grow new possibilities.',
    iconName: 'creator',
    imagePath: '/images/creator.png',
  },
  [ProfileRoleType.Resident]: {
    name: 'Resident',
    description: 'Remote worker living across the neighborhood network.',
    iconName: 'resident',
    imagePath: '/images/resident.png',
  },
}

export const roleInfoFromType = (roleType: ProfileRoleType): RoleInfo => {
  return RoleInfoByType[roleType]
}
