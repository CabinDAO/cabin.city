import { ComponentMeta, ComponentStory } from '@storybook/react'
import { LocationPhotosView } from '@/components/neighborhoods/LocationPhotosView'
import { locationViewPropsFromFragment } from '@/lib/location'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { sampleLocation } from '@/stories/utils/location-data'

export default {
  title: 'Page/LocationPhotos',
  component: LocationPhotosView,
} as ComponentMeta<typeof LocationPhotosView>

const Template: ComponentStory<typeof LocationPhotosView> = (args) => (
  <SingleColumnLayout hideNavbar>
    <LocationPhotosView {...args} />
  </SingleColumnLayout>
)

export const Default = Template.bind({})
Default.args = {
  location: locationViewPropsFromFragment(sampleLocation),
}
