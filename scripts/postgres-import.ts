import fs from 'fs'
import { prisma } from '../utils/prisma'
import { $Enums, Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import Decimal = Prisma.Decimal

// TODO: check that every field in the existing data is imported

// step 1 - set up airbyte and export all the data to json
// https://docs.airbyte.com/deploying-airbyte/local-deployment
// https://docs.fauna.com/fauna/v4/build/integrations/airbyte

// step 2 - run this script to import it into postgres

// https://app.quicktype.io/?l=ts is really helpful

const fileOrder = [
  '_airbyte_raw_BlockSyncAttempt.jsonl',
  '_airbyte_raw_Account.jsonl',
  '_airbyte_raw_Hat.jsonl',
  '_airbyte_raw_account_hats.jsonl',
  '_airbyte_raw_OtterspaceBadgeSpec.jsonl',
  '_airbyte_raw_OtterspaceBadge.jsonl',
  '_airbyte_raw_Profile.jsonl',
  '_airbyte_raw_ProfileVouch.jsonl',
  '_airbyte_raw_Location.jsonl',
  '_airbyte_raw_LocationVote.jsonl',
  '_airbyte_raw_Offer.jsonl',
  '_airbyte_raw_Activity.jsonl',
  '_airbyte_raw_ActivityReaction.jsonl',
  '_airbyte_raw_TrackingEvent.jsonl',
]

async function postgresImport() {
  console.info('Reading JSON...')

  const jsonDir = process.argv[2]
  if (!jsonDir) throw new Error('No path to export provided')
  console.log('jsonDir', jsonDir)

  // list all files in dir
  const files = fs.readdirSync(jsonDir)

  files.sort((a, b) => fileOrder.indexOf(a) - fileOrder.indexOf(b))

  for (const file of files) {
    const fullPath = `${jsonDir}${file}`
    const stat = fs.statSync(fullPath)
    if (!stat.isFile()) return

    const contents = fs.readFileSync(fullPath, 'utf8').trim()

    console.log(`parsing ${fullPath}`)

    if (!contents) {
      console.log(`its empty`)
      continue
    }

    const data = contents.split('\n').map((t) => JSON.parse(t.trim()))

    fileLoop: for (const datum of data) {
      switch (file) {
        case '_airbyte_raw_BlockSyncAttempt.jsonl':
          // await importBlockSyncAttempt(datum)
          // break
          console.log(
            'THESE ARE USELESS. can import later (or just import the ones that did not succeed)'
          )
          break fileLoop
        case '_airbyte_raw_Account.jsonl':
          await importAccount(datum)
          break
        case '_airbyte_raw_Hat.jsonl':
          await importHat(datum)
          break
        case '_airbyte_raw_account_hats.jsonl':
          await importAccountHat(datum)
          break
        case '_airbyte_raw_Activity.jsonl':
          await importActivity(datum)
          break
        case '_airbyte_raw_ActivityReaction.jsonl':
          await importActivityReaction(datum)
          break
        case '_airbyte_raw_Location.jsonl':
          await importLocation(datum)
          break
        case '_airbyte_raw_LocationVote.jsonl':
          await importLocationVote(datum)
          break
        case '_airbyte_raw_Offer.jsonl':
          await importOffer(datum)
          break
        case '_airbyte_raw_OtterspaceBadge.jsonl':
          await importBadge(datum)
          break
        case '_airbyte_raw_OtterspaceBadgeSpec.jsonl':
          await importBadgeSpec(datum)
          break
        case '_airbyte_raw_Profile.jsonl':
          await importProfile(datum)
          break
        case '_airbyte_raw_ProfileVouch.jsonl':
          await importProfileVouch(datum)
          break
        case '_airbyte_raw_TrackingEvent.jsonl':
          await importTrackingEvent(datum)
          break
        default:
          console.log(`no import for ${file}`)
          break fileLoop
      }
    }

    console.log(`finished parsing ${fullPath}`)
  }

  if (process.env.NEXT_PUBLIC_APP_ENV === 'dev') {
    console.log('updating profile privyDID and externId FOR DEV ENV')
    await prisma.profile.update({
      data: {
        privyDID: 'did:privy:cllbg13gx00gvl308y233umlo',
        externId: '373138526225564160',
      },
      where: {
        externId: '372516445316186185',
      },
    })
  }
}

async function importBlockSyncAttempt(datum: BlockSyncAttempt) {
  const d = datum._airbyte_data
  await prisma.blockSyncAttempt.create({
    data: {
      createdAt: new Date(d.ts / 1000),
      updatedAt: new Date(d.ts / 1000),
      key: d.data.key == 'HatsProtocol' ? 'Hats' : d.data.key,
      startBlock: d.data.startBlock,
      endBlock: d.data.endBlock,
      status: d.data.status,
      failedAttemptCount: d.data.failedAttemptCount ?? 0,
    },
  })
}

async function importAccount(datum: Account) {
  const d = datum._airbyte_data
  await prisma.wallet.create({
    data: {
      createdAt: new Date(d.ts / 1000),
      updatedAt: new Date(d.ts / 1000),
      faunaId: d.ref,
      address: d.data.address,
      cabinTokenBalance: d.data.cabinTokenBalance
        ? new Decimal(d.data.cabinTokenBalance).dividedBy(10 ** 18)
        : 0,
    },
  })
}

async function importHat(datum: Hat) {
  const d = datum._airbyte_data

  await prisma.hat.create({
    data: {
      createdAt: new Date(d.ts / 1000),
      updatedAt: new Date(d.ts / 1000),
      faunaId: d.ref,
      hatsProtocolId: d.data.hatId,
      details: d.data.details,
      imageUri: d.data.imageUri,
      level: d.data.level,
    },
  })
}

async function importAccountHat(datum: AccountHat) {
  const d = datum._airbyte_data

  await prisma.walletHat.create({
    data: {
      wallet: {
        connect: {
          faunaId: d.data.accountID.id,
        },
      },
      hat: {
        connect: {
          faunaId: d.data.hatID.id,
        },
      },
    },
  })
}

async function importProfile(datum: Profile) {
  const d = datum._airbyte_data

  await prisma.profile.create({
    data: {
      createdAt: new Date(d.ts / 1000),
      updatedAt: new Date(d.ts / 1000),
      externId: d.ref,
      privyDID: d.data.externalUserId,
      name: d.data.name,
      email: d.data.email,
      bio: d.data.bio ?? '',
      location: d.data.location ?? '',
      isAdmin: d.data.isAdmin,
      citizenshipStatus: d.data.citizenshipStatus,
      citizenshipTokenId: d.data.citizenshipMetadata?.tokenId
        ? parseInt(d.data.citizenshipMetadata.tokenId)
        : undefined,
      citizenshipMintedAt: d.data.citizenshipMetadata?.mintedAt,
      wallet: {
        connect: {
          faunaId: d.data.account.id,
        },
      },
      avatar: d.data.avatar
        ? {
            create: {
              url: d.data.avatar.url,
              contractAddress: d.data.avatar.contractAddress,
              tokenId: d.data.avatar.tokenId,
              title: d.data.avatar.title,
              tokenUri: d.data.avatar.tokenUri,
              network: d.data.avatar.network,
            },
          }
        : undefined,
      contactFields: {
        create: d.data.contactFields.map((cf) => ({
          type: cf.type,
          value: cf.value,
        })),
      },
      roles: {
        create: d.data.roles.map((r) => ({
          type: r.role,
          level: r.level,
          hat: r.hatId
            ? {
                connect: {
                  hatsProtocolId: r.hatId,
                },
              }
            : undefined,
        })),
      },
    },
  })
}

async function importProfileVouch(datum: ProfileVouch) {
  const d = datum._airbyte_data

  const voucher = await prisma.profile.findUnique({
    where: {
      externId: d.data.voucher.id,
    },
  })

  if (!voucher) {
    console.log(`no voucher found with extern id ${d.data.voucher.id}`)
    return
  }

  await prisma.profile.update({
    where: {
      externId: d.data.vouchee.id,
    },
    data: {
      voucherId: voucher.id,
    },
  })
}

async function importBadgeSpec(datum: BadgeSpec) {
  const d = datum._airbyte_data

  await prisma.badgeSpec.create({
    data: {
      createdAt: new Date(d.ts / 1000),
      updatedAt: new Date(d.ts / 1000),
      faunaId: d.ref,
      otterspaceSpecId: d.data.specId,
      name: d.data.name,
      description: d.data.description,
      image: d.data.image,
    },
  })
}

async function importBadge(datum: Badge) {
  const d = datum._airbyte_data

  await prisma.badge.create({
    data: {
      createdAt: new Date(d.ts / 1000),
      updatedAt: new Date(d.ts / 1000),
      faunaId: d.ref,
      otterspaceBadgeId: d.data.badgeId,
      wallet: {
        connect: {
          faunaId: d.data.account.id,
        },
      },
      spec: {
        connect: {
          faunaId: d.data.spec.id,
        },
      },
    },
  })
}

async function importLocation(datum: Location) {
  const d = datum._airbyte_data

  const dupeCheck: { [n: string]: number } = {}
  if (d.data.mediaItems) {
    for (let i = 0; i < d.data.mediaItems.length; i++) {
      if (
        !dupeCheck[
          `${d.data.mediaItems[i].ipfsHash}-${d.data.mediaItems[i].category}`
        ]
      ) {
        dupeCheck[
          `${d.data.mediaItems[i].ipfsHash}-${d.data.mediaItems[i].category}`
        ] = i
      }
    }
  }

  await prisma.location.create({
    data: {
      createdAt: new Date(d.ts / 1000),
      updatedAt: new Date(d.ts / 1000),
      externId: d.ref,
      type: d.data.locationType,
      name: d.data.name ?? '',
      tagline: d.data.tagline ?? '',
      description: d.data.description ?? '',
      bannerImageIpfsHash: d.data.bannerImageIpfsHash ?? '',
      mediaItems: {
        create: d.data.mediaItems
          ?.filter(
            // only keep first of duplicates
            (mi, i, a) => dupeCheck[`${mi.ipfsHash}-${mi.category}`] == i
          )
          .map((mi) => ({
            createdAt: new Date(d.ts / 1000),
            updatedAt: new Date(d.ts / 1000),
            category: mi.category,
            ipfsHash: mi.ipfsHash,
          })),
      },
      address:
        d.data.address && d.data.address.country
          ? {
              create: {
                lat: d.data.address.lat,
                lng: d.data.address.lng,
                formattedAddress: d.data.address.formattedAddress,
                streetNumber: d.data.address.streetNumber,
                route: d.data.address.route,
                routeShort: d.data.address.routeShort,
                locality: d.data.address.locality,
                admininstrativeAreaLevel1:
                  d.data.address.admininstrativeAreaLevel1,
                admininstrativeAreaLevel1Short:
                  d.data.address.admininstrativeAreaLevel1Short,
                country: d.data.address.country,
                countryShort: d.data.address.countryShort,
                postalCode: d.data.address.postalCode,
              },
            }
          : undefined,

      caretakerEmail: d.data.caretakerEmail,
      caretaker: {
        connect: {
          externId: d.data.caretaker.id,
        },
      },

      sleepCapacity: d.data.sleepCapacity ?? 0,
      internetSpeedMbps: d.data.internetSpeedMbps ?? 0,
      publishedAt: d.data.publishedAt,
    },
  })
}

async function importLocationVote(datum: LocationVote) {
  const d = datum._airbyte_data

  await prisma.locationVote.create({
    data: {
      location: {
        connect: {
          externId: d.data.location.id,
        },
      },
      profile: {
        connect: {
          externId: d.data.profile.id,
        },
      },
      count: d.data.count,
    },
  })
}

async function importOffer(datum: Offer) {
  const d = datum._airbyte_data
  await prisma.offer.create({
    data: {
      createdAt: new Date(d.ts / 1000),
      updatedAt: new Date(d.ts / 1000),
      externId: d.ref,
      type: d.data.offerType,
      title: d.data.title ?? '',
      description: d.data.description ?? '',
      startDate: d.data.startDate
        ? new Date(d.data.startDate)
        : new Date('1970-01-01'),
      endDate: d.data.endDate
        ? new Date(d.data.endDate)
        : new Date('1970-01-01'),
      priceAmountCents: d.data.price ? d.data.price.amountCents : 0,
      priceUnit: d.data.price ? d.data.price.unit : 'FlatFee',
      applicationUrl: d.data.applicationUrl ?? '',
      imageIpfsHash: d.data.imageIpfsHash ?? '',
      location: {
        connect: {
          externId: d.data.location.id,
        },
      },
      mediaItems: {
        create: d.data.mediaItems?.map((mi) => ({
          createdAt: new Date(d.ts / 1000),
          updatedAt: new Date(d.ts / 1000),
          ipfsHash: mi.ipfsHash,
        })),
      },
    },
  })
}

async function importActivity(datum: Activity) {
  const d = datum._airbyte_data

  if (d.data.type == 'LocationPromoted') return
  if (d.data.metadata?.offer?.id) {
    const offer = await prisma.offer.findUnique({
      where: {
        externId: d.data.metadata.offer.id,
      },
    })
    if (!offer) {
      console.log(`no offer found with extern id ${d.data.metadata.offer.id}`)
      return
    }
  }

  const profile = await prisma.profile.findUnique({
    where: {
      externId: d.data.profile.id,
    },
  })
  if (!profile) {
    console.log(`no profile with extern id ${d.data.profile.id} for role`)
    return
  }

  let role
  if (d.data.metadata?.profileRole) {
    role = await prisma.role.findUnique({
      where: {
        profileId_type: {
          profileId: profile.id,
          type: d.data.metadata.profileRole.role,
        },
      },
    })
    if (!role) {
      console.log(
        `no role with profile id ${profile.id} and type ${d.data.metadata.profileRole.role}`
      )
      return
    }
  }

  // console.log(`importing ${d.ref}`)

  await prisma.activity.create({
    data: {
      createdAt: new Date(d.ts / 1000),
      updatedAt: new Date(d.ts / 1000),
      externId: d.ref,
      key: d.data.key,
      type:
        d.data.type == 'ProfileBadgeAdded'
          ? 'BadgeAdded'
          : d.data.type == 'ProfileRoleAdded'
          ? 'RoleAdded'
          : d.data.type == 'VerifiedCitizenship'
          ? 'CitizenshipVerified'
          : d.data.type,
      text: d.data.text ?? '',
      profile: {
        connect: {
          externId: d.data.profile.id,
        },
      },
      badge: d.data.metadata?.badge
        ? {
            connect: {
              faunaId: d.data.metadata.badge.id,
            },
          }
        : undefined,
      roleTransactionId: d.data.transactionId,
      role: d.data.metadata?.profileRole
        ? {
            connect: {
              id: role?.id,
            },
          }
        : undefined,
      location: d.data.metadata?.location
        ? {
            connect: {
              externId: d.data.metadata.location.id,
            },
          }
        : undefined,
      offer: d.data.metadata?.offer
        ? {
            connect: {
              externId: d.data.metadata.offer.id,
            },
          }
        : undefined,
      citizenshipTokenId: d.data.metadata?.citizenshipTokenId
        ? parseInt(d.data.metadata.citizenshipTokenId)
        : undefined,
    },
  })
}

async function importActivityReaction(datum: ActivityReaction) {
  const d = datum._airbyte_data

  try {
    await prisma.activityReaction.create({
      data: {
        createdAt: new Date(d.ts / 1000),
        updatedAt: new Date(d.ts / 1000),
        profile: {
          connect: {
            externId: d.data.profile.id,
          },
        },
        activity: {
          connect: {
            externId: d.data.activity.id,
          },
        },
      },
    })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      // skip this reaction
    } else {
      throw e
    }
  }
}

