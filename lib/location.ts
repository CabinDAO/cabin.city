import { LocationCardProps } from '@/components/core/LocationCard'
import { LocationItemFragment, LocationType } from '@/generated/graphql'
import { getImageUrlByIpfsHash } from './image'
import { parseISO } from 'date-fns'

export const locationCardPropsFromFragment = (
  fragment: LocationItemFragment
): LocationCardProps => {
  console.log(fragment.publishedAt)
  return {
    locationType: fragment.locationType ?? LocationType.Outpost,
    name: fragment.name,
    address: formatAddress(fragment.address),
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

const formatAddress = (address: LocationItemFragment['address']) => {
  return address
    ? `${address.locality}, ${address.admininstrativeAreaLevel1Short}`
    : null
}
