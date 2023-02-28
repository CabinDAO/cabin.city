import { MiniChip } from '@/components/core/MiniChip'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/MiniChip',
  component: MiniChip,
} as ComponentMeta<typeof MiniChip>

const Template: ComponentStory<typeof MiniChip> = (args) => (
  <MiniChip {...args} />
)

export const Selected = Template.bind({})

Selected.args = {
  selected: true,
  label: 'Chip Selected',
}

export const Unselected = Template.bind({})
Unselected.args = {
  selected: false,
  label: 'Chip Unselected',
}
