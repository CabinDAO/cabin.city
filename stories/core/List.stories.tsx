import { ProfileListItem } from '@/components/core/ProfileListItem'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { DEFAULT_PROFILE_PROPS } from '../utils/profile-data'
import { List } from '@/components/core/List'
import { OfferListItem } from '@/components/core/OfferListItem'
import { DEFAULT_OFFER_PROPS } from '../utils/offer-data'
import { Sort } from '@/components/core/Sort'

export default {
  title: 'Core/List',
  component: List,
} as ComponentMeta<typeof List>

const Template: ComponentStory<typeof List> = (args) => <List {...args} />

export const ProfileList = Template.bind({})
ProfileList.args = {
  total: 10400,
  children: [
    <ProfileListItem key="1" profile={DEFAULT_PROFILE_PROPS} />,
    <ProfileListItem key="2" profile={DEFAULT_PROFILE_PROPS} />,
  ],
  sortComponent: (
    <Sort
      selectedOption="newest"
      onSelectOption={(option) => console.info({ option })}
      fields={[
        {
          key: 'join_date',
          label: 'Join date',
          options: [
            {
              key: 'newest',
              label: 'Newest',
            },
            {
              key: 'oldest',
              label: 'Oldest',
            },
          ],
        },
      ]}
    />
  ),
}

export const OfferList = Template.bind({})
OfferList.args = {
  total: 10400,
  children: [
    <OfferListItem key="1" {...DEFAULT_OFFER_PROPS} />,
    <OfferListItem key="2" {...DEFAULT_OFFER_PROPS} />,
  ],
}
