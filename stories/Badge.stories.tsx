import { Badge } from '@/components/core/Badge'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />

export const Default = Template.bind({})

Default.args = {
  name: 'Builder',
  src: 'https://picsum.photos/176',
  badgeId: '1',
}
