import { Dropdown } from '@/components/core/Dropdown'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>

const options = [
  {
    label: 'Costa Rica',
    value: 'CRI',
  },
  {
    label: 'United States',
    value: 'USA',
  },
  {
    label: 'Canada',
    value: 'CAN',
  },
  {
    label: 'Argentina',
    value: 'ARG',
  },
]

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args}></Dropdown>
)

export const Default = Template.bind({})
Default.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  onSelect: (option) => console.log(option),
  selectedOption: options[0],
  options,
}

export const LabelInfoRequired = Template.bind({})
LabelInfoRequired.args = {
  label: 'Label',
  info: 'This is an important info',
  required: true,
  placeholder: 'Placeholder',
  options,
}

export const Filled = Template.bind({})
Filled.args = {
  label: 'Label',
  selectedOption: options[0],
  placeholder: 'Placeholder',
  options,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Label',
  disabled: true,
  options,
}

export const Error = Template.bind({})
Error.args = {
  label: 'Label',
  error: true,
  placeholder: 'Placeholder',
  options,
}

export const ErrorFilled = Template.bind({})
ErrorFilled.args = {
  label: 'Label',
  error: true,
  selectedOption: options[1],
  placeholder: 'Placeholder',
  options,
}

export const ErrorDisabled = Template.bind({})
ErrorDisabled.args = {
  label: 'Label',
  error: true,
  disabled: true,
  placeholder: 'Placeholder',
  options,
}
