import { IconName } from '@/components/core/Icon'
import { MultipleDropdown } from '@/components/core/MultipleDropdown'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/MultipleDropdown',
  component: MultipleDropdown,
} as ComponentMeta<typeof MultipleDropdown>

const options = [
  {
    label: 'Costa Rica',
    value: 'CRI',
    icon: 'plus' as IconName,
  },
  {
    label: 'United States',
    value: 'USA',
    icon: 'plus' as IconName,
  },
  {
    label: 'Canada',
    value: 'CAN',
    icon: 'plus' as IconName,
  },
  {
    label: 'Argentina',
    value: 'ARG',
    icon: 'plus' as IconName,
  },
]

const Template: ComponentStory<typeof MultipleDropdown> = (args) => (
  <MultipleDropdown {...args}></MultipleDropdown>
)

export const Default = Template.bind({})
Default.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  onSelect: (option) => console.log(option),
  selectedOptions: options.slice(0, 2),
  options,
}
