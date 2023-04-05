import { CitizenCard } from '@/components/core/CitizenCard'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/CitizenCard',
  component: CitizenCard,
} as ComponentMeta<typeof CitizenCard>

const Template: ComponentStory<typeof CitizenCard> = () => {
  return <CitizenCard />
}

export const Default = Template.bind({})
