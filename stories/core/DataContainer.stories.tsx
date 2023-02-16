import { DataContainer } from '@/components/core/DataContainer'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import styled from 'styled-components'

export default {
  title: 'Core/DataContainer',
  component: DataContainer,
} as ComponentMeta<typeof DataContainer>

const Template: ComponentStory<typeof DataContainer> = (args) => (
  <DataContainer {...args} />
)

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 10rem;
  padding: 1rem;
  height: 10rem;
`

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
