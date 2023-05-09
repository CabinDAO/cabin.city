import { LocationCard } from '@/components/core/LocationCard'
import { LocationType } from '@/generated/graphql'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import styled from 'styled-components'

export default {
  title: 'Core/LocationCard',
  component: LocationCard,
} as ComponentMeta<typeof LocationCard>

const Template: ComponentStory<typeof LocationCard> = (args) => (
  <Container>
    <LocationCard {...args} />
  </Container>
)

export const Neighborhood = Template.bind({})
Neighborhood.args = {
  _id: '1',
  locationType: LocationType.Neighborhood,
  name: 'Neighborhood Zero',
  tagline: 'A Cabin Neighborhood in the Texas Hill County.',
  bannerImageUrl:
    'https://fastly.picsum.photos/id/432/1400/600.jpg?hmac=qPwc5sKUwbdvC1VdnqoSjtOb-V_XC7BSc3nVuZYwv_Y',
  voteCount: 4100,
  address: 'Texas Hill Country, TX',
  caretaker: {
    _id: '1',
    name: 'Jon Hillis',
  },
  sleepCapacity: 7,
  offerCount: 7,
  publishedAt: new Date(),
}

export const Outpost = Template.bind({})
Outpost.args = {
  _id: '1',
  locationType: LocationType.Outpost,
  name: 'Neighborhood Zero',
  tagline: 'A Cabin Neighborhood in the Texas Hill County.',
  bannerImageUrl:
    'https://fastly.picsum.photos/id/432/1400/600.jpg?hmac=qPwc5sKUwbdvC1VdnqoSjtOb-V_XC7BSc3nVuZYwv_Y',
  voteCount: 4100,
  address: 'Texas Hill Country, TX',
  caretaker: {
    _id: '1',
    name: 'Jon Hillis',
  },
  sleepCapacity: 7,
  offerCount: 7,
  publishedAt: new Date(),
}

export const Voters = Template.bind({})
Voters.args = {
  _id: '1',
  locationType: LocationType.Outpost,
  name: 'Neighborhood Zero',
  tagline: 'A Cabin Neighborhood in the Texas Hill County.',
  bannerImageUrl:
    'https://fastly.picsum.photos/id/432/1400/600.jpg?hmac=qPwc5sKUwbdvC1VdnqoSjtOb-V_XC7BSc3nVuZYwv_Y',
  voteCount: 4100,
  address: 'Texas Hill Country, TX',
  caretaker: {
    _id: '1',
    name: 'Jon Hillis',
  },
  voters: [
    {
      _id: '2',
      avatar: {
        url: 'https://fastly.picsum.photos/id/190/200/200.jpg?hmac=WWXFTlTLvsXZseURWcXXDOC8Ie54it2IFL1gasrgrMQ',
      },
    },
    {
      _id: '2',
      avatar: {
        url: 'https://fastly.picsum.photos/id/667/200/200.jpg?hmac=Dqc51PnEPXpiiStRcDoPxytal0MOGvzg-eDZ4BsVIz8',
      },
    },
    {
      _id: '3',
      avatar: {
        url: 'https://fastly.picsum.photos/id/15/200/200.jpg?hmac=8F3A7g2kO57xRlUcdio-9o4LDz0oEFZrYMldJkHMpVo',
      },
    },
    {
      _id: '4',
      avatar: {
        url: 'https://fastly.picsum.photos/id/799/200/200.jpg?hmac=zFQHfBiAYFHDNrr3oX_pQDYz-YWPWTDB3lIszvP8rRY',
      },
    },
  ],
  sleepCapacity: 7,
  offerCount: 7,
  publishedAt: new Date(),
}

export const TwoVotes = Template.bind({})
TwoVotes.args = {
  _id: '1',
  locationType: LocationType.Outpost,
  name: 'Neighborhood Zero',
  tagline: 'A Cabin Neighborhood in the Texas Hill County.',
  bannerImageUrl:
    'https://fastly.picsum.photos/id/432/1400/600.jpg?hmac=qPwc5sKUwbdvC1VdnqoSjtOb-V_XC7BSc3nVuZYwv_Y',
  voteCount: 4100,
  address: 'Texas Hill Country, TX',
  caretaker: {
    _id: '1',
    name: 'Jon Hillis',
  },
  voters: [
    {
      _id: '2',
      avatar: {
        url: 'https://fastly.picsum.photos/id/190/200/200.jpg?hmac=WWXFTlTLvsXZseURWcXXDOC8Ie54it2IFL1gasrgrMQ',
      },
    },
    {
      _id: '2',
      avatar: {
        url: 'https://fastly.picsum.photos/id/667/200/200.jpg?hmac=Dqc51PnEPXpiiStRcDoPxytal0MOGvzg-eDZ4BsVIz8',
      },
    },
  ],
  sleepCapacity: 7,
  offerCount: 7,
  publishedAt: new Date(),
}

export const Draft = Template.bind({})
Draft.args = {
  _id: '1',
  caretaker: {
    _id: '1',
    name: 'April Ludgate',
  },
}

const Container = styled.div`
  max-width: 84rem;
`
