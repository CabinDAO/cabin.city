import { LocationPostItem } from '@/components/core/post/LocationPostItem'
import { LocationType } from '@/generated/graphql'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/LocationPostItem',
  component: LocationPostItem,
} as ComponentMeta<typeof LocationPostItem>

const Template: ComponentStory<typeof LocationPostItem> = (args) => (
  <LocationPostItem {...args} />
)

export const Neighborhood = Template.bind({})

Neighborhood.args = {
  _id: '1',
  locationType: LocationType.Neighborhood,
  name: 'Neighborhood Zero',
  tagline: 'Cradled in the middle of an forest, this Cabin is waiting for you.',
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
  tagline: 'Cradled in the middle of an forest, this Cabin is waiting for you.',
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
