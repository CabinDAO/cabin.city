import Icon from '@/components/core/Icon'
import { InputText } from '@/components/core/InputText'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/InputText',
  component: InputText,
} as ComponentMeta<typeof InputText>

const Template: ComponentStory<typeof InputText> = (args) => (
  <InputText {...args} />
)

export const Default = Template.bind({})
Default.args = {
  label: 'Label',
  errorMessage: 'Optional helper text',
  placeholder: 'Placeholder',
  helperText: '12/48',
}

export const LabelInfoRequired = Template.bind({})
LabelInfoRequired.args = {
  label: 'Label',
  info: 'This is an important info',
  required: true,
  errorMessage: 'This is a message',
  placeholder: 'Placeholder',
}

export const EndAdornment = Template.bind({})
EndAdornment.args = {
  label: 'Label',
  info: 'This is an important info',
  required: true,
  errorMessage: 'This is a message',
  placeholder: 'Placeholder',
  endAdornment: <Icon name="chevron-down" size={1.8} />,
}

export const Filled = Template.bind({})
Filled.args = {
  label: 'Label',
  value: 'This is an Input value',
  errorMessage: 'This is a message',
  placeholder: 'Placeholder',
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Label',
  errorMessage: 'This is a message',
  placeholder: 'Placeholder',
  disabled: true,
}

export const Error = Template.bind({})
Error.args = {
  label: 'Label',
  errorMessage: 'This is a message',
  placeholder: 'Placeholder',
  error: true,
}

export const ErrorFilled = Template.bind({})
ErrorFilled.args = {
  label: 'Label',
  errorMessage: 'This is a message',
  placeholder: 'Placeholder',
  error: true,
  value: 'This is an Input value',
}
