import { Navbar } from '@/components/core/Navbar'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/Navbar',
  component: Navbar,
} as ComponentMeta<typeof Navbar>

const Template: ComponentStory<typeof Navbar> = () => <Navbar />

export const Default = Template.bind({})

Default.args = {}
