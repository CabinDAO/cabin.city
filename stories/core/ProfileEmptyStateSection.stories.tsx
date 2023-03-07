import { ProfileEmptyStateSection } from '@/components/profile/view-profile/ProfileEmptyStateSection'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/ProfileEmptyStateSection',
  component: ProfileEmptyStateSection,
} as ComponentMeta<typeof ProfileEmptyStateSection>

const Template: ComponentStory<typeof ProfileEmptyStateSection> = (args) => (
  <ProfileEmptyStateSection {...args} />
)

export const Default = Template.bind({})
Default.args = {
  icon: 'card-heart',
  title: 'Choose your interests',
  description: 'Level them up over time',
}
