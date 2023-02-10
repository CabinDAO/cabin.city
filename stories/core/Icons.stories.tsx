import { ComponentMeta, ComponentStory } from '@storybook/react'
import IconsList from './IconsList'

export default {
  title: 'Core/Styles/Icons',
  component: IconsList,
} as ComponentMeta<typeof IconsList>

const Template: ComponentStory<typeof IconsList> = (args) => (
  <IconsList {...args} />
)

export const Icons = Template.bind({})
Icons.args = {
  size: 2.4,
  color: 'green900',
}
