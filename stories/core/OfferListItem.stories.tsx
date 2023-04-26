import { ComponentMeta, ComponentStory } from '@storybook/react'
import { OfferListItem } from '@/components/core/OfferListItem'
import {
  DEFAULT_OFFER_PROPS,
  EMPTY_IMAGE_OFFER_PROPS,
} from '../utils/offer-data'

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
