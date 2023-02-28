import { ProfileListItem } from '@/components/core/ProfileListItem'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { DEFAULT_PROFILE_PROPS } from '../utils/profile-data'

export default {
  title: 'Core/ProfileListItem',
  component: ProfileListItem,
} as ComponentMeta<typeof ProfileListItem>

const Template: ComponentStory<typeof ProfileListItem> = (args) => (
  <ProfileListItem {...args} />
)

export const Default = Template.bind({})
Default.args = {
  profile: DEFAULT_PROFILE_PROPS,
}
