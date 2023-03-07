import { ProfileProgressCardSection } from '@/components/profile/view-profile/ProfileProgressCardSection'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/ProfileProgressCardSection',
  component: ProfileProgressCardSection,
} as ComponentMeta<typeof ProfileProgressCardSection>

const Template: ComponentStory<typeof ProfileProgressCardSection> = (args) => (
  <ProfileProgressCardSection {...args} />
)

export const Default = Template.bind({})

Default.args = {
  progress: 0,
  profileId: '1',
}

export const Progress = Template.bind({})
Progress.args = {
  progress: 25,
  profileId: '1',
}

export const Complete = Template.bind({})
Complete.args = {
  progress: 100,
  profileId: '1',
}