async function importTrackingEvent(datum: TrackingEvent) {
  const d = datum._airbyte_data

  try {
    await prisma.profile.update({
      where: {
        externId: d.data.profile.id,
      },
      data: {
        isProfileSetupFinished:
          d.data.key == 'profile_setup_finished' ? true : undefined,
        isProfileSetupDismissed:
          d.data.key == 'profile_setup_dismissed' ? true : undefined,
      },
    })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      // profile was prolly deleted??? skip this event
    } else {
      throw e
    }
  }
}

type AirbyteRaw<T> = {
  _airbyte_ab_id: string
  _airbyte_emitted_at: number
  _airbyte_data: {
    ref: string
    ts: number
    ttl: null
    data: T
  }
}

type BlockSyncAttempt = AirbyteRaw<{
  key: 'HatsProtocol' | 'Otterspace' | 'CabinToken'
  status: $Enums.BlockSyncStatus
  startBlock: string
  endBlock: string
  failedAttemptCount?: number
}>

type Account = AirbyteRaw<{
  address: string
  cabinTokenBalance?: string
}>

type Hat = AirbyteRaw<{
  hatId: string
  details: string
  imageUri: string
  level: number
}>

type AccountHat = AirbyteRaw<{
  accountID: {
    id: string
  }
  hatID: {
    id: string
  }
}>

