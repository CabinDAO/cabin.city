import { Body1 } from '../Typography'
import { PostSlots } from './post-slots'

const ProfileCreatedContent = () => <Body1>Created a Cabin profile</Body1>

export const profileCreatedSlots: PostSlots = {
  Content: ProfileCreatedContent,
}
