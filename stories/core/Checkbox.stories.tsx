import { Checkbox } from '@/components/core/Checkbox'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
)

export const Unselected = Template.bind({})
Unselected.args = {
  selected: false,
}

export const Selected = Template.bind({})
Selected.args = {
  selected: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  selected: true,
  disabled: true,
}
