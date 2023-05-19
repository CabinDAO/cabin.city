import { CitizenCard } from '../CitizenCard'
import { Body1 } from '../Typography'
import { CompactPostImage } from './CompactPostImage'
import { PostProps } from './Post'
import { PostSlots } from './post-slots'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VerifiedCitizenshipContent = (props: PostProps) => {
  return <Body1>Verified as Cabin Citizen</Body1>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VerifiedCitizenshipMedia = (props: PostProps) => {
  if (props.variant === 'compact') {
    return (
      <CompactPostImage
        alt="Cabin Citizen"
        imageUrl="/images/citizenship-thumbnail.png"
      />
    )
  } else {
    return <CitizenCard hovered={props.hovered} />
  }
}

export const verifiedCitizenshipSlots: PostSlots = {
  Content: VerifiedCitizenshipContent,
  Media: VerifiedCitizenshipMedia,
}
