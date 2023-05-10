import { Tag } from '@/components/core/Tag'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Icon from '@/components/core/Icon'

export default {
  title: 'Core/Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Tag',
}

export const Adornment = Template.bind({})
Adornment.args = {
  startAdornment: <Icon name={'neighborhood'} size={1.8} color="yellow100" />,
  label: 'Adornment',
}
