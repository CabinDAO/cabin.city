import { ProfileSetupSection } from '@/components/profile/view-profile/ProfileSetupSection'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/ProfileSetupSection',
  component: ProfileSetupSection,
} as ComponentMeta<typeof ProfileSetupSection>

const Template: ComponentStory<typeof ProfileSetupSection> = (args) => (
  <ProfileSetupSection {...args} />
)

export const Default = Template.bind({})

Default.args = {
  profileId: '1',
}

export const Progress = Template.bind({})
Progress.args = {
  profileId: '1',
}

export const Complete = Template.bind({})
Complete.args = {
  profileId: '1',
}
