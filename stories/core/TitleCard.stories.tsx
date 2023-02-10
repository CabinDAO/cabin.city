import { TitleCard } from '@/components/core/TitleCard'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/TitleCard',
  component: TitleCard,
} as ComponentMeta<typeof TitleCard>

const Template: ComponentStory<typeof TitleCard> = (args) => (
  <TitleCard {...args} />
)

export const Default = Template.bind({})

Default.args = {
  title: 'Cabin Activity',
  icon: 'cabin',
}
