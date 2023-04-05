import { ProfileList } from '@/components/core/ProfileList'
import { ProfileListItem } from '@/components/core/ProfileListItem'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { DEFAULT_PROFILE_PROPS } from '../utils/profile-data'

export default {
  title: 'Core/ProfileList',
  component: ProfileList,
} as ComponentMeta<typeof ProfileList>

const Template: ComponentStory<typeof ProfileList> = (args) => (
  <ProfileList {...args} />
)

export const Default = Template.bind({})
Default.args = {
  total: 10400,
  children: [
    <ProfileListItem key="1" profile={DEFAULT_PROFILE_PROPS} />,
    <ProfileListItem key="2" profile={DEFAULT_PROFILE_PROPS} />,
  ],
}
