import { Body1 } from '../Typography'
import { PostProps } from './Post'
import { PostSlots } from './post-slots'
import { OfferPostItem } from './OfferPostItem'
import { offerListItemPropsFromFragment } from '@/utils/offer'
import { useProfile } from '@/components/auth/useProfile'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OfferContent = (props: PostProps) => {
  return <Body1>Posted a new experience</Body1>
}

const OfferMedia = (props: PostProps) => {
  const offer = props.activityItem.activity.metadata?.offer
  const { user } = useProfile()

  if (offer && user) {
    return <OfferPostItem {...offerListItemPropsFromFragment(offer, user)} />
  } else {
    return null
  }
}

export const offerCreatedSlots: PostSlots = {
  Content: OfferContent,
  Media: OfferMedia,
}