type Activity = AirbyteRaw<{
  key: string
  timestamp: Date
  type:
    | 'ProfileCreated'
    | 'ProfileBadgeAdded'
    | 'Text'
    | 'ProfileRoleAdded'
    | 'VerifiedCitizenship'
    | 'VouchRequested'
    | 'LocationPublished'
    | 'OfferCreated'
    | 'LocationPromoted'
  profile: {
    id: string
  }
  metadata?: {
    badge?: {
      id: string
    }
    profileRole?: {
      hatId: string
      role: $Enums.RoleType
      level: 'Artisan' | 'Custodian'
    }
    citizenshipTokenId?: string
    location?: {
      id: string
    }
    offer?: {
      id: string
    }
  }
  text?: string
  blockNumber?: string
  transactionId?: string
}>

type ActivityReaction = AirbyteRaw<{
  activity: {
    id: string
  }
  profile: {
    id: string
  }
}>

// type Cart = AirbyteRaw<{}> // none of these

type Location = AirbyteRaw<{
  locationType: 'Neighborhood' | 'Outpost'
  caretaker: {
    id: string
  }
  caretakerEmail: string
  voteCount: number
  offerCount: number
  tagline?: string
  name?: string
  sleepCapacity?: number
  internetSpeedMbps?: number
  address?: {
    lat?: number
    lng?: number
    formattedAddress?: string
    country?: string
    postalCode?: string
    routeShort?: string
    admininstrativeAreaLevel1Short?: string
    countryShort?: string
    streetNumber?: string
    route?: string
    admininstrativeAreaLevel1?: string
    locality?: string
  }
  description?: string
  mediaItems?: {
    category: 'Sleeping' | 'Working' | 'Features'
    ipfsHash: string
  }[]
  bannerImageIpfsHash?: string
  publishedAt?: Date
  offerTypes?: ('PaidColiving' | 'CabinWeek' | 'Residency')[]
  referrer?: {
    id: string
  }
}>

