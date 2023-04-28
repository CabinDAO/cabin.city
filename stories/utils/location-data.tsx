import { Body1, H4 } from '@/components/core/Typography'
import {
  CitizenshipStatus,
  LocationMediaCategory,
  LocationType,
  OfferType,
  ProfileRoleLevelType,
  ProfileRoleType,
} from '@/generated/graphql'

export const DEFAULT_BANNER = '/images/test-location-banner.png'
export const SAMPLE_DESCRIPTION = (
  <>
    <section>
      <div>
        <H4>This is a headline</H4>
        <Body1>
          Escape to a charming mountain cabin nestled in the heart of nature.
          This cozy retreat features a warm and inviting interior, complete with
          a fireplace and rustic decor. Enjoy breathtaking views from the
          private deck, take a hike on nearby trails, or simply relax in the
          peaceful surroundings. Perfect for couples or small families seeking a
          serene.
        </Body1>
      </div>

      <div>
        <H4>This is a headline</H4>
        <Body1>
          Escape to a charming mountain cabin nestled in the heart of nature.
          This cozy retreat features a warm and inviting interior, complete with
          a fireplace and rustic decor.
        </Body1>
      </div>

      <ul>
        <li>
          This is a longer sentence to show a multi-line bullet point, just
          serving as a small example
        </li>
        <li>Apples</li>
        <li>Grapes</li>
        <li>Pineapples</li>
      </ul>
    </section>
  </>
)

export const sampleProfileAvatars = [
  '/images/sample-profile-avatar-1.png',
  '/images/sample-profile-avatar-2.png',
  '/images/sample-profile-avatar-3.png',
]

export const sampleLocation = {
  _id: '1',
  name: 'Firefly Hut',
  address: {
    locality: 'Oakland',
    admininstrativeAreaLevel1Short: 'CA',
  },
  description: null,
  offerCount: 3,
  sleepCapacity: 2,
  bannerImageUrl: DEFAULT_BANNER,
  mediaItems: {
    data: [
      {
        category: LocationMediaCategory.Sleeping,
        imageIpfsHash: 'QmaFKezRWFfpZ6Wu2sz7yNrPKU8r7EtdJwy6ncCqX5xvw3',
      },
      {
        category: LocationMediaCategory.Working,
        imageIpfsHash: 'QmeHuuumTXDPHQi8Mtyg6p2QNqGqHdaHjY6CTzxzpeaR3A',
      },
      {
        category: LocationMediaCategory.Features,
        imageIpfsHash: 'Qmc7R9bwERoZHBBCaZeWoY3D2JgWhxUUbMbKCwqvBkDTTJ',
      },
      {
        category: LocationMediaCategory.Sleeping,
        imageIpfsHash: 'QmYnt42rqpWWGkgWPPtvAx8FxqyVqTK8yqVy3nr3Qh5Qrt',
      },
    ],
  },
  votes: {
    // eslint-disable-next-line prefer-spread
    data: Array.apply(null, Array(27)).map((_, i) => ({
      count: 100 + i,
      profile: {
        _id: `${100 + i}`,
        avatar: {
          url: sampleProfileAvatars[i % 3],
        },
      },
    })),
  },
  offers: {
    data: [
      {
        _id: '1',
        offerType: OfferType.Residency,
        title: 'This is an offer title',
        startDate: '2023-05-01T00:00:00.000Z',
        endDate: '2023-06-01T00:00:00.000Z',
        locationType: LocationType.Outpost,
        profileRoleConstraints: [
          {
            profileRole: ProfileRoleType.Naturalist,
            level: ProfileRoleLevelType.Custodian,
          },
          {
            profileRole: ProfileRoleType.Builder,
            level: ProfileRoleLevelType.Artisan,
          },
          {
            profileRole: ProfileRoleType.Creator,
            level: ProfileRoleLevelType.Apprentice,
          },
        ],
        location: {
          _id: '10',
          name: 'Firefly Hut',
          address: {
            locality: 'Boone',
            admininstrativeAreaLevel1Short: 'NC',
          },
        },
      },
      {
        _id: '2',
        offerType: OfferType.BuildAndGrowWeek,
        title: 'This is an offer title',
        startDate: '2023-05-01T00:00:00.000Z',
        endDate: '2023-06-01T00:00:00.000Z',
        locationType: LocationType.Neighborhood,
        profileRoleConstraints: [
          {
            profileRole: ProfileRoleType.Caretaker,
            level: ProfileRoleLevelType.Custodian,
          },
          {
            profileRole: ProfileRoleType.Builder,
            level: ProfileRoleLevelType.Artisan,
          },
          {
            profileRole: ProfileRoleType.Gatherer,
            level: ProfileRoleLevelType.Apprentice,
          },
        ],
        location: {
          _id: '10',
          name: 'Firefly Hut',
          address: {
            locality: 'Boone',
            admininstrativeAreaLevel1Short: 'NC',
          },
        },
      },
      {
        _id: '3',
        offerType: OfferType.PaidColiving,
        title: 'This is an offer title',
        startDate: '2023-05-01T00:00:00.000Z',
        endDate: '2023-06-01T00:00:00.000Z',
        locationType: LocationType.Outpost,
        profileRoleConstraints: [
          {
            profileRole: ProfileRoleType.Gatherer,
            level: ProfileRoleLevelType.Custodian,
          },
          {
            profileRole: ProfileRoleType.Resident,
            level: ProfileRoleLevelType.Artisan,
          },
          {
            profileRole: ProfileRoleType.Creator,
            level: ProfileRoleLevelType.Apprentice,
          },
          {
            profileRole: ProfileRoleType.Caretaker,
            level: ProfileRoleLevelType.Apprentice,
          },
        ],
        location: {
          _id: '10',
          name: 'Firefly Hut',
          address: {
            locality: 'Boone',
            admininstrativeAreaLevel1Short: 'NC',
          },
        },
      },
    ],
  },
  voteCount: 354,
  caretaker: {
    _id: '4',
    email: 'april.ludgate@creatorcabins.com',
    badgeCount: 4,
    account: {
      address: '0x0',
    },
    name: 'April Ludgate',
    createdAt: '2019-02-01T00:00:00.000Z',
    citizenshipStatus: CitizenshipStatus.Verified,
    cabinTokenBalanceInt: 3102,
    roles: [
      {
        role: ProfileRoleType.Caretaker,
        level: ProfileRoleLevelType.Custodian,
      },
      {
        role: ProfileRoleType.Builder,
        level: ProfileRoleLevelType.Artisan,
      },
    ],
    avatar: {
      url: '/images/sample-caretaker-avatar.png',
    },
  },
  internetSpeedMbps: 122.5,
}
