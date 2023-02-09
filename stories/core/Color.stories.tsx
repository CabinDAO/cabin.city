import { ComponentMeta, ComponentStory } from '@storybook/react'
import ColorList from './ColorList'

export default {
  title: 'Core/Styles/Colors',
  component: ColorList,
} as ComponentMeta<typeof ColorList>

const Template: ComponentStory<typeof ColorList> = () => <ColorList />

export const Colors = Template.bind({})
