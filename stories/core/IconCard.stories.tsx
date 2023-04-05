import { IconCard } from '@/components/core/IconCard'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/IconCard',
  component: IconCard,
} as ComponentMeta<typeof IconCard>

const Template: ComponentStory<typeof IconCard> = (args) => (
  <IconCard {...args} />
)

export const Default = Template.bind({})

Default.args = {
  icon: 'logo-cabin',
}
