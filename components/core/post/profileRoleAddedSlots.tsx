import { levelInfoFromType } from '@/utils/levels'
import { roleInfoFromType } from '@/utils/roles'
import { RoleCard } from '../RoleCard'
import { RoleCardBackdrop } from '../RoleCardBackdrop'
import { Body1 } from '../Typography'
import { PostProps } from './Post'
import { PostSlots } from './post-slots'

const ProfileRoleAddedContent = (props: PostProps) => {
  const { activityItem } = props

  if (!activityItem.activity.metadata?.profileRole) {
    console.error('ProfileRoleAdded activity without metadata.profileRole')
    return null
  }
  const roleInfo = roleInfoFromType(
    activityItem.activity.metadata.profileRole.role
  )

  return (
    <Body1>
      Leveled up to {activityItem.activity.metadata.profileRole.level}{' '}
      {roleInfo.name}
    </Body1>
  )
}

const ProfileRoleAddedMedia = (props: PostProps) => {
  const { activityItem } = props

  if (!activityItem.activity.metadata?.profileRole) {
    console.error('ProfileRoleAdded activity without metadata.profileRole')
    return null
  }

  const roleInfo = roleInfoFromType(
    activityItem.activity.metadata.profileRole.role
  )
  const levelInfo = levelInfoFromType(
    activityItem.activity.metadata.profileRole.level
  )

  return (
    <RoleCardBackdrop roleInfo={roleInfo}>
      <RoleCard roleInfo={roleInfo} levelInfo={levelInfo} />
    </RoleCardBackdrop>
  )
}

export const profileRoleAddedSlots: PostSlots = {
  Content: ProfileRoleAddedContent,
  Media: ProfileRoleAddedMedia,
}
