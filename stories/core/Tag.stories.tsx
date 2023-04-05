import { Tag } from '@/components/core/Tag'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />

export const Default = Template.bind({})

Default.args = {
  label: 'Tag',
}
