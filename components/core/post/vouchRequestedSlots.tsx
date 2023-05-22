import { Body1 } from '../Typography'
import { PostSlots } from './post-slots'

const VouchRequestedContent = () => (
  <Body1>Just requested a Citizenship vouch</Body1>
)

export const vouchRequestedSlots: PostSlots = {
  Content: VouchRequestedContent,
}
