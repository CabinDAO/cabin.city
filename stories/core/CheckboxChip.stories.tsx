import { CheckboxChip } from '@/components/core/CheckboxChip'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/CheckboxChip',
  component: CheckboxChip,
} as ComponentMeta<typeof CheckboxChip>

const Template: ComponentStory<typeof CheckboxChip> = (args) => (
  <CheckboxChip {...args} />
)

export const Unselected = Template.bind({})
Unselected.args = {
  selected: false,
  label: 'Label',
  icon: 'check',
}

export const Selected = Template.bind({})
Selected.args = {
  selected: true,
  label: 'Label',
  icon: 'check',
}

export const Disabled = Template.bind({})
Disabled.args = {
  selected: true,
  disabled: true,
  label: 'Label',
  icon: 'check',
}
