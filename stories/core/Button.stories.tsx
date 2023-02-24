import { Button } from '@/components/core/Button'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Button',
  variant: 'secondary',
}

export const Tertiary = Template.bind({})
Tertiary.args = {
  children: 'Button',
  variant: 'tertiary',
}

export const Link = Template.bind({})
Link.args = {
  children: 'Button',
  variant: 'link',
}
