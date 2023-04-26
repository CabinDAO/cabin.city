import { LocationCardProps } from '@/components/core/LocationCard'
import { LocationItemFragment, LocationType } from '@/generated/graphql'
import { getImageUrlByIpfsHash } from './image'
import { parseISO } from 'date-fns'
import { formatShortAddress } from './address'

export const locationCardPropsFromFragment = (
  fragment: LocationItemFragment
): LocationCardProps => {
  return {
    locationType: fragment.locationType ?? LocationType.Outpost,
    name: fragment.name,
    address: formatShortAddress(fragment.address),
    caretaker: fragment.caretaker,
    tagline: fragment.tagline,
    bannerImageUrl: getImageUrlByIpfsHash(fragment.bannerImageIpfsHash),
    voteCount: fragment.voteCount,
    voters: [], // TODO
    sleepCapacity: fragment.sleepCapacity,
    offerCount: fragment.offerCount,
    publishedAt: parseISO(fragment.publishedAt),
  }
}
