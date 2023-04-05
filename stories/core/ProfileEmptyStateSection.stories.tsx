import { EmptyState } from '@/components/core/EmptyState'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/EmptyState',
  component: EmptyState,
} as ComponentMeta<typeof EmptyState>

const Template: ComponentStory<typeof EmptyState> = (args) => (
  <EmptyState {...args} />
)

export const Default = Template.bind({})
Default.args = {
  icon: 'card-heart',
  title: 'Choose your interests',
  description: 'Level them up over time',
}
