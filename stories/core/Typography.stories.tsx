import { ComponentMeta, ComponentStory } from '@storybook/react'
import TypographyList from './TypographyList'

export default {
  title: 'Core/Styles/Typography',
  component: TypographyList,
} as ComponentMeta<typeof TypographyList>

const Template: ComponentStory<typeof TypographyList> = (args) => (
  <TypographyList {...args} />
)

export const Typography = Template.bind({})
Typography.args = {
  $color: 'green900',
}
