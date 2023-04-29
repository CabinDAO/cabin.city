import { OfferListItemProps } from '@/components/core/OfferListItem'
import { addMonths } from 'date-fns'
import {
  LocationType,
  OfferPriceUnit,
  OfferType,
  ProfileRoleLevelType,
  ProfileRoleType,
} from '@/generated/graphql'
import { Body1, H4 } from '@/components/core/Typography'

export const DEFAULT_OFFER_PROPS: OfferListItemProps = {
  _id: '123',
  offerType: OfferType.Residency,
  locationType: LocationType.Neighborhood,
  title: 'May creator residency',
  startDate: new Date(),
  endDate: addMonths(new Date(), 1),
  imageUrl: 'https://picsum.photos/64',
  location: {
    _id: '456',
    name: 'Firefly Hut',
    shortAddress: 'Boone, NC',
  },
}

export const EMPTY_IMAGE_OFFER_PROPS: OfferListItemProps = {
  _id: '123',
  offerType: OfferType.Residency,
  locationType: LocationType.Neighborhood,
  title: 'May creator residency',
  startDate: new Date(),
  endDate: addMonths(new Date(), 1),
  imageUrl: undefined,
  location: {
    _id: '456',
    name: 'Firefly Hut',
    shortAddress: 'Boone, NC',
  },
}

export const sampleOffer = {
  _id: '1',
  offerType: OfferType.Residency,
  title: 'This is an offer title',
  startDate: '2023-05-01T00:00:00.000Z',
  endDate: '2023-06-01T00:00:00.000Z',
  locationType: LocationType.Outpost,
  price: {
    amountCents: 17200,
    unit: OfferPriceUnit.Monthly,
  },
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
}

export const SAMPLE_DESCRIPTION = (
  <>
    <section>
      <div>
        <H4>Description</H4>
        <Body1>
          Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos. Curabitur tempus urna at turpis condimentum
          lobortis.
        </Body1>
      </div>

      <div>
        <H4>What to expect</H4>
        <Body1>
          Consectetur adipiscing elit. Nunc vulputate libero et velit interdum,
          ac aliquet odio mattis. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus
          urna at turpis condimentum lobortis worem ipsum dolor sit amet.
        </Body1>
      </div>

      <div>
        <H4>Features</H4>
        <Body1>
          Consectetur adipiscing elit. Nunc vulputate libero et velit interdum,
          ac aliquet odio mattis. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus
          urna at turpis condimentum lobortis worem ipsum dolor sit amet.
        </Body1>
      </div>
    </section>
  </>
)
