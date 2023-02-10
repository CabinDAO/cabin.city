import { BaseCard } from '@/components/core/BaseCard'
import { H1 } from '@/components/core/Typography'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import styled from 'styled-components'

export default {
  title: 'Core/BaseCard',
  component: BaseCard,
} as ComponentMeta<typeof BaseCard>

const Template: ComponentStory<typeof BaseCard> = (args) => (
  <BaseCard {...args} />
)

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
`

export const Default = Template.bind({})

Default.args = {
  children: <Content />,
}

export const WithShadow = Template.bind({})

WithShadow.args = {
  children: <Content />,
  shadow: true,
}
