import { CabinGradientCard } from '@/components/core/CabinGradientCard'
import { H1 } from '@/components/core/Typography'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/CabinGradientCard',
  component: CabinGradientCard,
} as ComponentMeta<typeof CabinGradientCard>

const Template: ComponentStory<typeof CabinGradientCard> = (args) => (
  <CabinGradientCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: <H1>Default</H1>,
}
