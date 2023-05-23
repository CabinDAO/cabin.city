import { LocationCardProps } from '@/components/core/LocationCard'
import {
  LocationFragment,
  LocationItemFragment,
  LocationType,
} from '@/generated/graphql'
import { getImageUrlByIpfsHash } from './image'
import { parseISO } from 'date-fns'
import { formatShortAddress } from './address'
import { LocationProps } from '@/components/neighborhoods/LocationView'
import { isNotNull } from '@/lib/data'

export const locationCardPropsFromFragment = (
  fragment: LocationItemFragment
): LocationCardProps => {
  return {
    _id: fragment._id,
    address: formatShortAddress(fragment.address),
    bannerImageUrl: getImageUrlByIpfsHash(fragment.bannerImageIpfsHash, true),
    caretaker: fragment.caretaker,
    locationType: fragment.locationType ?? LocationType.Outpost,
    name: fragment.name,
    offerCount: fragment.offerCount,
    publishedAt: fragment.publishedAt ? parseISO(fragment.publishedAt) : null,
    sleepCapacity: fragment.sleepCapacity,
    tagline: fragment.tagline,
    voteCount: fragment.voteCount,
    voters: fragment.votes.data
      .filter((v) => v && v?.count > 0)
      .filter(isNotNull)
      .map((v) => v.profile),
    hideNeighborTag: false,
  }
}

export const locationViewPropsFromFragment = (
  fragment: LocationFragment
): LocationProps => {
  return {
    _id: fragment._id,
    address: formatShortAddress(fragment.address),
    bannerImageUrl: getImageUrlByIpfsHash(fragment.bannerImageIpfsHash, true),
    caretaker: fragment.caretaker,
    caretakerEmail: fragment.caretakerEmail,
    description: fragment.description,
    locationType: fragment.locationType ?? LocationType.Outpost,
    mediaItems: fragment.mediaItems?.filter(isNotNull) ?? [],
    name: fragment.name,
    offerCount: fragment.offerCount ?? 0,
    sleepCapacity: fragment.sleepCapacity,
    internetSpeedMbps: fragment.internetSpeedMbps,
    voteCount: fragment.voteCount,
    offers: fragment.offers.data.filter(isNotNull),
    votes: fragment.votes.data
      .filter((v) => v && v?.count > 0)
      .filter(isNotNull),
    publishedAt: fragment.publishedAt ? parseISO(fragment.publishedAt) : null,
  }
}
