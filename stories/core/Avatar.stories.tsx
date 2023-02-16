import { Avatar } from '@/components/core/Avatar'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Default = Template.bind({})
Default.args = {
  size: 10,
  hoverShadow: true,
}

export const WithProfilePicture = Template.bind({})
WithProfilePicture.args = {
  src: '/images/test-avatar.jpeg',
  size: 10,
  hoverShadow: true,
}
