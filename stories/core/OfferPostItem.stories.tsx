import { OfferPostItem } from '@/components/core/post/OfferPostItem'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { DEFAULT_OFFER_PROPS } from '../utils/offer-data'

export default {
  title: 'Core/OfferPostItem',
  component: OfferPostItem,
} as ComponentMeta<typeof OfferPostItem>

const Template: ComponentStory<typeof OfferPostItem> = (args) => (
  <OfferPostItem {...args} />
)

export const Offer = Template.bind({})

Offer.args = DEFAULT_OFFER_PROPS
