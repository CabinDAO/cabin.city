import Icon from '@/components/core/Icon'
import { InputTextArea } from '@/components/core/InputTextArea'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/InputTextArea',
  component: InputTextArea,
} as ComponentMeta<typeof InputTextArea>

const Template: ComponentStory<typeof InputTextArea> = (args) => (
  <InputTextArea {...args} />
)

export const Default = Template.bind({})
Default.args = {
  label: 'Label',
  message: 'Optional helper text',
  placeholder: 'Placeholder',
  helperText: '12/48',
}

export const LabelInfoRequired = Template.bind({})
LabelInfoRequired.args = {
  label: 'Label',
  info: 'This is an important info',
  required: true,
  message: 'This is a message',
  placeholder: 'Placeholder',
}

export const EndAdornment = Template.bind({})
EndAdornment.args = {
  label: 'Label',
  info: 'This is an important info',
  required: true,
  message: 'This is a message',
  placeholder: 'Placeholder',
  endAdornment: <Icon name="chevron-down" size={1.8} />,
}

export const Filled = Template.bind({})
Filled.args = {
  label: 'Label',
  value: 'This is an Input value',
  message: 'This is a message',
  placeholder: 'Placeholder',
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Label',
  message: 'This is a message',
  placeholder: 'Placeholder',
  disabled: true,
}

export const Error = Template.bind({})
Error.args = {
  label: 'Label',
  message: 'This is a message',
  placeholder: 'Placeholder',
  error: true,
}

export const ErrorFilled = Template.bind({})
ErrorFilled.args = {
  label: 'Label',
  message: 'This is a message',
  placeholder: 'Placeholder',
  error: true,
  value: 'This is an Input value',
}
