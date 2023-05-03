import { ComponentMeta, ComponentStory } from '@storybook/react'
import { OfferListItem } from '@/components/core/OfferListItem'
import {
  DEFAULT_OFFER_PROPS,
  EMPTY_IMAGE_OFFER_PROPS,
} from '../utils/offer-data'
import { ProfileRoleLevelType, ProfileRoleType } from '@/generated/graphql'

export default {
  title: 'Core/OfferListItem',
  component: OfferListItem,
} as ComponentMeta<typeof OfferListItem>

const Template: ComponentStory<typeof OfferListItem> = (args) => (
  <OfferListItem {...args} />
)

export const Default = Template.bind({})
Default.args = DEFAULT_OFFER_PROPS

export const EmptyImage = Template.bind({})
EmptyImage.args = EMPTY_IMAGE_OFFER_PROPS

export const Locked = Template.bind({})
Locked.args = { ...DEFAULT_OFFER_PROPS, isLocked: true }

export const SingleRoleEligibility = Template.bind({})
SingleRoleEligibility.args = {
  ...DEFAULT_OFFER_PROPS,
  profileRoleConstraints: [
    {
      profileRole: ProfileRoleType.Builder,
      level: ProfileRoleLevelType.Artisan,
    },
  ],
}

export const CitizenshipRequired = Template.bind({})
CitizenshipRequired.args = {
  ...DEFAULT_OFFER_PROPS,
  citizenshipRequired: true,
}
