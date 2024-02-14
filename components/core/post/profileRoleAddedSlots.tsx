import { levelInfoFromType } from '@/utils/levels'
import { roleInfoFromType } from '@/utils/roles'
import { RoleCard } from '../RoleCard'
import { RoleCardBackdrop } from '../RoleCardBackdrop'
import { Body1 } from '../Typography'
import { CompactPostImage } from './CompactPostImage'
import { PostProps } from './Post'
import { PostSlots } from './post-slots'

const ProfileRoleAddedContent = (props: PostProps) => {
  const { activity } = props

  if (!activity.metadata?.role) {
    console.error('RoleAdded activity without metadata.profileRole')
    return null
  }
  const roleInfo = roleInfoFromType(activity.metadata.role.type)

  return (
    <Body1>
      Leveled up to {activity.metadata.role.level} {roleInfo.name}
    </Body1>
  )
}

const ProfileRoleAddedMedia = (props: PostProps) => {
  const { activity, hovered } = props

  if (!activity.metadata?.role) {
    console.error('RoleAdded activity without metadata.profileRole')
    return null
  }

  const roleInfo = roleInfoFromType(activity.metadata.role.type)
  const levelInfo = levelInfoFromType(activity.metadata.role.level)

  if (props.variant === 'compact') {
    return (
      <CompactPostImage alt={roleInfo.name} imageUrl={roleInfo.imagePath} />
    )
  } else {
    return (
      <RoleCardBackdrop roleInfo={roleInfo}>
        <RoleCard hovered={hovered} roleInfo={roleInfo} levelInfo={levelInfo} />
      </RoleCardBackdrop>
    )
  }
}

export const profileRoleAddedSlots: PostSlots = {
  Content: ProfileRoleAddedContent,
  Media: ProfileRoleAddedMedia,
}
