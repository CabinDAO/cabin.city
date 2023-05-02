import { Switch } from '@/components/core/Switch'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />

export const Default = Template.bind({})
Default.args = {
  checked: false,
  onChange: (checked) => {
    console.info({ checked })
  },
}
