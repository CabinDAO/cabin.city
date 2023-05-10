import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { offerViewPropsFromFragment } from '@/utils/offer'
import { sampleOffer } from '@/stories/utils/offer-data'
import { OfferView } from '@/components/offers/OfferView'

export default {
  title: 'Page/Offer',
  component: OfferView,
} as ComponentMeta<typeof OfferView>

const Template: ComponentStory<typeof OfferView> = (args) => (
  <SingleColumnLayout hideNavbar>
    <OfferView {...args} />
  </SingleColumnLayout>
)

export const Default = Template.bind({})
Default.args = {
  offer: offerViewPropsFromFragment(sampleOffer),
}
