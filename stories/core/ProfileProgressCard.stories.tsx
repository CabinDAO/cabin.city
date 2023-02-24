import { ProfileProgressCard } from '@/components/core/ProfileProgressCard'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/ProfileProgressCard',
  component: ProfileProgressCard,
} as ComponentMeta<typeof ProfileProgressCard>

const Template: ComponentStory<typeof ProfileProgressCard> = (args) => (
  <ProfileProgressCard {...args} />
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
