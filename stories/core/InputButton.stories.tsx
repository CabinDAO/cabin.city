import Icon from '@/components/core/Icon'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { InputButton } from '@/components/core/InputButton'

export default {
  title: 'Core/InputButton',
  component: InputButton,
} as ComponentMeta<typeof InputButton>

const Template: ComponentStory<typeof InputButton> = (args) => (
  <InputButton {...args}>Subscribe</InputButton>
)

export const Default = Template.bind({})
Default.args = {
  message: 'Optional helper text',
  placeholder: 'Placeholder',
  helperText: '12/48',
}

export const EndAdornment = Template.bind({})
EndAdornment.args = {
  info: 'This is an important info',
  required: true,
  message: 'This is a message',
  placeholder: 'Placeholder',
  endAdornment: <Icon name="chevron-down" size={1.8} />,
}

export const Filled = Template.bind({})
Filled.args = {
  value: 'This is an Input value',
  message: 'This is a message',
  placeholder: 'Placeholder',
}

export const Disabled = Template.bind({})
Disabled.args = {
  message: 'This is a message',
  placeholder: 'Placeholder',
  disabled: true,
}

export const Error = Template.bind({})
Error.args = {
  message: 'This is a message',
  placeholder: 'Placeholder',
  error: true,
}

export const ErrorFilled = Template.bind({})
ErrorFilled.args = {
  message: 'This is a message',
  placeholder: 'Placeholder',
  error: true,
  value: 'This is an Input value',
}
