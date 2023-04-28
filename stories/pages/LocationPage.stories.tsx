import { ComponentMeta, ComponentStory } from '@storybook/react'
import { LocationView } from '@/components/neighborhoods/LocationView'
import { LocationType } from '@/generated/graphql'
import { sampleLocation } from '@/stories/utils/location-data'
import { locationViewPropsFromFragment } from '@/lib/location'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'

export default {
  title: 'Page/Location',
  component: LocationView,
} as ComponentMeta<typeof LocationView>

const Template: ComponentStory<typeof LocationView> = (args) => (
  <SingleColumnLayout hideNavbar>
    <LocationView {...args} />
  </SingleColumnLayout>
)

export const Outpost = Template.bind({})
Outpost.args = {
  location: locationViewPropsFromFragment({
    ...sampleLocation,
    locationType: LocationType.Outpost,
  }),
}

export const Neighborhood = Template.bind({})
Neighborhood.args = {
  location: locationViewPropsFromFragment({
    ...sampleLocation,
    locationType: LocationType.Neighborhood,
  }),
}
