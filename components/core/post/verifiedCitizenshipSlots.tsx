import { CitizenCard } from '../CitizenCard'
import { Body1 } from '../Typography'
import { PostProps } from './Post'
import { PostSlots } from './post-slots'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VerifiedCitizenshipContent = (props: PostProps) => {
  return <Body1>Verified as Cabin Citizen</Body1>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VerifiedCitizenshipMedia = (props: PostProps) => {
  return <CitizenCard hovered={props.hovered} />
}

export const verifiedCitizenshipSlots: PostSlots = {
  Content: VerifiedCitizenshipContent,
  Media: VerifiedCitizenshipMedia,
}
