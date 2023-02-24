import { ProgressBar } from '@/components/core/ProgressBar'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/ProgressBar',
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>

const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <ProgressBar {...args} />
)

export const Default = Template.bind({})

Default.args = {
  progress: 0,
}

export const Progress = Template.bind({})
Progress.args = {
  progress: 25,
}

export const Complete = Template.bind({})
Complete.args = {
  progress: 100,
}
