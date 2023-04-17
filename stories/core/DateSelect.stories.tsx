import { DateSelect } from '@/components/core/DateSelect'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/DateSelect',
  component: DateSelect,
} as ComponentMeta<typeof DateSelect>

const Template: ComponentStory<typeof DateSelect> = (args) => (
  <DateSelect {...args} />
)

export const Default = Template.bind({})

Default.args = {
  startDate: new Date(),
  onDateChange: (date) => {
    console.log({ date })
  },
}