// type LocationMediaItem = AirbyteRaw<{}> // none of these

type LocationVote = AirbyteRaw<{
  location: {
    id: string
  }
  profile: {
    id: string
  }
  count: number
}>

type Offer = AirbyteRaw<{
  offerType: 'PaidColiving' | 'Residency' | 'CabinWeek'
  location: {
    id: string
  }
  locationType: 'Neighborhood' | 'Outpost'
  title?: string
  description?: string
  endDate?: string
  price?: {
    unit: 'Monthly' | 'Daily' | 'FlatFee' | 'Weekly'
    amountCents: number
  }
  applicationUrl?: string
  startDate?: string
  imageIpfsHash?: string
  citizenshipRequired?: boolean
  profileRoleConstraints?: {
    profileRole: string
    level: 'Apprentice' | 'Artisan' | 'Custodian'
  }[]
  minimunCabinBalance?: number
  mediaItems?: {
    ipfsHash: string
  }[]
}>

type Badge = AirbyteRaw<{
  badgeId: string
  createdAt: Date
  account: {
    id: string
  }
  spec: {
    id: string
  }
}>

type BadgeSpec = AirbyteRaw<{
  specId: string
  name: string
  description: string
  image: string
}>

type Profile = AirbyteRaw<{
  account: {
    id: string
  }
  createdAt: Date
  name: string
  email: string
  roles: {
    role:
      | 'Builder'
      | 'Naturalist'
      | 'Creator'
      | 'Caretaker'
      | 'Gatherer'
      | 'Resident'
    level: 'Apprentice' | 'Custodian' | 'Artisan'
    hatId?: string
  }[]
  contactFields: {
    type:
      | 'Discord'
      | 'Twitter'
      | 'Website'
      | 'Email'
      | 'Instagram'
      | 'LinkedIn'
      | 'Farcaster'
      | 'Telegram'
      | 'Lens'
    value: string
  }[]
  cabinTokenBalanceInt: number
  badgeCount: number
  location?: string
  bio?: string
  avatar?: {
    url: string
    contractAddress?: string
    tokenId?: string
    title?: string
    tokenUri?: string
    network?: 'eth-mainnet' | 'opt-mainnet'
  }
  citizenshipStatus?: 'Vouched' | 'Verified' | 'VouchRequested'
  externalUserId: string
  features?: ('citizenship' | 'city' | 'citizen')[]
  citizenshipMetadata?: {
    tokenId?: string
    mintedAt?: Date
  }
  isAdmin?: boolean
}>

type ProfileVouch = AirbyteRaw<{
  voucher: {
    id: string
  }
  vouchee: {
    id: string
  }
}>

type TrackingEvent = AirbyteRaw<{
  profile: {
    id: string
  }
  key: 'profile_setup_finished' | 'profile_setup_dismissed'
  count: number
}>

postgresImport()
  .then(async () => {
    console.log('done')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
