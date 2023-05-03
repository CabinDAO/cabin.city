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
