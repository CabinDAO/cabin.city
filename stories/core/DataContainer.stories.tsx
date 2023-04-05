import { DataContainer } from '@/components/core/DataContainer'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/DataContainer',
  component: DataContainer,
} as ComponentMeta<typeof DataContainer>

const Template: ComponentStory<typeof DataContainer> = (args) => (
  <DataContainer {...args} />
)

export const Default = Template.bind({})

Default.args = {
  title: 'Dashboard',
  items: [
    {
      name: 'Discord',
      value: 9020,
    },
    {
      name: 'Twitter',
      value: 100000,
    },
    {
      name: 'Instagram',
      value: 505,
    },
  ],
}
